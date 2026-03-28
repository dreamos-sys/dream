export default {
    render: (ctx) => {
        const userName = (ctx.user?.name || 'GUEST').toUpperCase();
        return `
            <div id="janitor-out-root">
                <div class="jo-panel jo-header" style="margin-bottom:1.5rem">
                    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                        <div style="font-size:3rem;">🌿</div>
                        <div>
                            <div class="jo-title">JANITOR OUTDOOR</div>
                            <div style="font-size:0.75rem;color:#94a3b8;">Ceklis Harian · 2 Petugas · Blok Area</div>
                        </div>
                        <div style="margin-left:auto; display:flex; gap:0.5rem;">
                            <span style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);color:#a855f7;padding:0.4rem 1rem;border-radius:30px;font-size:0.8rem;">${userName}</span>
                        </div>
                    </div>
                </div>

                <div class="jo-panel" style="background:rgba(6,182,212,0.08);border-color:#06b6d4;margin-bottom:1.5rem;">
                    <div style="font-size:0.85rem;color:#e2e8f0;">
                        <strong>📋 Info Kerja:</strong><br>
                        • Jam: Senin-Jumat 06:30-17:00, Sabtu 06:30-14:00, Minggu LIBUR<br>
                        • Ceklis: 3x/hari (Pagi ~07:00, Siang ~12:00, Sore ~16:00)<br>
                        • Petugas: 2 orang (Area Depan/Parkir, Area Belakang/Lapangan)<br>
                        • <strong style="color:#ef4444;">Area wajib diisi!</strong>
                    </div>
                </div>

                <div class="jo-tabs">
                    <div class="jo-tab active" data-tab="form">📝 Form Ceklis</div>
                    <div class="jo-tab" data-tab="history">📜 Riwayat</div>
                    <div class="jo-tab" data-tab="schedule">📅 Jadwal</div>
                </div>

                <div id="jo-form-tab" class="tab-content">
                    <div class="jo-panel">
                        <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:1.5rem;color:#06b6d4;">📝 Form Ceklis Outdoor</h3>
                        <form id="joForm">
                            <div class="jo-form-grid">
                                <div><label class="jo-label">Tanggal *</label><input type="date" id="jo-tanggal" class="jo-input" required></div>
                                <div><label class="jo-label">Ceklis Laporan *</label><select id="jo-shift" class="jo-select" required><option value="pagi">Pagi (~07:00)</option><option value="siang">Siang (~12:00)</option><option value="sore">Sore (~16:00)</option></select></div>
                                <div><label class="jo-label">Petugas *</label><input type="text" id="jo-petugas" class="jo-input" placeholder="Nama petugas" value="${ctx.user?.name || ''}" required></div>
                                <div><label class="jo-label">Area / Blok *</label><input type="text" id="jo-area" class="jo-input" placeholder="Contoh: Area Depan & Parkir" required><span style="font-size:0.65rem;color:#94a3b8;">Wajib diisi (sesuai penugasan)</span></div>
                                <div><label class="jo-label">Gedung</label><input type="text" id="jo-gedung" class="jo-input" placeholder="Outdoor" value="Outdoor" readonly></div>
                                <div><label class="jo-label">Lantai / Zona</label><input type="text" id="jo-lantai" class="jo-input" placeholder="-" value="-" readonly></div>
                            </div>

                            <div style="margin-top:1.5rem;">
                                <h4 style="font-size:1rem;font-weight:700;color:#06b6d4;margin-bottom:0.5rem;">📋 Poin Pengecekan</h4>
                                <div class="jo-checkbox-grid" id="check-grid">
                                    <label><input type="checkbox" id="check_sampah"> Sampah bersih</label>
                                    <label><input type="checkbox" id="check_rumput"> Rumput dipotong</label>
                                    <label><input type="checkbox" id="check_selokan"> Selokan lancar</label>
                                    <label><input type="checkbox" id="check_taman"> Taman rapi</label>
                                    <label><input type="checkbox" id="check_paving"> Paving / jalan bersih</label>
                                    <label><input type="checkbox" id="check_lampu"> Lampu taman berfungsi</label>
                                    <label><input type="checkbox" id="check_air"> Drainase air baik</label>
                                    <label><input type="checkbox" id="check_fasilitas"> Fasilitas umum utuh</label>
                                </div>
                            </div>

                            <div><label class="jo-label">Catatan / Temuan</label><textarea id="jo-catatan" rows="2" class="jo-textarea" placeholder="Misal: lampu mati, selokan mampet"></textarea></div>
                            <button type="submit" class="jo-btn jo-btn-primary" id="jo-submit"><i class="fas fa-save"></i> Simpan Ceklis Outdoor</button>
                            <div id="jo-form-result" style="margin-top:1rem;text-align:center;"></div>
                        </form>
                    </div>
                </div>

                <div id="jo-history-tab" class="tab-content" style="display:none;">
                    <div class="jo-panel">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                            <h3 style="font-size:1.2rem;font-weight:700;color:#06b6d4;">📜 Riwayat Ceklis Outdoor</h3>
                            <button id="jo-refresh-history" class="jo-btn jo-btn-sm"><i class="fas fa-sync-alt"></i> Refresh</button>
                        </div>
                        <div class="jo-table-wrap">
                            <table class="jo-table"><thead> <tr><th>Tanggal</th><th>Ceklis</th><th>Petugas</th><th>Area</th><th>Status</th><th>Aksi</th></tr> </thead><tbody id="jo-history-body"><tr><td colspan="6">Memuat...</td></tr></tbody></table>
                        </div>
                    </div>
                </div>

                <div id="jo-schedule-tab" class="tab-content" style="display:none;">
                    <div class="jo-panel">
                        <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:1.5rem;color:#06b6d4;">📅 Penugasan Petugas Outdoor</h3>
                        <div class="jo-table-wrap">
                            <table class="jo-table"><thead> <tr><th>Petugas</th><th>Area Tugas</th><th>Ceklis/Hari</th></tr> </thead><tbody>
                                <tr><td>Lestari</td><td>Area Depan & Parkir</td><td>3x (Pagi, Siang, Sore)</td></tr>
                                <tr><td>Mansur</td><td>Area Belakang & Lapangan</td><td>3x (Pagi, Siang, Sore)</td></tr>
                            </tbody></table>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                :root {
                    --jo-primary: #06b6d4;
                    --jo-primary-light: rgba(6,182,212,0.1);
                    --jo-primary-border: rgba(6,182,212,0.25);
                    --jo-bg-panel: rgba(15,23,42,0.88);
                    --jo-text: #e2e8f0;
                    --jo-text-muted: #94a3b8;
                    --jo-text-dim: #64748b;
                    --jo-border: rgba(255,255,255,0.08);
                    --jo-border-strong: rgba(255,255,255,0.15);
                    --jo-radius: 16px;
                    --jo-radius-sm: 12px;
                    --jo-radius-xs: 8px;
                    --jo-transition: 0.2s ease;
                    --jo-shadow: 0 4px 18px rgba(6,182,212,0.15);
                    --jo-font-sans: 'Rajdhani', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                #janitor-out-root * { box-sizing: border-box; }
                #janitor-out-root { max-width: 1000px; margin: 0 auto; padding: 1rem; font-family: var(--jo-font-sans); color: var(--jo-text); }
                .jo-panel { background: var(--jo-bg-panel); backdrop-filter: blur(18px); border: 1px solid var(--jo-primary-border); border-radius: var(--jo-radius); padding: 1.5rem; margin-bottom: 1.5rem; transition: background var(--jo-transition), border-color var(--jo-transition); }
                .jo-panel:hover { background: rgba(15,23,42,0.92); border-color: var(--jo-primary); }
                .jo-header { background: linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05)); border-left: 4px solid var(--jo-primary); }
                .jo-title { font-size: 1.8rem; font-weight: 800; background: linear-gradient(135deg, var(--jo-primary), #0891b2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.25rem; }
                .jo-tabs { display: flex; gap: 0.5rem; border-bottom: 2px solid var(--jo-primary-border); margin-bottom: 1.5rem; overflow-x: auto; }
                .jo-tabs::-webkit-scrollbar { display: none; }
                .jo-tab { padding: 0.65rem 1.5rem; background: rgba(255,255,255,0.04); border: 1px solid transparent; border-radius: 8px 8px 0 0; cursor: pointer; font-weight: 600; font-size: 0.9rem; color: var(--jo-text-dim); white-space: nowrap; transition: background var(--jo-transition), color var(--jo-transition); }
                .jo-tab:hover { background: var(--jo-primary-light); color: var(--jo-text); }
                .jo-tab.active { background: rgba(6,182,212,0.18); border-color: var(--jo-primary); color: var(--jo-primary); }
                .jo-form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
                .jo-label { display: block; font-size: 0.75rem; color: var(--jo-text-muted); margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.5px; }
                .jo-input, .jo-select, .jo-textarea { width: 100%; padding: 0.75rem 1rem; background: rgba(0,0,0,0.3); border: 1.5px solid var(--jo-primary-border); border-radius: var(--jo-radius-xs); color: var(--jo-text); font-family: inherit; font-size: 0.9rem; outline: none; transition: border-color var(--jo-transition), box-shadow var(--jo-transition); }
                .jo-input:focus, .jo-select:focus, .jo-textarea:focus { border-color: var(--jo-primary); box-shadow: 0 0 0 3px var(--jo-primary-light); }
                .jo-select option { background: #1e293b; color: var(--jo-text); }
                .jo-textarea { resize: vertical; min-height: 80px; }
                .jo-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border-radius: var(--jo-radius-xs); font-weight: 700; cursor: pointer; transition: transform var(--jo-transition), background var(--jo-transition), border-color var(--jo-transition); border: none; font-family: inherit; }
                .jo-btn-primary { background: linear-gradient(135deg, var(--jo-primary), #0891b2); color: #020617; width: 100%; }
                .jo-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: var(--jo-shadow); }
                .jo-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
                .jo-btn-sm { padding: 0.4rem 1rem; font-size: 0.8rem; border-radius: var(--jo-radius-xs); background: rgba(255,255,255,0.08); border: 1px solid var(--jo-border-strong); color: var(--jo-text); }
                .jo-btn-sm:hover { background: var(--jo-primary-light); border-color: var(--jo-primary); }
                .jo-table-wrap { overflow-x: auto; border-radius: var(--jo-radius); border: 1px solid var(--jo-border); }
                table.jo-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
                table.jo-table thead { background: rgba(0,0,0,0.3); }
                table.jo-table th { padding: 0.75rem 1rem; text-align: left; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--jo-text-muted); }
                table.jo-table td { padding: 0.75rem 1rem; border-top: 1px solid var(--jo-border); vertical-align: middle; }
                table.jo-table tr:hover td { background: rgba(255,255,255,0.02); }
                .jo-badge { display: inline-block; padding: 0.2rem 0.75rem; border-radius: 20px; font-size: 0.7rem; font-weight: 600; }
                .jo-badge-pending { background: rgba(245,158,11,0.2); color: #f59e0b; }
                .jo-badge-verified { background: rgba(16,185,129,0.2); color: #10b981; }
                .jo-badge-rejected { background: rgba(239,68,68,0.2); color: #ef4444; }
                .jo-checkbox-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem; margin-top: 0.5rem; margin-bottom: 1rem; }
                .jo-checkbox-grid label { display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; color: #cbd5e1; }
                .jo-spinner { width: 40px; height: 40px; border: 3px solid var(--jo-primary-light); border-top-color: var(--jo-primary); border-radius: 50%; animation: jo-spin 1s linear infinite; }
                @keyframes jo-spin { to { transform: rotate(360deg); } }
            </style>
        `;
    },

    afterRender: async (ctx) => {
        const supabase = ctx.supabase;
        const currentUser = ctx.user;
        const toast = ctx.toast || ((msg, type) => alert(`${type?.toUpperCase()}: ${msg}`));

        function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
        function fmtDate(d) { return d ? new Date(d).toLocaleDateString('id-ID', {day:'2-digit',month:'short',year:'numeric'}) : '—'; }

        async function writeAuditLog(action, detail) {
            if (!supabase) return;
            try {
                await supabase.from('audit_logs').insert([{
                    action,
                    detail,
                    user: currentUser?.name || 'System',
                    created_at: new Date().toISOString()
                }]);
            } catch (e) { console.warn('[JANITOR-OUT] audit_log error:', e.message); }
        }

        async function loadHistory() {
            const tbody = document.getElementById('jo-history-body');
            if (!tbody || !supabase) return;
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;"><div class="jo-spinner"></div><p>Memuat...</p></td></tr>';
            try {
                const { data, error } = await supabase
                    .from('janitor_outdoor')
                    .select('id, tanggal, shift, petugas, area, status, created_at')
                    .order('created_at', { ascending: false })
                    .limit(50);
                if (error) throw error;
                if (!data || data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;">Belum ada data</td></tr>';
                    return;
                }
                let html = '';
                data.forEach(item => {
                    let statusClass = 'jo-badge-pending', statusText = 'Pending';
                    if (item.status === 'verified') { statusClass = 'jo-badge-verified'; statusText = 'Selesai'; }
                    else if (item.status === 'rejected') { statusClass = 'jo-badge-rejected'; statusText = 'Ditolak'; }
                    html += `<tr>
                        <td>${fmtDate(item.tanggal)}</td>
                        <td>${esc(item.shift)}</td>
                        <td>${esc(item.petugas)}</td>
                        <td>${esc(item.area || '—')}</td>
                        <td><span class="jo-badge ${statusClass}">${statusText}</span></td>
                        <td><button class="jo-btn jo-btn-sm" data-id="${item.id}" data-action="detail"><i class="fas fa-eye"></i></button></td>
                    </tr>`;
                });
                tbody.innerHTML = html;
            } catch (err) {
                console.error(err);
                tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#ef4444;">Gagal memuat: ${esc(err.message)}</td></tr>`;
            }
        }

        async function handleSubmit(e) {
            e.preventDefault();
            const tanggal = document.getElementById('jo-tanggal')?.value;
            const shift = document.getElementById('jo-shift')?.value;
            const petugas = document.getElementById('jo-petugas')?.value.trim();
            const area = document.getElementById('jo-area')?.value.trim();
            const catatan = document.getElementById('jo-catatan')?.value.trim() || null;

            if (!tanggal || !petugas || !area) {
                toast('Tanggal, Petugas, dan Area wajib diisi!', 'warning');
                return;
            }

            const items = {};
            document.querySelectorAll('#check-grid input[type=checkbox]').forEach(cb => {
                const id = cb.id.replace('check_', '');
                items[id] = cb.checked;
            });

            const data = {
                tanggal, shift, petugas, area,
                gedung: 'Outdoor', lantai: '-',
                items, catatan,
                status: 'pending',
                created_at: new Date().toISOString(),
                created_by: petugas
            };

            const btn = document.getElementById('jo-submit');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
            try {
                if (!supabase) throw new Error('Supabase tidak tersedia');
                const { error } = await supabase.from('janitor_outdoor').insert([data]);
                if (error) throw error;
                await writeAuditLog('Janitor Outdoor', `Ceklis ${area} - ${shift} oleh ${petugas}`);
                toast('Ceklis outdoor berhasil disimpan!', 'success');
                document.getElementById('joForm').reset();
                document.getElementById('jo-tanggal').value = new Date().toISOString().split('T')[0];
                document.querySelectorAll('#check-grid input[type=checkbox]').forEach(cb => cb.checked = false);
                if (document.querySelector('.jo-tab.active')?.dataset.tab === 'history') loadHistory();
            } catch (err) {
                console.error(err);
                toast('Gagal: ' + err.message, 'error');
                document.getElementById('jo-form-result').innerHTML = `<span style="color:#ef4444;">❌ ${err.message}</span>`;
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        }

        function switchTab(tab) {
            document.querySelectorAll('.jo-tab').forEach(t => t.classList.remove('active'));
            const activeTab = document.querySelector(`.jo-tab[data-tab="${tab}"]`);
            if (activeTab) activeTab.classList.add('active');
            document.getElementById('jo-form-tab').style.display = tab === 'form' ? 'block' : 'none';
            document.getElementById('jo-history-tab').style.display = tab === 'history' ? 'block' : 'none';
            document.getElementById('jo-schedule-tab').style.display = tab === 'schedule' ? 'block' : 'none';
            if (tab === 'history') loadHistory();
        }

        // Attach events
        document.querySelectorAll('.jo-tab').forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });
        const form = document.getElementById('joForm');
        if (form) form.addEventListener('submit', handleSubmit);
        const refreshBtn = document.getElementById('jo-refresh-history');
        if (refreshBtn) refreshBtn.addEventListener('click', loadHistory);
        const tbody = document.getElementById('jo-history-body');
        if (tbody) {
            tbody.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-action="detail"]');
                if (btn) toast(`Detail ID: ${btn.dataset.id} (fitur detail segera hadir)`, 'info');
            });
        }
        const tglInput = document.getElementById('jo-tanggal');
        if (tglInput) tglInput.value = new Date().toISOString().split('T')[0];
        if (document.getElementById('jo-history-tab').style.display !== 'none') loadHistory();
    }
};
