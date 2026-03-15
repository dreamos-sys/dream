// shell.js
class SovereignShell {
    constructor() {
        window.DREAM = this;
        this.init();
    }

    async init() {
        // Force remove loader
        const loader = document.getElementById('system-loader');
        if(loader) loader.style.display = 'none';
        
        console.log("Kernel Booting...");
        await this.load('home');
    }

    async load(key) {
        const vp = document.getElementById('root-viewport');
        const nav = document.getElementById('main-nav');
        
        try {
            // Gunakan path relatif yang sangat jelas
            const modulePath = `./modules/${key}/index.js?v=${Date.now()}`;
            const module = await import(modulePath);
            
            vp.innerHTML = '';
            await module.default({ container: vp });
            
            if(nav) nav.style.display = 'flex';
        } catch (err) {
            console.error("Critical Load Error:", err);
            vp.innerHTML = `<div style="color:white; padding:20px; font-family:monospace;">
                <p>⚠️ Bismillah, Error Detected</p>
                <p style="font-size:10px; color:red;">${err.message}</p>
                <p style="font-size:10px;">Check: modules/${key}/index.js</p>
            </div>`;
        }
    }
}

// Jalankan sistem
new SovereignShell();
