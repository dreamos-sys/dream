export default async function render({ container }) {
    container.innerHTML = `
        <div class="max-w-md mx-auto pt-8 pb-24">
            <div class="grid grid-cols-3 gap-3 p-4">
                ${['Home','K3','Sekuriti','Ceklis','Stok','Maint','Asset','Laporan','TV'].map(m => `
                    <div class="bg-white p-4 rounded-2xl shadow-sm text-center">
                        <i class="fa-solid fa-box text-emerald-500 text-2xl mb-2"></i>
                        <div class="text-[10px] font-bold text-slate-700">${m}</div>
                    </div>
                `).join('')}
            </div>
            <div class="px-4">
                <button class="w-full bg-red-500 text-white p-4 rounded-xl font-black">LOGOUT</button>
            </div>
        </div>
    `;
}
