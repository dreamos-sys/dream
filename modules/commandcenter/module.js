export default {
    name: 'Enterprise Command Center',
    icon: 'fa-building',
    color: '#a855f7',
    version: '6.0.0',
    
    render(context) {
        const supabase = context.supabase;
        window._commandSupabase = supabase;
        return `
            <div style="background:linear-gradient(135deg, #0f0f1f, #1a1a2e); border-radius:28px; padding:24px; margin-bottom:24px; border:1px solid rgba(168,85,247,0.3);">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
                    <div style="display:flex; align-items:center; gap:20px;">
                        <div style="width:70px; height:70px; background:linear-gradient(135deg, #a855f7, #8b5cf6); border-radius:20px; display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-crown" style="font-size:36px; color:gold;"></i>
                        </div>
                        <div>
                            <h1 style="color:#a855f7; margin:0;">ENTERPRISE COMMAND CENTER</h1>
                            <p style="color:#94a3b8;">Integrated Operations Dashboard | Real‑time Monitoring | AI Analytics</p>
                        </div>
                    </div>
                    <div>
                        <span class="badge" style="background:#10b981; padding:6px 14px; border-radius:20px;">LIVE</span>
                        <button id="refresh-all" style="background:#334155; border:none; padding:6px 14px; border-radius:20px; margin-left:10px; cursor:pointer;">⟳ Refresh All</button>
                    </div>
                </div>
            </div>

            <!-- KPI Grid Dinamis dengan Data Real-time -->
            <div class="kpi-grid" style="display:grid; grid-template-columns:repeat(5,1fr); gap:16px; margin-bottom:24px;">
                <div class="kpi-card" id="kpi-stok" style="background:rgba(168,85,247,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-boxes" style="font-size:24px; color:#a855f7;"></i>
                    <div style="font-size:28px; font-weight:700;">--</div>
                    <div>Stok Items</div>
                </div>
                <div class="kpi-card" id="kpi-request" style="background:rgba(59,130,246,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-clipboard-list" style="font-size:24px; color:#3b82f6;"></i>
                    <div style="font-size:28px; font-weight:700;">--</div>
                    <div>Requests Pending</div>
                </div>
                <div class="kpi-card" id="kpi-janitor" style="background:rgba(245,158,11,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-broom" style="font-size:24px; color:#f59e0b;"></i>
                    <div style="font-size:28px; font-weight:700;">--</div>
                    <div>Janitor Activities</div>
                </div>
                <div class="kpi-card" id="kpi-maintenance" style="background:rgba(239,68,68,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-tools" style="font-size:24px; color:#ef4444;"></i>
                    <div style="font-size:28px; font-weight:700;">--</div>
                    <div>Maintenance Active</div>
                </div>
                <div class="kpi-card" id="kpi-approval" style="background:rgba(16,185,129,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-check-circle" style="font-size:24px; color:#10b981;"></i>
                    <div style="font-size:28px; font-weight:700;">--</div>
                    <div>Approvals Needed</div>
                </div>
            </div>

            <!-- AI Predictive Analytics & Recommendation -->
            <div style="background:linear-gradient(135deg, #1e1b4b, #0c0a2a); border-radius:24px; padding:20px; margin-bottom:24px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <h3 style="color:#a855f7; margin:0;"><i class="fas fa-brain"></i> AI Predictive Analytics</h3>
                    <button id="ai-predict-refresh" style="background:#a855f7; border:none; padding:4px 12px; border-radius:20px; cursor:pointer;">⟳ Analyze Now</button>
                </div>
                <div id="ai-predictions" style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px;">
                    <div><strong>Stok Forecast</strong><div id="forecast-stok" style="font-size:24px;">--</div></div>
                    <div><strong>Request Trend</strong><div id="forecast-request" style="font-size:24px;">--</div></div>
                    <div><strong>Maintenance Risk</strong><div id="forecast-risk" style="font-size:24px;">--</div></div>
                    <div><strong>Efficiency Score</strong><div id="forecast-score" style="font-size:24px;">--</div></div>
                </div>
                <div id="ai-recommendation" style="margin-top:16px; background:rgba(168,85,247,0.2); border-radius:16px; padding:12px;">
                    <i class="fas fa-robot"></i> <strong>AI Recommendation:</strong> Loading data...
                </div>
            </div>

            <!-- Tabs Utama -->
            <div class="nav-tabs" style="display:flex; gap:8px; border-bottom:2px solid rgba(168,85,247,0.3); margin-bottom:24px; flex-wrap:wrap;">
                <button class="nav-tab active" data-tab="monitor">📊 Monitoring</button>
                <button class="nav-tab" data-tab="approval">✅ Approval</button>
                <button class="nav-tab" data-tab="analytics">📈 Analytics</button>
                <button class="nav-tab" data-tab="reports">📁 Reports</button>
                <button class="nav-tab" data-tab="ai-assistant">🤖 AI Assistant</button>
            </div>
            <div id="command-content" style="min-height:400px;">
                <p style="text-align:center;">Memuat data...</p>
            </div>

            <style>
                .kpi-card { transition: all 0.3s; cursor: pointer; }
                .kpi-card:hover { transform: translateY(-5px); background: rgba(168,85,247,0.2); }
                .nav-tab { background: none; border: none; padding: 10px 18px; cursor: pointer; color: #94a3b8; border-radius: 12px; transition: all 0.3s; }
                .nav-tab:hover { background: rgba(168,85,247,0.1); color: #a855f7; }
                .nav-tab.active { background: rgba(168,85,247,0.2); color: #a855f7; }
                .approval-item { background: #0f172a; border-radius: 12px; padding: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
                .btn-approve { background: #10b981; border: none; padding: 4px 12px; border-radius: 20px; cursor: pointer; }
                .btn-reject { background: #ef4444; border: none; padding: 4px 12px; border-radius: 20px; cursor: pointer; }
                .print-btn { background: #3b82f6; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; margin-left: 10px; }
            </style>
        `;
    },
    
    afterRender(context) {
        const supabase = window._commandSupabase;
        if (!supabase) {
            console.error('Supabase not available');
            return;
        }

        async function fetchKPIs() {
            try {
                const { count: stokCount } = await supabase.from('stok').select('*', { count: 'exact', head: true });
                document.getElementById('kpi-stok').querySelector('div:nth-child(2)').innerText = stokCount || 0;
                const { count: requestCount } = await supabase.from('permintaan_barang').select('*', { count: 'exact', head: true }).eq('status', 'pending');
                document.getElementById('kpi-request').querySelector('div:nth-child(2)').innerText = requestCount || 0;
                const { count: janitorCount } = await supabase.from('janitor_logs').select('*', { count: 'exact', head: true }).eq('status', 'active');
                document.getElementById('kpi-janitor').querySelector('div:nth-child(2)').innerText = janitorCount || 0;
                const { count: maintCount } = await supabase.from('maintenance').select('*', { count: 'exact', head: true }).eq('status', 'in_progress');
                document.getElementById('kpi-maintenance').querySelector('div:nth-child(2)').innerText = maintCount || 0;
                const { count: approvalCount } = await supabase.from('approval_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending');
                document.getElementById('kpi-approval').querySelector('div:nth-child(2)').innerText = approvalCount || 0;
            } catch (err) {
                console.error('Error fetching KPIs:', err);
            }
        }

        async function loadApprovalList() {
            const { data, error } = await supabase.from('approval_requests').select('*').eq('status', 'pending').order('created_at', { ascending: false });
            if (error) return [];
            return data;
        }

        async function renderApprovalTab() {
            const approvals = await loadApprovalList();
            if (!approvals.length) {
                document.getElementById('command-content').innerHTML = '<div style="text-align:center;">✅ Tidak ada permintaan yang menunggu approval.</div>';
                return;
            }
            let html = '<h3>Pending Approvals</h3><div id="approval-list">';
            approvals.forEach(app => {
                html += `
                    <div class="approval-item" data-id="${app.id}">
                        <div>
                            <strong>${app.title || 'Permintaan'}</strong><br>
                            <small>${app.description || ''} | Diajukan: ${new Date(app.created_at).toLocaleString()}</small>
                        </div>
                        <div>
                            <button class="btn-approve" data-id="${app.id}">✓ Approve</button>
                            <button class="btn-reject" data-id="${app.id}">✗ Reject</button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            document.getElementById('command-content').innerHTML = html;

            document.querySelectorAll('.btn-approve').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const id = btn.dataset.id;
                    await supabase.from('approval_requests').update({ status: 'approved', approved_at: new Date() }).eq('id', id);
                    renderApprovalTab();
                    fetchKPIs();
                });
            });
            document.querySelectorAll('.btn-reject').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const id = btn.dataset.id;
                    await supabase.from('approval_requests').update({ status: 'rejected' }).eq('id', id);
                    renderApprovalTab();
                    fetchKPIs();
                });
            });
        }

        async function renderMonitoringTab() {
            const { data: stokData } = await supabase.from('stok').select('*').limit(5).order('created_at', { ascending: false });
            const { data: janitorData } = await supabase.from('janitor_logs').select('*').limit(5).order('created_at', { ascending: false });
            const { data: maintData } = await supabase.from('maintenance').select('*').limit(5).order('created_at', { ascending: false });

            let html = `
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                    <div style="background:#0f172a; border-radius:16px; padding:16px;">
                        <h3>📦 Recent Stock</h3>
                        <ul>${stokData?.map(s => `<li>${s.name} (${s.quantity} ${s.unit})</li>`).join('') || '<li>No data</li>'}</ul>
                    </div>
                    <div style="background:#0f172a; border-radius:16px; padding:16px;">
                        <h3>🧹 Janitor Activities</h3>
                        <ul>${janitorData?.map(j => `<li>${j.activity} - ${j.area} (${j.status})</li>`).join('') || '<li>No data</li>'}</ul>
                    </div>
                    <div style="background:#0f172a; border-radius:16px; padding:16px;">
                        <h3>🔧 Maintenance Tasks</h3>
                        <ul>${maintData?.map(m => `<li>${m.title} - Priority: ${m.priority}</li>`).join('') || '<li>No data</li>'}</ul>
                    </div>
                    <div style="background:#0f172a; border-radius:16px; padding:16px;">
                        <h3>📊 Quick Stats</h3>
                        <p>Stok Items: ${document.getElementById('kpi-stok')?.querySelector('div:nth-child(2)')?.innerText || '0'}</p>
                        <p>Pending Requests: ${document.getElementById('kpi-request')?.querySelector('div:nth-child(2)')?.innerText || '0'}</p>
                    </div>
                </div>
            `;
            document.getElementById('command-content').innerHTML = html;
        }

        async function renderAnalyticsTab() {
            document.getElementById('command-content').innerHTML = `
                <h3>Operational Trends</h3>
                <canvas id="analytics-chart" style="width:100%; height:300px;"></canvas>
                <div style="margin-top:20px;">
                    <p><strong>Insight:</strong> Permintaan barang meningkat 12% dalam 7 hari terakhir. Disarankan menambah stok alat tulis.</p>
                </div>
            `;
            const loadChart = () => {
                if (typeof Chart === 'undefined') {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
                    script.onload = () => {
                        new Chart(document.getElementById('analytics-chart'), {
                            type: 'line',
                            data: {
                                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                                datasets: [
                                    { label: 'Stock Requests', data: [12, 19, 15, 17, 22, 24], borderColor: '#a855f7' },
                                    { label: 'Maintenance Tasks', data: [5, 6, 4, 8, 7, 9], borderColor: '#f59e0b' }
                                ]
                            }
                        });
                    };
                    document.head.appendChild(script);
                } else {
                    new Chart(document.getElementById('analytics-chart'), {
                        type: 'line',
                        data: {
                            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                            datasets: [
                                { label: 'Stock Requests', data: [12, 19, 15, 17, 22, 24], borderColor: '#a855f7' },
                                { label: 'Maintenance Tasks', data: [5, 6, 4, 8, 7, 9], borderColor: '#f59e0b' }
                            ]
                        }
                    });
                }
            };
            loadChart();
        }

        // TAB REPORTS – menggunakan instruksi bash
        function renderReportsTab() {
            document.getElementById('command-content').innerHTML = `
                <div class="max-w-4xl mx-auto p-4">
                    <h1 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
                        📄 Ekspor Laporan
                    </h1>
                    <div class="glass-card p-6 rounded-3xl space-y-4">
                        <p class="text-slate-300 mb-4">
                            Gunakan script bash di Termux untuk menghasilkan laporan dalam format CSV atau PDF.
                        </p>
                        <div class="bg-slate-800 p-4 rounded-xl font-mono text-sm">
                            <pre class="text-emerald-400">report.sh</pre>
                        </div>
                        <div class="space-y-2">
                            <p><strong>📌 Cara Penggunaan:</strong></p>
                            <ol class="list-decimal list-inside text-slate-300 space-y-1">
                                <li>Jalankan <code class="bg-slate-900 px-2 py-0.5 rounded">report.sh</code> di Termux</li>
                                <li>Pilih jenis laporan (Booking / K3 / Dana)</li>
                                <li>Masukkan rentang tanggal (kosongkan untuk default)</li>
                                <li>Pilih format (CSV atau PDF)</li>
                                <li>File laporan akan tersimpan di direktori saat ini</li>
                            </ol>
                        </div>
                        <div class="mt-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
                            <p class="text-sm text-blue-300">
                                💡 <strong>Tips:</strong> Untuk laporan PDF, pastikan pandoc dan wkhtmltopdf sudah terpasang (<code>pkg install pandoc wkhtmltopdf</code>).
                            </p>
                        </div>
                    </div>
                    <div class="text-center mt-6">
                        <button onclick="window.closeModule()" class="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl">← Kembali</button>
                    </div>
                </div>
            `;
        }

        async function renderAIAssistantTab() {
            document.getElementById('command-content').innerHTML = `
                <div style="background:#0f172a; border-radius:16px; padding:20px;">
                    <h3>🤖 AI Operations Assistant</h3>
                    <div style="margin-bottom:16px;">
                        <input type="text" id="ai-question" placeholder="Tanyakan tentang stok, maintenance, atau rekomendasi..." style="width:70%; padding:12px; border-radius:24px; border:1px solid #334155; background:#1e293b; color:white;">
                        <button id="ask-command" style="background:#a855f7; border:none; padding:12px 24px; border-radius:24px;">Ask</button>
                    </div>
                    <div id="ai-answer" style="background:#0f172a; border-radius:12px; padding:16px; color:#94a3b8; min-height:100px;">
                        Klik Ask untuk mendapatkan analisis.
                    </div>
                </div>
            `;
            const askBtn = document.getElementById('ask-command');
            const input = document.getElementById('ai-question');
            const answerDiv = document.getElementById('ai-answer');
            if (askBtn) {
                askBtn.addEventListener('click', async () => {
                    const question = input.value.trim();
                    if (!question) return;
                    answerDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
                    try {
                        const url = 'https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/ai-chat';
                        const res = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ prompt: `Command Center: ${question}` })
                        });
                        const data = await res.json();
                        answerDiv.innerHTML = data.reply || 'Maaf, tidak ada respons.';
                    } catch (err) {
                        answerDiv.innerHTML = '⚠️ Error: ' + err.message;
                    }
                });
            }
        }

        async function refreshAIPredictions() {
            const forecastDiv = document.getElementById('forecast-stok');
            if (forecastDiv) forecastDiv.innerText = '...';
            try {
                const { count: stokCount } = await supabase.from('stok').select('*', { count: 'exact', head: true });
                const { count: reqCount } = await supabase.from('permintaan_barang').select('*', { count: 'exact', head: true }).eq('status', 'pending');
                const prompt = `Analisis data operasional: Stok barang ${stokCount} item, permintaan pending ${reqCount}. Berikan prediksi singkat untuk stok, permintaan, risiko maintenance, dan skor efisiensi dalam format: stok: X, permintaan: Y, risiko: Z, skor: W.`;
                const url = 'https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/ai-chat';
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })
                });
                const data = await res.json();
                const reply = data.reply || '';
                const stokMatch = reply.match(/stok:?\s*([+-]?\d+%?)/i);
                const reqMatch = reply.match(/permintaan:?\s*([+-]?\d+%?)/i);
                const riskMatch = reply.match(/risiko:?\s*([+-]?\d+%?)/i);
                const scoreMatch = reply.match(/skor:?\s*([+-]?\d+%?)/i);
                if (stokMatch) document.getElementById('forecast-stok').innerText = stokMatch[1];
                if (reqMatch) document.getElementById('forecast-request').innerText = reqMatch[1];
                if (riskMatch) document.getElementById('forecast-risk').innerText = riskMatch[1];
                if (scoreMatch) document.getElementById('forecast-score').innerText = scoreMatch[1];
                const recDiv = document.getElementById('ai-recommendation');
                recDiv.innerHTML = `<i class="fas fa-robot"></i> <strong>AI Recommendation:</strong> ${reply.substring(0, 200)}`;
            } catch (err) {
                console.error('AI prediction error:', err);
            }
        }

        const tabs = document.querySelectorAll('.nav-tab');
        const contentDiv = document.getElementById('command-content');

        const switchTab = (tabId) => {
            tabs.forEach(t => {
                if (t.dataset.tab === tabId) t.classList.add('active');
                else t.classList.remove('active');
            });
            if (tabId === 'monitor') renderMonitoringTab();
            else if (tabId === 'approval') renderApprovalTab();
            else if (tabId === 'analytics') renderAnalyticsTab();
            else if (tabId === 'reports') renderReportsTab();
            else if (tabId === 'ai-assistant') renderAIAssistantTab();
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });

        const refreshBtn = document.getElementById('refresh-all');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', async () => {
                await fetchKPIs();
                await refreshAIPredictions();
                const activeTab = document.querySelector('.nav-tab.active').dataset.tab;
                switchTab(activeTab);
            });
        }
        const aiRefreshBtn = document.getElementById('ai-predict-refresh');
        if (aiRefreshBtn) aiRefreshBtn.addEventListener('click', refreshAIPredictions);

        fetchKPIs();
        refreshAIPredictions();
        switchTab('monitor');
    }
};
