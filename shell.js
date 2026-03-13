const renderShell = () => {
    const app = document.getElementById('app-shell');
    app.innerHTML = `
        <header class="shell-header glass-effect sticky top-0 z-50 border-b border-emerald-500/20">
            <div class="flex justify-between px-6 py-2 text-[10px] text-emerald-500/60 font-mono">
                <div class="flex gap-4">
                    <span id="p-time">Fajr 04:40</span>
                    <span><i class="fas fa-signal-stream"></i> 4G+</span>
                </div>
                <div>93% <i class="fas fa-battery-bolt"></i></div>
            </div>

            <div class="text-center py-4 bg-gradient-to-b from-emerald-500/10 to-transparent">
                <h1 class="font-arabic text-2xl text-emerald-400 drop-shadow-glow mb-1">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </h1>
                <h2 class="font-arabic text-sm text-emerald-300/70">
                    اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ
                </h2>
            </div>
        </header>

        <main id="dynamic-stage" class="min-h-screen pb-32 px-4 pt-6"></main>

        <nav class="fixed bottom-0 left-0 right-0 glass-effect border-t border-emerald-500/20 px-8 py-5 flex justify-between items-center z-40">
            <button onclick="DREAM.load('home')" class="nav-btn"><i class="fas fa-home-lg-alt"></i></button>
            <button onclick="DREAM.load('sekuriti')" class="nav-btn"><i class="fas fa-shield-keyhole"></i></button>
            
            <div class="center-hex-container" onclick="DREAM.load('ai-panel')">
                <div class="center-hex">
                    <div class="hex-inner font-arabic">صلوات</div>
                </div>
            </div>

            <button onclick="DREAM.load('inventory')" class="nav-btn"><i class="fas fa-inventory"></i></button>
            <button onclick="DREAM.load('profile')" class="nav-btn"><i class="fas fa-user-shield"></i></button>
        </nav>
    `;
};

document.addEventListener('DOMContentLoaded', () => {
    renderShell();
    window.DREAM_SYS.log('success', 'Dream OS v2.1 Initialized bi idznillah');
});
