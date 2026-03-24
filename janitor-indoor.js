/**
 * 🧹 DREAM OS - JANITOR INDOOR MODULE (ENTERPRISE GRADE)
 * Standard: ISO 9001 Quality Management
 * Feature: Ruangan & Toilet Checklist, Shift Tracking, History
 * Bismillah bi idznillah.
 */
console.log('🧹 Janitor Indoor Module Loaded');

(function() {
    'use strict';
    const supabase = window.supabase;
    if (!supabase) return console.error('❌ Supabase Missing');

    // 1. Tab Navigation Logic
    const tabs = ['form', 'history', 'schedule'];
    window.activateJanitorTab = (active) => {
        tabs.forEach(t => {
            const btn = document.getElementById(`tab-${t}`);
            const panel = document.getElementById(`panel-${t}`);
            if (btn) {
                btn.classList.toggle('border-teal-500', t === active);
                btn.classList.toggle('text-teal-600', t === active);
                btn.classList.toggle('text-gray-500', t !== active);
            }
            if (panel) panel.classList.toggle('hidden', t !== active);
        });
        if (active === 'history') loadHistory();
    };

    // 2. Load History with Clean UI
    async function loadHistory() {
        const tbody = document.getElementById('history-body');
        if (!tbody) return;
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 opacity-50 text-xs">⏳ Sinkronisasi data...</td></tr>';

        try {
            const { data, error } = await supabase
                .from('janitor_indoor')
                .select('id, tanggal, shift, petugas, lokasi, status')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;
            if (!data?.length) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-xs opacity-60">Belum ada laporan hari ini.</td></tr>';
                return;
            }

            tbody.innerHTML = data.map(item => `
                <tr class="border-b border-white/5 hover:bg-white/5 transition text-[11px]">
                    <td class="p-2 font-mono">${item.tanggal}</td>
                    <td class="p-2 uppercase font-bold text-teal-400">${item.shift || '-'}</td>
                    <td class="p-2">${item.petugas}</td>
                    <td class="p-2 opacity-80">${item.lokasi}</td>
                    <td class="p-2">
                        <span class="px-2 py-0.5 rounded-full ${item.status === 'verified' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}">
                            ${item.status}
                        </span>
                    </td>
                    <td class="p-2"><button onclick="viewDetail('${item.id}')" class="text-blue-400 hover:underline">Detail</button></td>
                </tr>
            `).join('');
        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-red-500 text-center text-xs">Gagal memuat riwayat.</td></tr>';
        }
    }

    // 3. Form Submission (Enterprise Logic)
    const form = document.getElementById('janitorIndoorForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const resDiv = document.getElementById('form-result');
            resDiv.innerHTML = '<span class="text-yellow-500 animate-pulse text-xs font-mono">📡 MENGIRIM DATA...</span>';

            // Gather Data
            const getChecked = (selector) => {
                const items = {};
                document.querySelectorAll(selector).forEach(el => {
                    items[el.id.replace('toilet_', '').replace('ruang_', '')] = el.checked;
                });
                return items;
            };

            const formData = {
                tanggal: document.getElementById('tanggal').value,
                shift: document.getElementById('shift').value,
                petugas: document.getElementById('petugas').value,
                lokasi: document.getElementById('lokasi').value,
                catatan: document.getElementById('catatan').value || null,
                items: {
                    toilet: getChecked('input[id^="toilet_"]'),
                    ruangan: getChecked('input[id^="ruang_"]')
                },
                status: 'pending'
            };

            try {
                const { error } = await supabase.from('janitor_indoor').insert([formData]);
                if (error) throw error;
                resDiv.innerHTML = '<span class="text-green-500 font-bold text-xs uppercase">✅ Laporan Berhasil Terkirim!</span>';
                form.reset();
                setTimeout(() => resDiv.innerHTML = '', 4000);
            } catch (err) {
                resDiv.innerHTML = `<span class="text-red-500 text-xs">Error: ${err.message}</span>`;
            }
        });
    }

    // Init Access
    window.viewDetail = (id) => alert('Detail ID: ' + id + '\n(Fitur lampiran foto sedang sinkronisasi)');
    document.getElementById('refresh-history')?.addEventListener('click', loadHistory);

    // Default Tab
    if (document.getElementById('tab-form')) activateJanitorTab('form');
})();
