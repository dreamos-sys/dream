/**
 * ════════════════════════════════════════════
 * SHELL UI ENGINE - DREAM OS v2.1
 * Integrated with Theme Manager & Ghost Mode
 * ════════════════════════════════════════════ */

'use strict';

// Module Registry
const MODULES = {
    'ai-panel': { path: './modules/ai-panel/module.js', icon: 'fa-brain', label: 'AI Panel', category: 'ai' },
    'ai-speak': { path: './modules/ai-speak/module.js', icon: 'fa-microchip', label: 'AI Speak', category: 'ai' },
    'prediction': { path: './modules/prediction/module.js', icon: 'fa-chart-line', label: 'Prediction', category: 'ai' },
    'booking': { path: './modules/booking/module.js', icon: 'fa-calendar-check', label: 'Booking', category: 'ops' },
    'asset': { path: './modules/asset/module.js', icon: 'fa-cubes', label: 'Asset', category: 'ops' },
    'stok': { path: './modules/stok/module.js', icon: 'fa-boxes', label: 'Stok', category: 'ops' },
    'maintenance': { path: './modules/maintenance/module.js', icon: 'fa-gears', label: 'Maintenance', category: 'ops' },
    'sekuriti': { path: './modules/sekuriti/module.js', icon: 'fa-shield-halved', label: 'Sekuriti', category: 'security' },
    'k3': { path: './modules/k3/module.js', icon: 'fa-helmet-safety', label: 'K3', category: 'security' },
    'settings': { path: './modules/settings/module.js', icon: 'fa-sliders', label: 'Settings', category: 'system' },
    'profile': { path: './modules/profile/module.js', icon: 'fa-user', label: 'Profile', category: 'system' },
    'qr': { path: './modules/qr/module.js', icon: 'fa-qrcode', label: 'QR', category: 'system' },
    'ghost': { path: './modules/ghost/brain-hub.js', icon: 'fa-ghost', label: 'Ghost Core', category: 'special', hidden: true }
};

// Register modules
Object.entries(MODULES).forEach(([key, mod]) => {
    if (mod.path) window.DREAM.modules.set(key, mod);
});

// Render Home Shell
function renderHome() {
    const app = document.getElementById('app-shell');
    if (!app) return;

    const categories = {
        'ai': { label: '🧠 Neural Intelligence', modules: [] },
        'ops': { label: '⚙️ Operations', modules: [] },
        'security': { label: '🛡️ Security & Safety', modules: [] },
        'system': { label: '🔧 System', modules: [] }
    };

    Object.entries(MODULES).forEach(([key, mod]) => {
        if (!mod.hidden && categories[mod.category]) {
            categories[mod.category].modules.push({ key, ...mod });
        }
    });

    app.innerHTML = `
        <!-- Header -->        <header class="glass-header" id="ghost-trigger-zone" style="cursor:default;">
            <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;color:var(--color-primary);opacity:0.7;margin-bottom:6px;">
                <span>📍 DEPOK CORE | <span id="clock">--:--</span></span>
                <span>ISO 27001-55001 ✅</span>
            </div>
            <div style="text-align:center;padding:8px 0;">
                <h1 style="font-family:'Amiri',serif;font-size:1.6rem;color:var(--color-primary);text-shadow:0 0 20px var(--color-primary-glow);margin-bottom:4px;">
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </h1>
                <p style="font-family:'Amiri',serif;font-size:0.95rem;color:var(--text-muted);letter-spacing:1px;">
                    اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
                </p>
            </div>
            <div style="font-size:9px;text-align:center;color:var(--text-subtle);margin-top:6px;">
                ${navigator.platform} | ${navigator.onLine ? 'Online' : 'Offline'}
            </div>
        </header>

        <!-- Main Content -->
        <main style="padding:16px;padding-bottom:140px;animation:fadeInUp 0.5s ease;">
            <!-- Neural Status -->
            <div class="glass-card" style="margin-bottom:16px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <h3 style="color:var(--color-primary);font-size:0.9rem;font-weight:600;">
                        <i class="fas fa-network-wired" style="margin-right:6px;"></i> NEURAL CORE ACTIVE
                    </h3>
                    <span style="color:var(--color-primary);font-size:10px;font-family:var(--font-mono);">SECURE</span>
                </div>
                <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:10px;">
                    <span>🧠 AI: <span style="color:var(--color-primary);">ONLINE</span></span>
                    <span>🔮 PREDICTION: <span style="color:var(--color-primary);">ACTIVE</span></span>
                    <span>👻 GHOST: <span style="color:var(--text-subtle);">STANDBY</span></span>
                </div>
            </div>

            <!-- Stats -->
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;">
                <div class="glass-card" style="padding:16px;text-align:center;">
                    <div style="color:var(--text-muted);font-size:10px;">Total Modules</div>
                    <div style="color:var(--color-primary);font-size:1.5rem;font-weight:700;">19</div>
                </div>
                <div class="glass-card" style="padding:16px;text-align:center;">
                    <div style="color:var(--text-muted);font-size:10px;">Active Users</div>
                    <div style="color:var(--color-secondary);font-size:1.5rem;font-weight:700;">24</div>
                </div>
                <div class="glass-card" style="padding:16px;text-align:center;">
                    <div style="color:var(--text-muted);font-size:10px;">Pending</div>
                    <div style="color:#f59e0b;font-size:1.5rem;font-weight:700;">3</div>
                </div>
            </div>
            <!-- Module Categories -->
            ${Object.entries(categories).map(([cat, data]) => `
                <div style="margin-bottom:24px;">
                    <h4 style="color:var(--text-muted);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">
                        ${data.label}
                    </h4>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;">
                        ${data.modules.map(mod => `
                            <div class="glass-card" data-module="${mod.key}" 
                                 onclick="window.DREAM.load('${mod.key}')"
                                 style="cursor:pointer;transition:all 0.3s;display:flex;flex-direction:column;align-items:center;text-align:center;padding:16px 12px;">
                                <div style="width:56px;height:56px;background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;box-shadow:0 8px 20px var(--color-primary-glow);">
                                    <i class="fas ${mod.icon}" style="color:white;font-size:1.5rem;"></i>
                                </div>
                                <span style="font-size:12px;font-weight:600;color:var(--text-primary);">${mod.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </main>

        <!-- Bottom Navigation -->
        <nav class="glass-footer" style="position:fixed;bottom:0;left:0;right:0;background:var(--glass-bg-heavy);backdrop-filter:var(--glass-blur);border-top:var(--glass-border);padding:8px 12px;z-index:100;">
            <div style="display:flex;justify-content:space-around;align-items:center;max-width:500px;margin:0 auto;">
                <button class="nav-item active" data-nav="home" onclick="window.DREAM.load('home')"
                    style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:var(--color-primary);cursor:pointer;padding:8px 12px;border-radius:8px;">
                    <i class="fas fa-grid-2" style="font-size:1.2rem;"></i>
                    <span style="font-size:9px;font-weight:600;">Home</span>
                </button>
                <button class="nav-item" data-nav="booking" onclick="window.DREAM.load('booking')"
                    style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:var(--text-muted);cursor:pointer;padding:8px 12px;border-radius:8px;">
                    <i class="fas fa-calendar-check" style="font-size:1.2rem;"></i>
                    <span style="font-size:9px;font-weight:600;">Booking</span>
                </button>
                <button class="nav-item" data-nav="sekuriti" onclick="window.DREAM.load('sekuriti')"
                    style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:var(--text-muted);cursor:pointer;padding:8px 12px;border-radius:8px;">
                    <i class="fas fa-shield-halved" style="font-size:1.2rem;"></i>
                    <span style="font-size:9px;font-weight:600;">Security</span>
                </button>
                <button class="nav-item" data-nav="settings" onclick="window.DREAM.load('settings')"
                    style="display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:var(--text-muted);cursor:pointer;padding:8px 12px;border-radius:8px;">
                    <i class="fas fa-sliders" style="font-size:1.2rem;"></i>
                    <span style="font-size:9px;font-weight:600;">Settings</span>
                </button>
            </div>
        </nav>
    `;
    // Setup Ghost Trigger
    setupGhostTrigger();
    updateClock();
    
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-bar').style.width = '100%';
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
            document.getElementById('app-shell').style.display = 'block';
        }, 500);
    }, 1000);
}

// Ghost Mode Trigger (5-TAP)
function setupGhostTrigger() {
    let taps = 0;
    let timeout;
    const zone = document.getElementById('ghost-trigger-zone');
    if (!zone) return;

    zone.addEventListener('click', () => {
        taps++;
        window.DREAM_SYS.haptic(30);
        if (timeout) clearTimeout(timeout);
        
        if (taps === 5) {
            taps = 0;
            const code = prompt('🔑 GHOST ACCESS CODE:');
            if (code === 'dreamos2026') {
                window.DREAM_SYS.haptic([100, 50, 100]);
                window.DREAM_SYS.toast('👻 Ghost Mode Activated!', 'success');
                window.DREAM.load('ghost');
            } else {
                window.DREAM_SYS.toast('❌ Access Denied', 'error');
            }
            return;
        }
        timeout = setTimeout(() => taps = 0, 2000);
    });
}

// Clock
function updateClock() {
    const update = () => {
        const now = new Date();
        const clock = document.getElementById('clock');
        if (clock) clock.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    };
    update();    setInterval(update, 1000);
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 [SHELL] Dream OS v2.1 Ready');
    renderHome();
});
