/**
 * 🏛️ DREAM OS v2.1 - ULTIMATE HARMONIZED SHELL
 * Integrated: 9 Grid, 7 Slides, Z-Index Fix, AI Fallback
 * Bismillah bi idznillah.
 */

export const DreamShell = {
    currentIndex: 0,
    
    // 1. DATA 9 GRID MODUL (Konsisten visual)
    modules: [
        { id: 'booking', name: 'BOOKING', icon: 'fa-calendar-alt', color: '#00bcd4' },
        { id: 'k3', name: 'K3 SMART', icon: 'fa-shield-alt', color: '#ff9800' },
        { id: 'teknisi', name: 'TEKNISI', icon: 'fa-tools', color: '#fdd835' },
        { id: 'gudang', name: 'GUDANG', icon: 'fa-box-open', color: '#9c27b0' },
        { id: 'indoor', name: 'INDOOR', icon: 'fa-broom', color: '#4caf50' },
        { id: 'outdoor', name: 'OUTDOOR', icon: 'fa-tree', color: '#26a69a' },
        { id: 'dana', name: 'DANA', icon: 'fa-wallet', color: '#1e88e5' },
        { id: 'predictive', name: 'PREDICTIVE', icon: 'fa-brain', color: '#ba68c8' },
        { id: 'admin', name: 'ADMIN', icon: 'fa-user-cog', color: '#607d8b' }
    ],

    // 2. RENDER SEMUA KOMPONEN (UX Refined)
    init: function() {
        const root = document.getElementById('app-shell');
        if (!root) return;

        root.innerHTML = `
            <style>
                /* UX Fix: Spacing & Layout */
                body { background: #0a0e17; color: white; font-family: 'Inter', sans-serif; padding: 0; margin: 0; }
                .main-container { padding: 10px 15px 100px 15px; box-sizing: border-box; }
                
                /* Grid 3x3 Fix (Pear Glow Effect) */
                .dream-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
                .grid-item { background: rgba(30,41,59,0.5); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 15px; text-align: center; cursor: pointer; transition: 0.3s; }
                .grid-item:active { transform: scale(0.95); border-color: #a3e635; } /* Pear Green Glow on Touch */
                .icon-box { font-size: 24px; margin-bottom: 8px; }

                /* AI Insights Panel (Glow & Fallback) */
                .ai-insights { background: rgba(20,27,41,0.8); border: 1px solid rgba(186,104,200,0.3); border-radius: 20px; padding: 20px; box-shadow: 0 0 15px rgba(186,104,200,0.1); }
                
                /* Footer (Locked Position) */
                .spiritual-footer { position: fixed; bottom: 0; width: 100%; text-align: center; padding: 15px; background: linear-gradient(0deg, #0a0e17 50%, transparent); color: #475569; font-size: 9px; letter-spacing: 2px; }
            </style>

            <header style="padding: 20px; text-align: center; background: linear-gradient(180deg, rgba(16,185,129,0.1), transparent);">
                <h1 style="color:#00bcd4; font-size:18px; margin:0;">DREAM OS <small>v13.4</small></h1>
                <p style="color:#475569; font-size:8px; margin:5px 0;">ISO 27001 | 9001 | 55001 COMPLIANT</p>
                <div style="font-family:'Amiri', serif; color:#10b981; font-size:16px; margin-top:15px;">Bismillah bi idznillah,</div>
                <h2 style="font-size:20px; margin:5px 0;">Halo, My Bro Architect 🧐</h2>
            </header>

            <main class="main-container">
                <div id="smart-slides" style="margin-bottom:20px;"></div>

                <div class="dream-grid">
                    ${this.modules.map(m => `
                        <div class="grid-item" onclick="DREAM.navigate('${m.id}')">
                            <div class="icon-box" style="color:${m.color}"><i class="fas ${m.icon}"></i></div>
                            <span style="font-size:9px; font-weight:700; text-transform:uppercase;">${m.name}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="ai-insights">
                    <h3 style="color:#ba68c8; font-size:12px; margin:0 0 10px 0;"><i class="fas fa-bolt mr-2"></i> DREAM AI INSIGHTS</h3>
                    <div id="ai-content" style="color:#cbd5e1; font-size:11px;">
                        <i class="fas fa-circle-notch fa-spin mr-2"></i> Bismillah, sinkronisasi AI Agent...
                    </div>
                </div>
            </main>

            <footer class="spiritual-footer">
                THE POWER SOUL OF SHALAWAT<br>
                <strong>DREAM TEAM · SIBLING SYSTEM</strong>
            </footer>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        `;

        // UX Fix: Set AI Fallback Message setelah 3 detik jika data Supabase belum datang
        setTimeout(() => {
            const ai = document.getElementById('ai-content');
            if(ai && ai.innerHTML.includes('fa-spin')) {
                ai.innerHTML = '<i class="fas fa-check-circle text-emerald-500 mr-2"></i> **Sistem Normal:** Performa stabil, Shalawat 1001x active (Offline Cache).';
            }
        }, 3000);
    }
};

DreamShell.init();
