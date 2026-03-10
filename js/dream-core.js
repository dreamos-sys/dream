/* ============================================
   🕌 DREAM OS 2026 ENTERPRISE EDITION
   Core Application Engine
   Version: 2026.1.0
   ISO 27001 | 9001 | 55001 Compliant
   Ghost Architect Protocol Active
   ============================================ */

// ============================================
// GLOBAL APP STATE
// ============================================
const DREAM = {
  version: '2026.1.0',
  env: 'production',
  state: {
    currentModule: 'home',
    user: null,
    session: null,
    prayerTimes: null,
    networkStatus: navigator.onLine,
    batteryLevel: null,
    lastSync: null,
    theme: 'dark',
    language: 'id'
  },
  config: {
    supabase: {
      url: import.meta.env?.VITE_SUPABASE_URL || 'https://your-project.supabase.co',
      key: import.meta.env?.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
    },
    cloudflare: {
      workerUrl: import.meta.env?.VITE_CF_WORKER_URL || 'https://your-worker.workers.dev'
    },
    api: {
      prayerTime: 'https://api.aladhan.com/v1/timingsByCity',
      quran: 'https://api.alquran.cloud/v1'
    }
  },
  modules: new Map(),
  cache: new Map()
};

// ============================================
// INITIALIZATION
// ============================================
class DreamCore {
  constructor() {
    this.initialized = false;
    this.loadingModules = new Set();
  }
  async init() {
    console.log('🕌 [DREAM CORE] Initializing Dream OS 2026...');
    console.log('📦 [DREAM CORE] Version:', DREAM.version);
    console.log('🛡️ [DREAM CORE] Ghost Architect Protocol Active');
    
    try {
      // 1. Check Service Worker
      await this.registerServiceWorker();
      
      // 2. Initialize Storage
      await this.initStorage();
      
      // 3. Load User Session
      await this.loadSession();
      
      // 4. Initialize Monitors
      await this.initMonitors();
      
      // 5. Load Default Module
      await this.loadModule('home');
      
      // 6. Hide Loading Screen
      this.hideLoadingScreen();
      
      // 7. Send Analytics
      this.trackEvent('app_initialized', { timestamp: Date.now() });
      
      this.initialized = true;
      console.log('✅ [DREAM CORE] Initialization complete');
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('dreamos-ready', { detail: DREAM.state }));
      
    } catch (error) {
      console.error('❌ [DREAM CORE] Initialization failed:', error);
      this.showError(error);
    }
  }

  // ============================================
  // SERVICE WORKER
  // ============================================
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
                console.log('✅ [SW] Service Worker registered:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
        
        return registration;
      } catch (error) {
        console.warn('⚠️ [SW] Service Worker registration failed:', error);
      }
    }
    return null;
  }

  // ============================================
  // STORAGE INITIALIZATION
  // ============================================
  async initStorage() {
    // Initialize IndexedDB
    if ('indexedDB' in window) {
      await this.initIndexedDB();
    }
    
    // Load cached data
    await this.loadCachedData();
  }

  async initIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('DreamOS', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        DREAM.db = request.result;
        console.log('✅ [DB] IndexedDB initialized');
        resolve(DREAM.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('modules')) {
          db.createObjectStore('modules', { keyPath: 'id' });        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
      };
    });
  }

  async loadCachedData() {
    try {
      // Load from localStorage
      const cachedState = localStorage.getItem('dreamos-state');
      if (cachedState) {
        DREAM.state = { ...DREAM.state, ...JSON.parse(cachedState) };
      }
      
      // Load last sync time
      const lastSync = localStorage.getItem('dreamos-last-sync');
      if (lastSync) {
        DREAM.state.lastSync = new Date(lastSync);
      }
      
      console.log('✅ [STORAGE] Cached data loaded');
    } catch (error) {
      console.warn('⚠️ [STORAGE] Failed to load cached data:', error);
    }
  }

  // ============================================
  // SESSION MANAGEMENT
  // ============================================
  async loadSession() {
    try {
      const session = localStorage.getItem('dreamos-session');
      if (session) {
        DREAM.state.session = JSON.parse(session);
        
        // Validate session
        if (DREAM.state.session.expiresAt < Date.now()) {
          await this.clearSession();
          console.log(' [SESSION] Session expired');
        } else {
          console.log('✅ [SESSION] Session loaded');
        }
      }
    } catch (error) {
      console.warn('⚠️ [SESSION] Failed to load session:', error);    }
  }

  async saveSession(session) {
    DREAM.state.session = session;
    localStorage.setItem('dreamos-session', JSON.stringify(session));
    this.persistState();
  }

  async clearSession() {
    DREAM.state.session = null;
    localStorage.removeItem('dreamos-session');
    this.persistState();
  }

  // ============================================
  // MONITORS INITIALIZATION
  // ============================================
  async initMonitors() {
    // Network Monitor
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Battery Monitor
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery();
      DREAM.state.batteryLevel = battery.level * 100;
      
      battery.addEventListener('levelchange', () => {
        DREAM.state.batteryLevel = battery.level * 100;
        this.updateBatteryUI();
      });
    }
    
    // Visibility Monitor
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.handleAppVisible();
      }
    });
    
    console.log('✅ [MONITORS] All monitors initialized');
  }

  handleOnline() {
    DREAM.state.networkStatus = true;
    this.showToast('📡 Connection restored', 'success');
    this.syncData();
  }
  handleOffline() {
    DREAM.state.networkStatus = false;
    this.showToast('📡 You\'re offline', 'warning');
  }

  handleAppVisible() {
    // Refresh data when app becomes visible
    this.refreshCurrentModule();
  }

  // ============================================
  // MODULE LOADER
  // ============================================
  async loadModule(moduleName, params = {}) {
    if (this.loadingModules.has(moduleName)) {
      console.log('⏳ [MODULE] Already loading:', moduleName);
      return;
    }
    
    this.loadingModules.add(moduleName);
    
    try {
      console.log('📦 [MODULE] Loading:', moduleName);
      
      // Update UI
      this.updateNavigation(moduleName);
      
      // Show loading state
      this.showModuleLoading();
      
      // Check if module is cached
      if (DREAM.modules.has(moduleName)) {
        const module = DREAM.modules.get(moduleName);
        await this.renderModule(module, params);
        this.loadingModules.delete(moduleName);
        return;
      }
      
      // Dynamic import
      const modulePath = `js/modules/${moduleName}.js`;
      const module = await import(modulePath);
      
      // Cache module
      DREAM.modules.set(moduleName, module);
      
      // Render
      await this.renderModule(module, params);
      
      // Update state
      DREAM.state.currentModule = moduleName;      this.persistState();
      
      console.log('✅ [MODULE] Loaded:', moduleName);
      
    } catch (error) {
      console.error('❌ [MODULE] Failed to load:', moduleName, error);
      this.showError(error);
    } finally {
      this.loadingModules.delete(moduleName);
    }
  }

  async renderModule(module, params) {
    const container = document.getElementById('dynamic-stage');
    
    if (!container) {
      throw new Error('Module container not found');
    }
    
    // Call module init if exists
    if (module.init) {
      await module.init(params);
    }
    
    // Call module render if exists
    if (module.render) {
      const html = await module.render(params);
      container.innerHTML = html;
    }
    
    // Call module afterRender if exists
    if (module.afterRender) {
      await module.afterRender(params);
    }
    
    // Update breadcrumb
    this.updateBreadcrumb(moduleName);
  }

  // ============================================
  // UI UPDATES
  // ============================================
  updateNavigation(moduleName) {
    document.querySelectorAll('.nav-item').forEach(item => {
      const isActive = item.dataset.module === moduleName;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }
  updateBreadcrumb(moduleName) {
    const container = document.getElementById('breadcrumb-container');
    const nameEl = document.getElementById('current-module-name');
    
    if (container && nameEl) {
      container.classList.remove('hidden');
      nameEl.textContent = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
    }
  }

  showModuleLoading() {
    const container = document.getElementById('dynamic-stage');
    if (container) {
      container.innerHTML = `
        <div class="text-center py-20">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4">
            <i class="fas fa-cog fa-spin text-2xl text-emerald-500"></i>
          </div>
          <p class="text-emerald-500/70 font-mono text-sm">
            Loading module...
          </p>
        </div>
      `;
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => loadingScreen.remove(), 500);
    }
  }

  // ============================================
  // NOTIFICATIONS & TOASTS
  // ============================================
  showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto dismiss    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-in-out forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  showError(error) {
    const errorBoundary = document.getElementById('error-boundary');
    const errorMessage = document.getElementById('error-message');
    
    if (errorBoundary && errorMessage) {
      errorMessage.textContent = error.message || 'An unexpected error occurred';
      errorBoundary.style.display = 'flex';
    }
  }

  showUpdateNotification() {
    this.showToast('🔄 New version available! Refresh to update.', 'info', 10000);
  }

  // ============================================
  // DATA SYNC
  // ============================================
  async syncData() {
    if (!DREAM.state.networkStatus) return;
    
    console.log('🔄 [SYNC] Syncing data...');
    
    try {
      // Sync prayer times
      if (DREAM.utils?.prayerTime) {
        await DREAM.utils.prayerTime.fetchPrayerTimes();
      }
      
      // Update last sync
      DREAM.state.lastSync = new Date();
      localStorage.setItem('dreamos-last-sync', Date.now());
      this.persistState();
      
      console.log('✅ [SYNC] Sync complete');
    } catch (error) {
      console.warn('⚠️ [SYNC] Sync failed:', error);
    }
  }

  // ============================================
  // STATE PERSISTENCE
  // ============================================
  persistState() {
    try {      localStorage.setItem('dreamos-state', JSON.stringify(DREAM.state));
    } catch (error) {
      console.warn('⚠️ [STORAGE] Failed to persist state:', error);
    }
  }

  // ============================================
  // ANALYTICS
  // ============================================
  trackEvent(eventName, data = {}) {
    console.log('📊 [ANALYTICS]', eventName, data);
    
    if (window.ANALYTICS) {
      window.ANALYTICS.track(eventName, data);
    }
  }

  // ============================================
  // UTILITY METHODS
  // ============================================
  updateBatteryUI() {
    const batteryLevel = document.getElementById('battery-level');
    if (batteryLevel) {
      batteryLevel.textContent = `${Math.round(DREAM.state.batteryLevel)}%`;
    }
  }

  refreshCurrentModule() {
    const moduleName = DREAM.state.currentModule;
    if (moduleName && DREAM.modules.has(moduleName)) {
      const module = DREAM.modules.get(moduleName);
      if (module.refresh) {
        module.refresh();
      }
    }
  }
}

// ============================================
// INITIALIZE APP
// ============================================
const app = new DreamCore();

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
// ============================================
// GLOBAL EXPOSE
// ============================================
window.DREAM = DREAM;
window.DreamCore = DreamCore;
window.app = app;

// Export for modules
export { DREAM, DreamCore, app };
