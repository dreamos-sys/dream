/**
 * ══════════════════════════════════════════════════════════════
 * DREAM OS v2.3.6 - SOVEREIGN COMMAND CENTER KERNEL
 * Fix: Empty UI & Module Router Integration
 * ══════════════════════════════════════════════════════════════
 */

const CONFIG = {
    supabase: {
        url: 'https://lfavawkzvdhdpaaplaiq.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00'
    },
    access: { key: 'b15m1ll4h_012443410' }
};

const _db = supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.key);

const DREAM_CORE = {
    async init() {
        if (!sessionStorage.getItem('dream_os_authorized')) {
            this.renderLogin();
        } else {
            this.renderShell();
            this.hideLoading();
        }
    },

    renderLogin() {
        const shell = document.getElementById('app-shell');
        shell.innerHTML = `
            <div style="height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#020617; color:white; padding:20px; font-family:sans-serif;">
                <h1 style="color:#10b981; font-family:'Amiri',serif; font-size:40px; margin-bottom:10px;">بِسْمِ اللَّهِ</h1>
                <p style="font-size:10px; color:#64748b; margin-bottom:30px; letter-spacing:2px;">SOVEREIGN ACCESS CONTROL</p>
                <input type="password" id="auth-key" placeholder="Enter Key..." 
                    style="width:80%; padding:18px; border-radius:15px; border:1px solid #10b981; background:#0f172a; color:white; text-align:center; margin-bottom:15px; font-size:18px;">
                <button onclick="window.AUTHORIZE_SYSTEM()" 
                    style="width:80%; padding:18px; border-radius:15px; border:none; background:#10b981; color:black; font-weight:bold; font-size:16px;">
                    OPEN SYSTEM
                </button>
            </div>
        `;
        const loader = document.getElementById('loading-screen');
        if(loader) loader.style.display = 'none';
    },

    renderShell() {
        const shell = document.getElementById('app-shell');
        shell.innerHTML = `
            <header style="text-align:center; padding:30px 20px 10px; background:linear-gradient(to bottom, #020617, transparent);">
                <p style="font-family:'Amiri',serif; font-size:28px; color:#10b981; margin:0;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <div id="clock" style="font-family:monospace; color:#4ade80; font-size:14px; margin-top:5px; letter-spacing:2px;">00:00:00</div>
            </header>

            <main id="viewport" style="padding:20px; display:grid; grid-template-columns: 1fr 1fr; gap:12px; animation: slideUp 0.6s ease-out;">
                ${this.createWidget('Dana Umum', 'fa-wallet', '#10b981', 'command-center')}
                ${this.createWidget('Laporan SPJ', 'fa-file-invoice', '#3b82f6', 'dana')}
                ${this.createWidget('Harian', 'fa-calendar-day', '#f59e0b', 'maintenance')}
                ${this.createWidget('Mingguan', 'fa-calendar-week', '#8b5cf6', 'maintenance')}
                ${this.createWidget('Bulanan', 'fa-calendar-alt', '#ec4899', 'maintenance')}
                ${this.createWidget('Tahunan', 'fa-archive', '#94a3b8', 'maintenance')}
                ${this.createWidget('K3 System', 'fa-shield-alt', '#ef4444', 'k3')}
                ${this.createWidget('Inventaris', 'fa-boxes', '#06b6d4', 'gudang')}
            </main>

            <nav style="position:fixed; bottom:0; width:100%; display:flex; justify-content:space-around; padding:20px; background:rgba(2,6,23,0.95); backdrop-filter:blur(10px); border-top:1px solid rgba(16,185,129,0.1);">
                <i class="fas fa-home" style="color:#10b981; font-size:22px;"></i>
                <i class="fas fa-qrcode" onclick="window.DREAM_NAV('qr')" style="color:#64748b; font-size:22px;"></i>
                <i class="fas fa-cog" onclick="window.DREAM_NAV('config')" style="color:#64748b; font-size:22px;"></i>
            </nav>
        `;
        this.updateClock();
    },

    createWidget(name, icon, color, module) {
        return `
            <div onclick="window.DREAM_NAV('${module}')" style="background:rgba(15,23,42,0.8); border:1px solid ${color}33; padding:20px 10px; border-radius:24px; text-align:center; transition:0.3s;" onactive="this.style.transform='scale(0.95)'">
                <div style="background:${color}15; width:45px; height:45px; border-radius:15px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; border:1px solid ${color}44;">
                    <i class="fas ${icon}" style="color:${color}; font-size:20px;"></i>
                </div>
                <div style="font-size:10px; font-weight:bold; color:#fff; letter-spacing:0.5px;">${name.toUpperCase()}</div>
                <div style="font-size:8px; color:#475569; margin-top:5px;">ENTER MODULE</div>
            </div>
        `;
    },

    updateClock() {
        setInterval(() => {
            const el = document.getElementById('clock');
            if(el) el.innerText = new Date().toLocaleTimeString('id-ID', {hour12:false}).replace(/\./g, ':');
        }, 1000);
    },

    hideLoading() {
        const loader = document.getElementById('loading-screen');
        if(loader) loader.style.display = 'none';
    }
};

window.AUTHORIZE_SYSTEM = () => {
    const key = document.getElementById('auth-key').value;
    if(key === CONFIG.access.key) {
        sessionStorage.setItem('dream_os_authorized', 'true');
        location.reload();
    } else { alert("Akses Ditolak!"); }
};

window.DREAM_NAV = async (modulePath) => {
    const view = document.getElementById('viewport');
    view.innerHTML = `<div style="grid-column: span 2; text-align:center; padding:50px; color:#10b981;"><i class="fas fa-circle-notch fa-spin"></i> Loading Module...</div>`;
    
    try {
        const mod = await import(`./modules/${modulePath}/module.js`);
        view.innerHTML = await mod.default.render();
    } catch (e) {
        view.innerHTML = `<div style="grid-column: span 2; color:#ef4444; text-align:center;">Module ${modulePath} belum aktif, Master.</div>`;
        setTimeout(() => location.reload(), 2000);
    }
};

DREAM_CORE.init();
