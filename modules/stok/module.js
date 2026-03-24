/**
 * 📦 DREAM OS - STOK & ASSET MODULE
 * Standard ISO 55001 - Asset Management
 */

export default {
    async render() {
        return `
            <div class="p-5 animate-up">
                <div class="flex items-center gap-4 mb-8">
                    <button onclick="DREAM.navigate('home')" class="glass p-3 rounded-2xl">
                        <i class="fas fa-arrow-left text-lime-400"></i>
                    </button>
                    <h2 class="text-xl font-black text-white uppercase tracking-widest">STOK GUDANG</h2>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="glass p-4 border-lime-500/20">
                        <p class="text-[9px] text-lime-500 font-bold uppercase">Total Item</p>
                        <h3 class="text-2xl font-black text-white">124</h3>
                    </div>
                    <div class="glass p-4 border-red-500/20">
                        <p class="text-[9px] text-red-500 font-bold uppercase">Low Stock</p>
                        <h3 class="text-2xl font-black text-white">5</h3>
                    </div>
                </div>

                <div class="glass overflow-hidden border-white/5">
                    <div class="p-4 bg-white/5 border-b border-white/5">
                        <p class="text-[10px] font-bold text-slate-400">DAFTAR KEBUTUHAN ATK</p>
                    </div>
                    <div class="divide-y divide-white/5">
                        ${['Kertas A4', 'Tinta Printer', 'Lakban', 'Baterai Mic'].map(item => `
                            <div class="p-4 flex justify-between items-center">
                                <div>
                                    <p class="text-sm font-bold text-white">${item}</p>
                                    <p class="text-[9px] text-slate-500 uppercase">Gudang Umum</p>
                                </div>
                                <div class="text-right">
                                    <span class="px-3 py-1 bg-lime-500/10 text-lime-500 text-[10px] font-bold rounded-full">IN STOCK</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
};
