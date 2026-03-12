/**
 * shell.js - Dream OS v2.1 (Kernel Core)
 * Master M Edition - ISO 27001 & 9001 Compliant
 * Bismillah & Shalawat Automation Standard
 */

import { services, initServices } from './shared/services/index.js';

// === I18N DICTIONARY ===
const translations = {
    id: {
        bismillah: "Bismillahirrahmanirrahim",
        shalawat: "Allahumma Sholli 'ala Muhammad",
        dashboard: "Dasbor Utama",
        loading: "Memuat Modul...",
        guest: "TAMU",
        offline: "LURING",
        error_title: "Kegagalan Sistem Kritikal",
        reboot: "Mulai Ulang Kernel",
        ghost_detected: "Ghost Architect Terdeteksi"
    },
    ar: {
        bismillah: "بسم الله الرحمن الرحيم",
        shalawat: "اللهم صل على محمد",
        dashboard: "لوحة القيادة",
        loading: "جارٍ التحميل...",
        guest: "ضيف",
        offline: "غير متصل",
        error_title: "فشل kritis في النظام",
        reboot: "إعادة تشغيل النواة",
        ghost_detected: "تم اكتشاف المهندس الشبح"
    }
};

// State App
const state = {
    user: null,
    currentModule: null,
    cleanup: null,
    isInitialized: false,
    lang: navigator.language.startsWith('ar') ? 'ar' : 'id', // Auto-detect
    logoAngle: 240 
};

/**
 * Helper: Translate (t)
 */
const t = (key) => translations[state.lang][key] || key;

/**
 * Inisialisasi Kernel
 */
async function init() {
    try {
        await initServices();
        const manifestRes = await fetch('./manifest.json');
        if (!manifestRes.ok) throw new Error('System Manifest tidak ditemukan.');
        const { modules } = await manifestRes.json();

        // Render Framework Utama
        renderShell();

        // Render Grid Modul
        renderModuleGrid(modules);

        // Cek Session (Supabase Integration)
        checkSession();

        state.isInitialized = true;
        console.log(`✅ Dream OS v2.1 Ready [Lang: ${state.lang.toUpperCase()}]`);
    } catch (err) {
        console.error('Kernel Initialization Failed:', err);
        document.getElementById('app-shell').innerHTML = `
            <div style="color:white; padding:2rem; text-align:center; font-family:sans-serif;">
                <h2 style="color:#ef4444">${t('error_title')}</h2>
                <p>${err.message}</p>
                <button onclick="location.reload()" style="padding:12px 24px; margin-top:10px; cursor:pointer; background:#ef4444; border:none; color:white; border-radius:8px;">
                    ${t('reboot')}
                </button>
            </div>
        `;
    }
}

/**
 * Render Struktur Framework
 */
function renderShell() {
    const shell = document.getElementById('app-shell');
    shell.innerHTML = `
        <header class="shell-header">
            <div class="header-content">
                <div class="logo-area">
                    <img id="dream-os-logo" src="./assets/icons/logo_haa.svg" alt="Dream OS" style="transform: rotate(${state.logoAngle}deg); transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);" />
                    <h1 style="color:#10b981">Dream OS <span class="version">v2.1</span></h1>
                </div>
                
                <div class="system-meta">
                    <span class="arabic bismillah-text">${t('bismillah')}</span>
                    <div class="user-info">
                        <span id="clock" class="clock">00:00:00</span>
                        <div id="user-badge" class="user-badge">${t('offline')}</div>
                    </div>
                </div>
            </div>
        </header>
        
        <main id="main-content">
            <div id="module-grid" class="module-grid"></div>
            <div id="module-container" class="module-container" style="display:none; opacity:0; transition: opacity 0.4s ease;"></div>
        </main>

        <footer class="bottom-bar">
            <button id="shalawat-btn" class="nav-btn shalawat-action">
                <span class="arabic">${t('shalawat')}</span>
                <span class="btn-subtext">${t('dashboard')}</span>
            </button>
        </footer>
    `;

    document.getElementById('shalawat-btn').addEventListener('click', closeCurrentModule);

    // Update Jam Real-time
    setInterval(() => {
        const clockEl = document.getElementById('clock');
        if (clockEl) clockEl.textContent = new Date().toLocaleTimeString('id-ID');
    }, 1000);
}

/**
 * Render Menu Modul
 */
function renderModuleGrid(modules) {
    const grid = document.getElementById('module-grid');
    grid.innerHTML = modules.map(m => `
        <div class="module-card" data-module-id="${m.id}" style="cursor:pointer">
            <div class="module-icon">${m.icon}</div>
            <div class="module-namearabic arabic" style="color: #64748b;">${m.nameArabic || ''}</div>
            <div class="module-name">${m.name}</div>
        </div>
    `).join('');

    grid.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', async () => {
            const id = card.dataset.moduleId;
            const moduleInfo = modules.find(m => m.id === id);
            if (moduleInfo) {
                if ('vibrate' in navigator) navigator.vibrate(10); // Haptic feedback
                await openModule(moduleInfo);
            }
        });
    });
}

/**
 * Buka Modul (ه → d)
 */
async function openModule(moduleInfo) {
    if (services.toast) services.toast(`${t('bismillah')}, ${t('loading')}`);
    
    if (state.cleanup) {
        state.cleanup();
        state.cleanup = null;
    }

    // Transisi Logo ke arah "d" (275deg)
    const logoEl = document.getElementById('dream-os-logo');
    if (logoEl) logoEl.style.transform = `rotate(275deg)`;

    const grid = document.getElementById('module-grid');
    const container = document.getElementById('module-container');

    grid.style.display = 'none';
    container.style.display = 'block';
    container.style.opacity = '1';
    container.innerHTML = `<div class="loader">${t('loading')}</div>`;

    try {
        const module = await import(moduleInfo.path);
        // Inject i18n ke dalam modul agar modul bisa ikut otomatis
        const cleanup = await module.default({
            container: container,
            services: services,
            user: state.user,
            i18n: { t, lang: state.lang } 
        });

        state.cleanup = cleanup;
        state.currentModule = moduleInfo.id;
        
    } catch (err) {
        console.error(`Error loading module ${moduleInfo.id}:`, err);
        if (services.toast) services.toast('Gagal memuat modul!', 'error');
        closeCurrentModule();
    }
}

/**
 * Close (d → ه)
 */
function closeCurrentModule() {
    if (state.cleanup) {
        state.cleanup();
        state.cleanup = null;
    }

    const logoEl = document.getElementById('dream-os-logo');
    if (logoEl) logoEl.style.transform = `rotate(240deg)`;

    const container = document.getElementById('module-container');
    container.style.opacity = '0';
    setTimeout(() => {
        container.style.display = 'none';
        document.getElementById('module-grid').style.display = 'grid';
    }, 400);

    state.currentModule = null;
}

/**
 * Session & Ghost Bypass Logic
 */
function checkSession() {
    const badge = document.getElementById('user-badge');
    
    // Auto-Bypass untuk Ghost Architect (Master M)
    if (state.user?.email === 'girangati1001@gmail.com') {
        badge.innerHTML = `<span>👻 ARCHITECT</span>`;
        badge.style.background = 'rgba(16, 185, 129, 0.2)';
        badge.style.color = '#10b981';
        badge.classList.add('online');
        console.log(`[GHOST] ${t('ghost_detected')}`);
        return;
    }

    if (state.user) {
        badge.textContent = state.user.name;
        badge.classList.add('online');
    } else {
        badge.textContent = t('guest');
        badge.classList.remove('online');
    }
}

// Global Performance & Network Monitor
window.addEventListener('online', () => services.toast?.('System Online', 'success'));
window.addEventListener('offline', () => services.toast?.('System Offline', 'error'));

// Bismillah, Boot!
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
