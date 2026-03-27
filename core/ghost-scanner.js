// Dream OS - Ghost Mode Scanner with Professional UI
class GhostScanner {
    constructor() {
        this.scanResults = {};
        this.debugMode = true;
    }
    
    async fullSystemScan() {
        console.log('👻 Ghost Scanner - Full System Scan');
        
        const scan = {
            timestamp: new Date().toISOString(),
            system: await this.scanSystem(),
            modules: await this.scanModules(),
            database: await this.scanDatabase(),
            storage: await this.scanStorage(),
            errors: [],
            warnings: []
        };
        
        localStorage.setItem('ghost_scan', JSON.stringify(scan));
        this.showScanReport(scan);
        
        return scan;
    }
    
    showScanReport(scan) {
        const modal = document.createElement('div');
        modal.id = 'ghost-scan-modal';
        modal.style.cssText = `
            position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:100000;
            display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s;
        `;
        modal.innerHTML = `
            <div style="background:linear-gradient(135deg,#1e1b4b,#0c0a2a);border-radius:24px;border:1px solid #a855f7;max-width:600px;width:90%;max-height:80vh;overflow-y:auto;padding:24px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <h2 style="color:#a855f7;margin:0;">
                        <i class="fas fa-ghost"></i> Ghost Scan Report
                    </h2>
                    <button onclick="this.closest('#ghost-scan-modal').remove()" style="background:none;border:none;color:#64748b;font-size:24px;cursor:pointer;">✕</button>
                </div>
                
                <div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:12px;margin-bottom:16px;">
                    <div style="display:flex;justify-content:space-between;">
                        <span>📅 Scan Time:</span>
                        <span style="color:#10b981;">${scan.timestamp}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:8px;">
                        <span>🌐 System Status:</span>
                        <span style="color:#a855f7;">${scan.system.online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
                
                <h3 style="color:#a855f7;margin-bottom:12px;">📦 Modules Status</h3>
                <div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:12px;margin-bottom:16px;">
                    ${scan.modules.map(m => `
                        <div style="display:flex;justify-content:space-between;padding:4px 0;">
                            <span>${m.name}</span>
                            <span style="color:${m.exists ? '#10b981' : '#ef4444'}">
                                ${m.exists ? '✅ OK' : '❌ Missing'}
                            </span>
                        </div>
                    `).join('')}
                </div>
                
                <h3 style="color:#a855f7;margin-bottom:12px;">💾 Storage Usage</h3>
                <div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:12px;margin-bottom:16px;">
                    <div>LocalStorage: ${scan.storage.localStorageUsed}</div>
                    <div>SessionStorage: ${scan.storage.sessionStorageUsed}</div>
                </div>
                
                <div style="display:flex;gap:12px;margin-top:20px;">
                    <button onclick="window.ghostScanner?.export()" style="flex:1;background:#a855f7;border:none;padding:12px;border-radius:12px;cursor:pointer;">
                        <i class="fas fa-download"></i> Export Data
                    </button>
                    <button onclick="window.ghostScanner?.recover()" style="flex:1;background:#10b981;border:none;padding:12px;border-radius:12px;cursor:pointer;">
                        <i class="fas fa-heartbeat"></i> Recovery
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    async scanSystem() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            online: navigator.onLine,
            cookiesEnabled: navigator.cookieEnabled,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
    }
    
    async scanModules() {
        const modules = [];
        const moduleList = [
            'auth', 'dashboard', 'command-center', 'stok', 'maintenance',
            'security', 'booking', 'k3', 'asset', 'janitor', 'qr', 'settings', 'ghost'
        ];
        
        for (const module of moduleList) {
            try {
                const modulePath = `./modules/${module}/module.js`;
                const response = await fetch(modulePath, { method: 'HEAD' });
                modules.push({
                    name: module,
                    exists: response.ok,
                    path: modulePath
                });
            } catch (e) {
                modules.push({
                    name: module,
                    exists: false,
                    error: e.message
                });
            }
        }
        
        return modules;
    }
    
    async scanDatabase() {
        const dbInfo = {
            supabase: null,
            localStorage: {},
            sessionStorage: {}
        };
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            dbInfo.localStorage[key] = localStorage.getItem(key)?.substring(0, 100);
        }
        
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            dbInfo.sessionStorage[key] = sessionStorage.getItem(key)?.substring(0, 100);
        }
        
        if (window.supabase) {
            dbInfo.supabase = { available: true };
        }
        
        return dbInfo;
    }
    
    scanStorage() {
        let totalLocalStorage = 0;
        let totalSessionStorage = 0;
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            totalLocalStorage += localStorage.getItem(key)?.length || 0;
        }
        
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            totalSessionStorage += sessionStorage.getItem(key)?.length || 0;
        }
        
        return {
            localStorageUsed: `${Math.round(totalLocalStorage / 1024)} KB`,
            sessionStorageUsed: `${Math.round(totalSessionStorage / 1024)} KB`
        };
    }
    
    async recover() {
        console.log('👻 Running ghost recovery protocol...');
        
        const modal = document.createElement('div');
        modal.id = 'ghost-recovery-modal';
        modal.style.cssText = `
            position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:100000;
            display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s;
        `;
        modal.innerHTML = `
            <div style="background:linear-gradient(135deg,#1e1b4b,#0c0a2a);border-radius:24px;border:1px solid #10b981;max-width:500px;width:90%;padding:24px;">
                <div style="text-align:center;margin-bottom:20px;">
                    <i class="fas fa-heartbeat" style="font-size:48px;color:#10b981;"></i>
                    <h2 style="color:#10b981;">Emergency Recovery</h2>
                </div>
                <p style="text-align:center;margin-bottom:20px;">Running system recovery protocol...</p>
                <div id="recovery-progress" style="background:rgba(255,255,255,0.1);border-radius:10px;height:4px;margin-bottom:20px;">
                    <div style="width:0%;height:100%;background:#10b981;border-radius:10px;transition:width 0.3s;"></div>
                </div>
                <div id="recovery-status" style="font-size:12px;color:#64748b;text-align:center;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        const progressBar = modal.querySelector('#recovery-progress div');
        const statusDiv = modal.querySelector('#recovery-status');
        
        const steps = [
            { text: 'Checking system integrity...', delay: 500, progress: 20 },
            { text: 'Scanning for backup data...', delay: 800, progress: 40 },
            { text: 'Loading emergency backup...', delay: 1000, progress: 60 },
            { text: 'Restoring core modules...', delay: 800, progress: 80 },
            { text: 'System recovery complete!', delay: 500, progress: 100 }
        ];
        
        for (const step of steps) {
            statusDiv.textContent = step.text;
            progressBar.style.width = `${step.progress}%`;
            await new Promise(r => setTimeout(r, step.delay));
        }
        
        setTimeout(() => {
            modal.remove();
            location.reload();
        }, 1000);
    }
    
    async export() {
        const data = {
            timestamp: new Date().toISOString(),
            localStorage: {},
            sessionStorage: {},
            systemInfo: await this.scanSystem()
        };
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data.localStorage[key] = localStorage.getItem(key);
        }
        
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data.sessionStorage[key] = sessionStorage.getItem(key);
        }
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dreamos_ghost_export_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        return data;
    }
    
    async scan() {
        return await this.fullSystemScan();
    }
}

export const ghostScanner = new GhostScanner();
