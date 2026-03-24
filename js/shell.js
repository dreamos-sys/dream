/**
 * 🏛️ DREAM OS v2.1 - ULTIMATE ENTERPRISE EDITION
 * The Power Soul of Shalawat - FULL INTEGRATED
 * Ghost Mode: 5x Tap Header | Smart Slides: 7 Pages | 9 Grid | 5 Nav
 */

export const DreamShell = {
    currentIndex: 0,
    tapCount: 0,
    
    // 1. DATA 9 GRID MODUL
    gridModules: [
        { id: 'command', name: 'COMMAND', icon: 'fa-desktop', color: '#8b5cf6' },
        { id: 'booking', name: 'BOOKING', icon: 'fa-calendar-check', color: '#3b82f6' },
        { id: 'k3', name: 'K3 SAFETY', icon: 'fa-triangle-exclamation', color: '#f59e0b' },
        { id: 'sekuriti', name: 'SEKURITI', icon: 'fa-shield-halved', color: '#ef4444' },
        { id: 'janitor-in', name: 'JANITOR IN', icon: 'fa-broom', color: '#ec4899' },
        { id: 'janitor-out', name: 'JANITOR OUT', icon: 'fa-leaf', color: '#10b981' },
        { id: 'stok', name: 'STOK', icon: 'fa-boxes-stacked', color: '#f97316' },
        { id: 'maintenance', name: 'TEKNISI', icon: 'fa-screwdriver-wrench', color: '#06b6d4' },
        { id: 'asset', name: 'ASSET', icon: 'fa-warehouse', color: '#6366f1' }
    ],

    // 2. DATA 5 NAV BOTTOM
    navModules: [
        { id: 'home', name: 'Home', icon: 'fa-home' },
        { id: 'qr', name: 'QR Scan', icon: 'fa-qrcode' },
        { id: 'profile', name: 'Profile', icon: 'fa-user' },
        { id: 'about', name: 'About', icon: 'fa-info-circle' },
        { id: 'settings', name: 'Settings', icon: 'fa-cog' }
    ],

    // 3. RENDER ALL COMPONENTS
    init: function() {
        const root = document.getElementById('app-shell');
        if (!root) return;

        root.innerHTML = `
            <header id="islamic-header" class="dream-header" style="cursor:pointer; text-align:center; padding:20px; background:linear-gradient(135deg, rgba(16,185,129,0.1), rgba(2,6,23,0.95));">
                <p style="font-size:24px; color:#10b981; margin:0;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <p style="font-size:16px; color:#34d399; margin:5px 0;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                <small style="color:#64748b; letter-spacing:2px;">THE POWER SOUL OF SHALAWAT</small>
            </header>

            <div class="slider-container" style="overflow:hidden; margin:15px; border-radius:15px; background:rgba(15,23,42,0.6); height:150px;">
                <div id="sliderWrapper" style="display:flex; transition:0.5s ease;">
                    <div class="slide" style="min-width:100%; padding:20px; text-align:center;">🕌 Assalamualaikum, Master M</div>
                    <div class="slide" style="min-width:100%; padding:20px; text-align:center;">📅 Booking: 5 Aktif</div>
                    <div class="slide" style="min-width:100%; padding:20px; text-align:center;">🛡️ K3: Aman (SIF Al-Fikri)</div>
                    <div class="slide" style="min-width:100%; padding:20px; text-align:center;">🌤️ Depok: Cerah Berawan</div>
                    <div class="slide" style="min-width:100%; padding:20px; text-align:center;">📢 Info: Rapat Maintenance</div>
                    <div class="slide" style="min-width:100%; padding:20px; text-align:center;">👤 Admin: Pak Hanung Approved</div>
                    <div class="slide" style="min-width:100%; padding:20px; text-align:center;">✨ Quote: Ibadah Lewat Kerja</div>
                </div>
            </div>

            <div class="module-grid" style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; padding:15px;">
                ${this.gridModules.map(m => `
                    <div onclick="window.DREAM.navigate('${m.id}')" style="background:#1e1e2e; padding:15px; border-radius:12px; text-align:center; border-top:2px solid ${m.color}">
                        <i class="fas ${m.icon}" style="color:${m.color}; font-size:20px;"></i>
                        <p style="font-size:10px; color:#eee; margin-top:5px;">${m.name}</p>
                    </div>
                `).join('')}
            </div>

            <nav class="bottom-nav" style="position:fixed; bottom:0; width:100%; display:flex; justify-content:space-around; background:#020617; padding:10px; border-top:1px solid #10b981;">
                ${this.navModules.map(n => `
                    <div onclick="window.DREAM.navigate('${n.id}')" style="text-align:center; color:#64748b;">
                        <i class="fas ${n.icon}"></i><br><span style="font-size:9px;">${n.name}</span>
                    </div>
                `).join('')}
            </nav>
        `;

        this.setupGhost();
        this.setupSlider();
    },

    setupGhost: function() {
        const h = document.getElementById('islamic-header');
        h.onclick = () => {
            this.tapCount++;
            if(this.tapCount === 5) {
                const p = prompt('🔑 GHOST CODE:');
                if(p === 'dreamos2026') window.DREAM.navigate('ghost');
                this.tapCount = 0;
            }
            setTimeout(() => { this.tapCount = 0; }, 2000);
        };
    },

    setupSlider: function() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % 7;
            const w = document.getElementById('sliderWrapper');
            if(w) w.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }, 7000);
    }
};

DreamShell.init();
