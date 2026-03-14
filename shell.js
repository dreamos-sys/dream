import './core.js'; // Import Smart Core v18.0

class SovereignShell {
    constructor() { 
        this.ghostCounter = 0;
        this.init(); 
    }
    
    init() {
        window.DREAM = this;
        // Inisialisasi StealthCore dari core.js
        window.StealthCore = new GhostStealthEngine();
        
        const trigger = document.getElementById('ghost-header-trigger');
        if(trigger) trigger.onclick = () => this.handleGhostClick();
        
        setTimeout(() => this.load('home'), 800);
    }

    handleGhostClick() {
        this.ghostCounter++;
        this.haptic(50);
        if(this.ghostCounter >= 5) {
            this.ghostCounter = 0;
            this.load('ghost'); // Panel Monitoring/Brain Hub
        }
    }

    async load(key) {
        try {
            const { default: render } = await import(`./modules/${key}/index.js?v=${Date.now()}`);
            const vp = document.getElementById('root-viewport');
            vp.innerHTML = '';
            render({ container: vp, role: localStorage.getItem('userRole') || 'erwinsyah' });
            document.getElementById('system-loader').style.display = 'none';
            document.getElementById('main-nav').style.display = 'flex';
        } catch (e) {
            console.error("Kernel Error:", e);
        }
    }

    haptic(ms) { if(navigator.vibrate) navigator.vibrate(ms); }
}
new SovereignShell();
