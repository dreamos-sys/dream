// modules/sekuriti/module.js
export async function render() {
    return `
        <div class="p-4 space-y-6 animate-fade-in">
            <h2 class="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <i class="fas fa-user-shield"></i> Security Gate ISO
            </h2>
            
            <div class="grid grid-cols-1 gap-4">
                <div class="glass-card p-4 border-l-4 border-emerald-500" style="background:rgba(16,185,129,0.1);border-radius:12px;">
                    <p class="text-xs text-slate-400 uppercase">Approver Status</p>
                    <p class="text-lg font-bold text-white">Pak Hanung Budianto S.E.</p>
                    <p class="text-[10px] text-emerald-500">Kepala Bagian Umum</p>
                </div>

                <div class="glass-card p-4 border-l-4 border-blue-500" style="background:rgba(59,130,246,0.1);border-radius:12px;">
                    <p class="text-xs text-slate-400 uppercase">Coordinator</p>
                    <p class="text-lg font-bold text-white">Pak Erwinsyah</p>
                    <p class="text-[10px] text-blue-500">Koord Bagian Umum</p>
                </div>
            </div>

            <button onclick="StealthEngine?.activatePanicMode()" class="w-full py-4 bg-red-500/20 border border-red-500/50 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-2" style="background:rgba(239,68,68,0.2);border:1px solid rgba(239,68,68,0.5);border-radius:16px;">
                <i class="fas fa-exclamation-triangle"></i> AKTIFKAN PANIC MODE
            </button>
        </div>
    `;
}
