/**
 * SOVEREIGN KERNEL v13.7 - ANTI-STUCK PATCH
 * Recovery for GitHub Pages Path Issues
 */

const MODULES = {
    'home': { path: 'modules/home.js' },
    'k3': { path: 'modules/k3.js' },
    'asset': { path: 'modules/asset.js' },
    'settings': { path: 'modules/settings.js' },
    'ghost': { path: 'modules/ghost/brain-hub.js' }
};

class SovereignShell {
    constructor() {
        this.ghostCounter = 0;
        this.failCounter = 0;
        this.isLocked = false;
        this.currentUser = { 
            name: 'My Bro', 
            email: 'girangati1001@gmail.com', 
            role: 'architect' 
        };
        this.init();
    }

    init() {
        window.DREAM = this;
        this.checkLockdown();
        
        const trigger = document.getElementById('ghost-trigger-header');
        if (trigger) trigger.onclick = () => this.handleGhostClick();
        
        // Boot Sequence dengan Emergency Timeout
        setTimeout(() => this.load('home'), 1000);
        
        // EMERGENCY ANTIBODY: Jika 5 detik masih stuck, paksa hilangkan loader
        setTimeout(() => {
            const loader = document.getElementById('system-loader');
            if (loader && loader.style.display !== 'none') {
                console.warn("Antibody: Preloader stuck detected. Forcing UI...");
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }
        }, 5000);
    }

    async load(key) {
        if (this.isLocked) return;
        
        const viewport = document.getElementById('root-viewport');
        const loader = document.getElementById('system-loader');
        const nav = document.getElementById('main-nav');

        try {
            // Fix Path untuk GitHub: Mencoba tanpa ./ agar lebih universal
            const modPath = `./${MODULES[key].path}?v=${Date.now()}`;
            const { default: renderModule } = await import(modPath);
            
            viewport.innerHTML = ''; 
            await renderModule({ container: viewport, user: this.currentUser });

            // Sukses Load: Hilangkan Preloader
            if(loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }
            if(nav) nav.style.display = 'flex';
            this.updateNav(key);

        } catch (err) {
            console.error("Critical Load Error:", err);
            // Jika modul gagal, paksa loader hilang agar user bisa lapor/refresh
            if(loader) loader.style.display = 'none';
            viewport.innerHTML = `<div style="color:white; padding:20px; text-align:center;">
                <i class="fa-solid fa-circle-xmark"></i><br>
                Gagal memuat modul ${key}.<br>Cek path: ${MODULES[key].path}
            </div>`;
        }
    }

    handleGhostClick() {
        if (this.isLocked) return;
        this.haptic(60);
        this.ghostCounter++;
        
        clearTimeout(this.ghostTimer);
        this.ghostTimer = setTimeout(() => {
            if (this.ghostCounter > 0 && this.ghostCounter < 5) {
                this.failCounter++;
                if (this.failCounter >= 3) this.activateLockdown();
            }
            this.ghostCounter = 0;
        }, 2000);

        if (this.ghostCounter >= 5) {
            this.ghostCounter = 0;
            this.failCounter = 0;
            this.haptic([100, 50, 100]);
            this.load('ghost');
        }
    }

    checkLockdown() {
        const lockUntil = localStorage.getItem('dreamos_lock');
        const screen = document.getElementById('lockdown-screen');
        if (lockUntil && Date.now() < lockUntil) {
            this.isLocked = true;
            if (screen) screen.style.display = 'flex';
        } else {
            this.isLocked = false;
            if (screen) screen.style.display = 'none';
        }
    }

    updateNav(key) {
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('onclick')?.includes(`'${key}'`)) el.classList.add('active');
        });
    }

    haptic(pattern) { if (navigator.vibrate) navigator.vibrate(pattern); }
}

new SovereignShell();
