/**
 * shell.js - Ghost Architect Core Shell
 * Standar ISO 27001 & 9001 Compliance
 */

const renderShell = () => {
    const app = document.getElementById('app-shell');
    app.innerHTML = `
        <div id="loading-overlay" class="fixed inset-0 bg-slate-950 z-[10000] flex items-center justify-center transition-opacity duration-500">
            <div class="text-center">
                <div class="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4 mx-auto"></div>
                <p class="text-emerald-400 font-arabic text-2xl animate-pulse">بِسْمِ اللَّهِ</p>
            </div>
        </div>

        <header class="shell-header glass-effect sticky top-0 z-50 border-b border-emerald-500/20 px-4 py-2">
            <div class="flex justify-between text-[10px] text-emerald-500/60 font-mono mb-2">
                <div class="flex gap-3">
                    <span id="p-time">Fajr 04:40</span>
                    <span id="n-status"><i class="fas fa-signal"></i> 4G+</span>
                </div>
                <div id="b-status">93% <i class="fas fa-battery-three-quarters"></i></div>
            </div>

            <div class="text-center py-2">
                <h1 class="font-arabic text-xl text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </h1>
                <p class="text-[9px] text-emerald-300/50 uppercase tracking-[0.2em] font-bold">Dream OS Sovereign v2.1</p>
            </div>
        </header>

        <main id="dynamic-stage" class="min-h-screen px-4 pt-6 pb-32"></main>

        <nav class="fixed bottom-0 left-0 right-0 glass-effect border-t border-emerald-500/20 px-6 py-4 flex justify-between items-center z-40">
            <button onclick="DREAM_SYS.haptic(20); DREAM.load('home')" class="text-slate-400 hover:text-emerald-400 transition-colors">
                <i class="fas fa-home-alt text-xl"></i>
            </button>
            <button onclick="DREAM_SYS.haptic(20); DREAM.load('sekuriti')" class="text-slate-400 hover:text-emerald-400 transition-colors">
                <i class="fas fa-shield-halved text-xl"></i>
            </button>

            <div class="relative -mt-12 group" onclick="DREAM_SYS.haptic(100); window.openAIPanel?.()">
                <div class="absolute inset-0 bg-emerald-500 blur-xl opacity-30 group-active:opacity-60 transition-opacity"></div>
                <div class="relative w-16 h-16 bg-emerald-500 rounded-2xl rotate-45 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)] border-2 border-emerald-300/30 overflow-hidden cursor-pointer">
                    <div class="-rotate-45 text-white text-center">
                        <p class="font-arabic text-[10px] leading-tight">صلوات</p>
                    </div>
                </div>
            </div>

            <button onclick="DREAM_SYS.haptic(20); DREAM.load('inventory')" class="text-slate-400 hover:text-emerald-400 transition-colors">
                <i class="fas fa-boxes-stacked text-xl"></i>
            </button>
            <button onclick="DREAM_SYS.haptic(20); DREAM.load('profile')" class="text-slate-400 hover:text-emerald-400 transition-colors">
                <i class="fas fa-user-gear text-xl"></i>
            </button>
        </nav>
    `;
};

// Auto-Init System
document.addEventListener('DOMContentLoaded', () => {
    renderShell();
    window.DREAM_SYS.log('success', 'Dream OS Shell Engine Ready');
    
    // Default Home Page
    const stage = document.getElementById('dynamic-stage');
    stage.innerHTML = `
        <div class="text-center mt-20 animate-fade-in">
            <h2 class="text-3xl font-bold text-white mb-2">Beranda</h2>
            <p class="text-slate-400 mb-8">Selamat datang di sistem mandiri Anda.</p>
            <button onclick="DREAM.load('profile')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
                Lihat Profil
            </button>
        </div>
    `;

    setTimeout(() => {
        const loader = document.getElementById('loading-overlay');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 1500);
});
