/**
 * SOVEREIGN KERNEL v13.6
 * Features: Ghost Stealth, 5-Min Lockdown, Antibody
 */

const MODULES = {
    'home': { path: './modules/home.js' },
    'k3': { path: './modules/k3.js' },
    'asset': { path: './modules/asset.js' },
    'settings': { path: './modules/settings.js' },
    'ghost': { path: './modules/ghost/brain-hub.js' }
};

class SovereignShell {
    constructor() {
        this.ghostCounter = 0;
        this.failCounter = 0;
        this.ghostTimer = null;
        this.isLocked = false;
        this.init();
    }

    init() {
        window.DREAM = this;
        this.checkLockdown();
        
        document.getElementById('ghost-trigger-header').onclick = () => this.handleGhostClick();
        setTimeout(() => this.load('home'), 1500);
    }

    async load(key) {
        if (this.isLocked) return;
        this.haptic(40);
        
        const viewport = document.getElementById('root-viewport');
        const loader = document.getElementById('system-loader');
        const nav = document.getElementById('main-nav');

        try {
            const { default: renderModule } = await import(`${MODULES[key].path}?v=${Date.now()}`);
            viewport.innerHTML = ''; 
            await renderModule({ container: viewport, user: 'My Bro' });

            if(loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }
            nav.style.display = 'flex';
            this.updateNav(key);
        } catch (err) {
            console.error("Antibody Triggered: Resetting...", err);
            location.reload(); 
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
        }, 2500);

        if (this.ghostCounter >= 5) {
            this.ghostCounter = 0;
            this.failCounter = 0;
            this.haptic([100, 50, 100]);
            this.load('ghost');
        }
    }

    activateLockdown() {
        this.isLocked = true;
        const endTime = Date.now() + (5 * 60 * 1000);
        localStorage.setItem('dreamos_lock', endTime);
        this.checkLockdown();
    }

    checkLockdown() {
        const lockUntil = localStorage.getItem('dreamos_lock');
        if (lockUntil && Date.now() < lockUntil) {
            this.isLocked = true;
            document.getElementById('lockdown-screen').style.display = 'flex';
            const remaining = Math.ceil((lockUntil - Date.now()) / 1000);
            setTimeout(() => this.checkLockdown(), 1000);
        } else {
            this.isLocked = false;
            document.getElementById('lockdown-screen').style.display = 'none';
            localStorage.removeItem('dreamos_lock');
        }
    }

    updateNav(key) {
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if (el.getAttribute('onclick')?.includes(`'${key}'`)) el.classList.add('active');
        });
    }

    haptic(ms) {
        if (navigator.vibrate) navigator.vibrate(ms);
    }
}

new SovereignShell();
