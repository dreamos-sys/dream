/**
 * SHELL UI ENGINE - Enterprise Bento Edition
 */
const renderShell = () => {
    const app = document.getElementById('app-shell');
    app.innerHTML = `
        <header class="glass-header">
            <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 10px; color: var(--color-primary); opacity: 0.6; margin-bottom: 4px;">
                <span>DEPOK | ${new Date().toLocaleTimeString()}</span>
                <span>ISO 27001 COMPLIANT</span>
            </div>
            <div class="text-center">
                <h1 style="font-family: var(--font-arabic); font-size: 1.6rem; color: var(--color-primary); filter: drop-shadow(0 0 10px var(--color-primary-alpha-50));">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </h1>
                <p style="font-family: var(--font-arabic); font-size: 0.9rem; color: var(--color-text-muted); letter-spacing: 1px;">
                    اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
                </p>
            </div>
        </header>

        <main class="animate-fade-in" style="padding: 16px; padding-bottom: 120px;">
            <div class="bento-grid">
                <div class="bento-card bento-large" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <h3 class="text-emerald-400">Immunity Status</h3>
                        <i class="fas fa-microchip text-emerald-400"></i>
                    </div>
                    <p style="font-size: 12px; color: var(--color-text-muted); margin-top: 8px;">
                        Antibody Engine is running. Shadow Banding idle.
                    </p>
                    <div style="margin-top: auto; font-family: var(--font-mono); font-size: 10px; color: var(--color-success);">
                        KERNEL: SECURE | ISO 55001 READY
                    </div>
                </div>

                <div class="bento-card bento-small" onclick="DREAM.load('security')">
                    <i class="fas fa-shield-check text-emerald-400 text-xl"></i>
                    <span style="font-size: 11px; font-weight: 600;">Sekuriti</span>
                </div>

                <div class="bento-card bento-small" onclick="DREAM.load('inventory')">
                    <i class="fas fa-boxes-alt text-emerald-400 text-xl"></i>
                    <span style="font-size: 11px; font-weight: 600;">Inventaris</span>
                </div>

                <div class="bento-card bento-medium">
                    <h4 style="font-size: 10px; color: var(--color-text-dim); text-transform: uppercase;">Maintenance Info</h4>
                    <p style="font-size: 12px; margin-top: 4px;">SIF Al-Fikri: Semua sistem General Affairs terpantau hijau.</p>
                </div>
            </div>
        </main>

        <nav class="glass-footer">
            <div style="display: flex; justify-content: space-around; align-items: center; max-width: 500px; margin: 0 auto;">
                <button class="nav-item active" onclick="DREAM.load('home')">
                    <i class="fas fa-grid-2"></i>
                    <span style="font-size: 9px;">Dashboard</span>
                </button>
                <button class="nav-item" onclick="DREAM.load('k3')">
                    <i class="fas fa-broom"></i>
                    <span style="font-size: 9px;">K3 Report</span>
                </button>

                <div style="margin-top: -50px; cursor: pointer;" onclick="DREAM_SYS.haptic(100)">
                    <div style="width: 65px; height: 65px; background: var(--gradient-primary); border-radius: 20px; transform: rotate(45deg); display: flex; align-items: center; justify-content: center; border: 2px solid var(--color-border-primary); box-shadow: var(--shadow-glow-primary);">
                        <div style="transform: rotate(-45deg); font-family: var(--font-arabic); color: white; font-size: 11px; text-align: center;">
                            صلوات
                        </div>
                    </div>
                </div>

                <button class="nav-item" onclick="DREAM.load('asset')">
                    <i class="fas fa-tools"></i>
                    <span style="font-size: 9px;">Aset</span>
                </button>
                <button class="nav-item" onclick="DREAM.load('admin')">
                    <i class="fas fa-user-shield"></i>
                    <span style="font-size: 9px;">My Bro</span>
                </button>
            </div>
        </nav>
    `;
};

document.addEventListener('DOMContentLoaded', renderShell);
