/**
 * DREAM OS KERNEL v13.9 - FINAL MASTER BUILD
 * Features: Dynamic Pathing, Auto-Recovery, Ghost Protection
 */

const MODULES = {
    'home': 'modules/home/index.js',
    'k3': 'modules/k3/index.js',
    'asset': 'modules/asset/index.js',
    'settings': 'modules/settings/index.js',
    'ghost': 'modules/ghost/brain-hub.js'
};

class SovereignShell {
    constructor() {
        this.ghostCounter = 0;
        this.basePath = window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
        this.init();
    }

    init() {
        window.DREAM = this;
        setTimeout(() => this.load('home'), 800);
        
        const trigger = document.getElementById('ghost-trigger-header');
        trigger.onclick = () => this.handleGhostClick();
    }

    async load(key) {
        try {
            const fullPath = `${this.basePath}/${MODULES[key]}?v=${Date.now()}`;
            const { default: renderModule } = await import(fullPath);
            
            const viewport = document.getElementById('root-viewport');
            viewport.innerHTML = '';
            await renderModule({ container: viewport });
            
            document.getElementById('system-loader').style.display = 'none';
            document.getElementById('main-nav').style.display = 'flex';
        } catch (err) {
            console.error("Kernel Error:", err);
            document.getElementById('system-loader').innerHTML = "SYSTEM ERROR - CHECK CONSOLE";
        }
    }

    handleGhostClick() {
        this.ghostCounter++;
        this.haptic(50);
        if (this.ghostCounter >= 5) {
            this.ghostCounter = 0;
            this.load('ghost');
        }
    }

    haptic(ms) { if (navigator.vibrate) navigator.vibrate(ms); }
}
new SovereignShell();
