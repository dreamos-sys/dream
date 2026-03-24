class DreamShell {
    constructor() {
        this.basePath = window.location.origin + window.location.pathname.split('index.html')[0];
        window.DREAM = this;
        this.init();
    }

    async init() {
        console.log("Bismillah, Dream OS v2.1 Active.");
        await this.load('home');
    }

    async load(key) {
        const vp = document.getElementById('root-viewport');
        try {
            const modulePath = `${this.basePath}modules/${key}/index.js?v=${Date.now()}`;
            const module = await import(modulePath);
            vp.innerHTML = '';
            await module.default({ container: vp });
            
            // Set Active Nav Style
            this.updateNavUI(key);
        } catch (err) {
            vp.innerHTML = `<div style="padding:40px; text-align:center; color:#ef4444;">
                <i class="fa-solid fa-circle-exclamation" style="font-size:40px;"></i><br><br>
                ⚠️ Bismillah, Error Loading: ${key}<br><small>${err.message}</small>
            </div>`;
        }
    }

    updateNavUI(key) {
        // Logika untuk merubah warna icon saat aktif
    }
}
new DreamShell();
