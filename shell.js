// DREAM OS v2.1 - KERNEL MODULE
const MANTRA = "012443410";

class DreamKernel {
    constructor() {
        this.init();
    }

    init() {
        document.getElementById('app-shell').innerHTML = `
            <div id="auth-screen" class="h-screen flex items-center justify-center bg-black">
                <div class="text-center p-10 glass rounded-[3rem] border border-white/5 shadow-2xl">
                    <div class="w-20 h-20 bg-green-500 rounded-3xl mx-auto mb-8 flex items-center justify-center">
                        <i class="fas fa-microchip text-3xl text-black"></i>
                    </div>
                    <h1 class="text-[10px] tracking-[10px] text-white/30 uppercase mb-10 font-black">AI CORE v2.1</h1>
                    <div class="relative">
                        <input type="password" id="pin" placeholder="MANTRA" class="bg-transparent border-b border-white/10 text-center tracking-[10px] outline-none w-48 pb-2 text-sm focus:border-green-500 transition-all uppercase">
                        <i id="toggle" class="fas fa-eye absolute right-0 bottom-3 text-white/20 cursor-pointer"></i>
                    </div>
                </div>
            </div>
        `;
        
        // Logic Intip Mantra (Mata)
        const pin = document.getElementById('pin');
        document.getElementById('toggle').onclick = () => {
            pin.type = pin.type === 'password' ? 'text' : 'password';
        };

        pin.addEventListener('input', (e) => {
            if(e.target.value === MANTRA) this.boot();
        });
    }

    boot() {
        document.getElementById('app-shell').innerHTML = `
            <div class="p-6 animate-fade-in text-center">
                <p class="text-green-500 text-lg mb-2 font-serif italic">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                <div class="grid grid-cols-3 gap-4 mt-10">
                    ${['Booking','K3','Security','Janitor','Tools','Maintenance','Assets','Arena','Admin'].map(m => `
                        <div class="aspect-square bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center">
                            <i class="fas fa-cube mb-2 opacity-50"></i>
                            <span class="text-[8px] uppercase font-bold opacity-30">${m}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

new DreamKernel();
