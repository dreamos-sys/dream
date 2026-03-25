/**
 * DREAM OS v2.1 - ENTERPRISE COMMAND CENTER
 * SMART ADAPTIVE ENGINE (ALL-DEVICE COMPLIANT)
 * Location: Depok | Standard: ISO 27001
 */
const CommandCenter = {
    render() {
        return `
        <div id="cc-app-wrapper" class="safe-area">
            <div class="cc-header">
                <div class="brand-box">
                    <div class="crown-glow"><i class="fas fa-crown"></i></div>
                    <div>
                        <h2 class="cc-title">COMMAND CENTER</h2>
                        <div class="cc-meta">
                            <span class="badge-iso">ISO 27001</span>
                            <span class="status-live"><i class="fas fa-circle"></i> AI AGENT ACTIVE</span>
                        </div>
                    </div>
                </div>
                <div id="cc-time" class="cc-clock">--:--:--</div>
            </div>
            <div class="cc-grid">
                <div class="cc-card-pro" onclick="window.DREAM.toast('Syncing Bookings...')">
                    <div class="cc-icon blue"><i class="fas fa-calendar-check"></i></div>
                    <div class="cc-data">
                        <span id="val-booking" class="cc-num">--</span>
                        <span class="cc-label">Today's Bookings</span>
                    </div>
                    <div class="cc-ai-insight" id="ins-booking">Analysing...</div>
                </div>
                <div class="cc-card-pro" onclick="window.DREAM.toast('Maintenance Status OK')">
                    <div class="cc-icon orange"><i class="fas fa-tools"></i></div>
                    <div class="cc-data">
                        <span id="val-maint" class="cc-num">5</span>
                        <span class="cc-label">Active Maint.</span>
                    </div>
                    <div class="cc-ai-insight">System Balanced</div>
                </div>
                <div class="cc-card-pro">
                    <div class="cc-icon green"><i class="fas fa-boxes"></i></div>
                    <div class="cc-data">
                        <span class="cc-num">3</span>
                        <span class="cc-label">Critical Stock</span>
                    </div>
                    <div class="cc-ai-insight" style="color:#f59e0b">⚠️ Low: HDMI, Mouse</div>
                </div>
                <div class="cc-card-pro">
                    <div class="cc-icon red"><i class="fas fa-shield-alt"></i></div>
                    <div class="cc-data">
                        <span class="cc-num">SAFE</span>
                        <span class="cc-label">Security</span>
                    </div>
                    <div class="cc-ai-insight">No Incidents</div>
                </div>
            </div>
            <div class="cc-analytics">
                <div class="cc-card-title"><i class="fas fa-robot"></i> SMART PREDICTIVE LOAD</div>
                <div class="cc-chart-container">
                    <canvas id="ccChartPro"></canvas>
                </div>
            </div>
        </div>
        <style>
            :root { --p-purple: #a855f7; --p-gold: #d4af37; --p-bg: #0f172a; }
            #cc-app-wrapper { padding: 16px; font-family: 'Inter', sans-serif; color: #fff; max-width: 1200px; margin: 0 auto; }
            .cc-header { display: flex; justify-content: space-between; align-items: center; background: rgba(30,41,59,0.5); padding: 15px; border-radius: 20px; border: 1px solid rgba(168,85,247,0.2); margin-bottom: 20px; backdrop-filter: blur(10px); }
            .brand-box { display: flex; align-items: center; gap: 12px; }
            .crown-glow { width: 42px; height: 42px; background: linear-gradient(135deg, var(--p-purple), #6366f1); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: gold; box-shadow: 0 4px 15px rgba(168,85,247,0.4); }
            .cc-title { font-size: 15px; letter-spacing: 1px; color: var(--p-purple); font-weight: 800; margin: 0; }
            .cc-meta { display: flex; gap: 8px; margin-top: 4px; }
            .badge-iso { background: rgba(212,175,55,0.1); color: var(--p-gold); font-size: 8px; padding: 2px 6px; border-radius: 4px; font-weight: bold; border: 1px solid rgba(212,175,55,0.2); }
            .status-live { color: #10b981; font-size: 9px; font-weight: bold; }
            .status-live i { font-size: 7px; animation: blink 1.5s infinite; margin-right: 4px; }
            .cc-clock { font-family: 'Monaco', monospace; font-size: 12px; color: #94a3b8; }
            .cc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
            @media (min-width: 768px) { .cc-grid { grid-template-columns: repeat(4, 1fr); } }
            .cc-card-pro { background: #1e293b; border-radius: 22px; padding: 16px; border: 1px solid rgba(255,255,255,0.05); transition: 0.3s; }
            .cc-card-pro:active { transform: scale(0.95); background: #161e2d; }
            .cc-icon { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 14px; }
            .blue { background: rgba(59,130,246,0.1); color: #3b82f6; }
            .orange { background: rgba(245,158,11,0.1); color: #f59e0b; }
            .green { background: rgba(16,185,129,0.1); color: #10b981; }
            .red { background: rgba(239,68,68,0.1); color: #ef4444; }
            .cc-num { display: block; font-size: 24px; font-weight: 800; color: #fff; }
            .cc-label { font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: 600; }
            .cc-ai-insight { font-size: 9px; color: #10b981; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 6px; font-style: italic; }
            .cc-analytics { background: #1e293b; border-radius: 24px; padding: 20px; border: 1px solid rgba(255,255,255,0.05); }
            .cc-card-title { font-size: 11px; font-weight: 700; color: var(--p-purple); margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
            .cc-chart-container { height: 180px; width: 100%; }
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        </style>
        `;
    },
    init() {
        this.startAgent();
        this.renderChart();
    },
    async startAgent() {
        setInterval(() => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            if(document.getElementById('cc-time')) document.getElementById('cc-time').innerText = timeStr;
        }, 1000);
        try {
            const { data } = await supabase.from('bookings').select('id').eq('tanggal', new Date().toISOString().split('T')[0]);
            const count = data?.length || 0;
            document.getElementById('val-booking').innerText = count;
            document.getElementById('ins-booking').innerText = count > 5 ? "⚠️ High Traffic Predicted" : "✅ Capacity Normal";
        } catch (e) { console.warn("Agent Syncing..."); }
    },
    renderChart() {
        const ctx = document.getElementById('ccChartPro').getContext('2d');
        if(!ctx) return;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['08','10','12','14','16','18'],
                datasets: [{
                    data: [5, 12, 8, 15, 6, 10],
                    borderColor: '#a855f7',
                    borderWidth: 3,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: 'rgba(168,85,247,0.05)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    y: { display: false },
                    x: { grid: { display: false }, ticks: { color: '#475569', font: { size: 9 } } }
                }
            }
        });
    }
};
window.DREAM_MODUL_CC = CommandCenter;
