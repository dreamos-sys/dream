export default {
    name: 'Super Command Center',
    icon: 'fa-building',
    color: '#a855f7',
    version: '5.1.0',
    
    render(context) {
        return `
            <div style="background:linear-gradient(135deg, #0f0f1f, #1a1a2e); border-radius:28px; padding:24px; margin-bottom:24px; border:1px solid rgba(168,85,247,0.3);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:20px;">
                        <div style="width:70px; height:70px; background:linear-gradient(135deg, #a855f7, #8b5cf6); border-radius:20px; display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-crown" style="font-size:36px; color:gold;"></i>
                        </div>
                        <div>
                            <h1 style="color:#a855f7; margin:0;">SUPER COMMAND CENTER</h1>
                            <p style="color:#94a3b8;">Head of General Affairs • Enterprise Management</p>
                        </div>
                    </div>
                    <div><span class="badge" style="background:#10b981; padding:6px 14px; border-radius:20px;">LIVE</span></div>
                </div>
            </div>
            <div class="kpi-grid" style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px;">
                <div class="kpi-card" style="background:rgba(168,85,247,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-chart-line" style="font-size:24px; color:#a855f7;"></i>
                    <div style="font-size:28px; font-weight:700;">92%</div>
                    <div>Operational Health</div>
                </div>
                <div class="kpi-card" style="background:rgba(59,130,246,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-calendar" style="font-size:24px; color:#3b82f6;"></i>
                    <div style="font-size:28px; font-weight:700;">8</div>
                    <div>Booking Today</div>
                </div>
                <div class="kpi-card" style="background:rgba(245,158,11,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-tools" style="font-size:24px; color:#f59e0b;"></i>
                    <div style="font-size:28px; font-weight:700;">5</div>
                    <div>Maintenance Active</div>
                </div>
                <div class="kpi-card" style="background:rgba(16,185,129,0.1); border-radius:20px; padding:16px; text-align:center;">
                    <i class="fas fa-shield-alt" style="font-size:24px; color:#10b981;"></i>
                    <div style="font-size:28px; font-weight:700;">Aman</div>
                    <div>Security Status</div>
                </div>
            </div>
            <div style="background:linear-gradient(135deg, #1e1b4b, #0c0a2a); border-radius:24px; padding:20px; margin-bottom:24px;">
                <h3 style="color:#a855f7;"><i class="fas fa-brain"></i> AI Predictive Analytics</h3>
                <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px;">
                    <div><strong>Booking Forecast</strong><div style="font-size:24px;">+15%</div></div>
                    <div><strong>Stok Kritis</strong><div style="font-size:24px;">3</div></div>
                    <div><strong>Maintenance Trend</strong><div style="font-size:24px;">+20%</div></div>
                    <div><strong>Division Score</strong><div style="font-size:24px;">94%</div></div>
                </div>
            </div>
            <div class="nav-tabs" style="display:flex; gap:8px; border-bottom:2px solid rgba(168,85,247,0.3); margin-bottom:24px;">
                <button class="nav-tab active" data-tab="dashboard">📊 Dashboard</button>
                <button class="nav-tab" data-tab="divisions">👥 Divisions</button>
                <button class="nav-tab" data-tab="monitoring">📡 Monitoring</button>
                <button class="nav-tab" data-tab="finance">💰 Finance</button>
                <button class="nav-tab" data-tab="reports">📁 Reports</button>
                <button class="nav-tab" data-tab="approval">✅ Approval</button>
            </div>
            <div id="command-content" style="min-height:400px;">
                <p style="text-align:center;">Pilih tab di atas</p>
            </div>
            <style>
                .kpi-card, .nav-tab { transition: all 0.3s; }
                .kpi-card:hover { transform: translateY(-5px); background: rgba(168,85,247,0.2); }
                .nav-tab { background: none; border: none; padding: 10px 18px; cursor: pointer; color: #94a3b8; border-radius: 12px; }
                .nav-tab:hover { background: rgba(168,85,247,0.1); color: #a855f7; }
                .nav-tab.active { background: rgba(168,85,247,0.2); color: #a855f7; }
            </style>
        `;
    },
    
    afterRender(context) {
        const tabs = document.querySelectorAll('.nav-tab');
        const contentDiv = document.getElementById('command-content');
        
        const contents = {
            dashboard: `<div>📊 Executive Dashboard - Menampilkan KPI utama, jadwal, dan notifikasi.</div>`,
            divisions: `<div>👥 Division Performance: Janitor In 88%, Janitor Out 85%, Maintenance 92%, Security 96%</div>`,
            monitoring: `<div>📡 Live Monitoring: CCTV 8/8 online, Cleanliness 95%, System load normal.</div>`,
            finance: `<div>💰 Budget: Annual Rp245M, Realized Rp187M, Remaining Rp58M</div>`,
            reports: `<div>📁 Reports: Operational Report Mar 2026, Division Performance Q1, AI Predictive Analysis</div>`,
            approval: `<div>✅ Approval Workflow: Pengajuan Dana Rp2.5M, Booking Ruang Rapat, SPJ Halal Bihalal</div>`
        };
        
        const switchTab = (tabId) => {
            tabs.forEach(t => {
                if (t.dataset.tab === tabId) t.classList.add('active');
                else t.classList.remove('active');
            });
            contentDiv.innerHTML = contents[tabId] || '<p>Konten sedang disiapkan.</p>';
        };
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });
        switchTab('dashboard');
    }
};
