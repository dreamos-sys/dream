class GhostArchitect {
    constructor() {
        this.basePath = window.location.origin + window.location.pathname.split('index.html')[0];
        window.DREAM = this;
        this.init();
    }

    async init() {
        console.log("Bismillah, Architect Mode Active.");
        this.load('home');
        this.setupGhostTrigger();
    }

    async load(moduleName) {
        const vp = document.getElementById('app-viewport');
        try {
            // Path sinkron dengan folder GitHub Anda
            const path = `${this.basePath}modules/${moduleName}/index.js?v=${Date.now()}`;
            const module = await import(path);
            
            vp.innerHTML = '<div class="flex justify-center p-10"><i class="fas fa-spinner fa-spin text-emerald-500 text-3xl"></i></div>';
            
            // Passing all services ke module
            await module.default({ 
                container: vp,
                supabase: window.supabase, // Asumsi sudah diload di index
                user: { role: 'architect' }
            });

        } catch (err) {
            vp.innerHTML = `
                <div class="p-10 text-center">
                    <div class="text-red-500 mb-4 text-5xl">⚠️</div>
                    <h2 class="text-xl font-bold">Bismillah, File Missing</h2>
                    <p class="text-slate-400 text-sm mt-2">Folder: /modules/${moduleName}/index.js</p>
                    <button onclick="location.reload()" class="mt-6 bg-emerald-600 px-6 py-2 rounded-full text-xs">REPAIR SYSTEM</button>
                </div>`;
        }
    }

    setupGhostTrigger() {
        let clicks = 0;
        document.getElementById('ghost-mode-trigger').onclick = () => {
            clicks++;
            if(clicks === 7) {
                alert("GHOST ARCHITECT MODE: UNLOCKED");
                this.load('admin-console');
            }
        };
    }
}
new GhostArchitect();
