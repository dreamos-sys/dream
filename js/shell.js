/**
 * 🏛️ DREAM OS v2.1 - HARMONIZED KERNEL
 * Integrated: 7 Slides, ISO Standards, & Modular Navigation
 */

class DreamKernel {
    constructor() {
        this.state = {
            isAuth: sessionStorage.getItem('dream_auth_v2.1') === 'true',
            masterKey: '012443410', 
            idleSeconds: 0,
            maxIdle: 120 
        };
        this.slides = [
            { title: "🕌 Spiritual Core", content: "Bismillah bi idznillah.\nSistem beroperasi dengan keberkahan." },
            { title: "🛡️ Security Status", content: "ISO 27001 Active.\nNo threats detected." },
            { title: "📅 Today's Agenda", content: "Rapat Koordinasi: 13:00\nCek Lapangan: 15:00" },
            { title: "⚠️ K3 Alert", content: "Area Gudang B: Aman\nPerlu inspeksi rutin." },
            { title: "📦 Asset Health", content: "98% Aset Terawat.\nJadwal maintenance besok." },
            { title: "🌤️ Weather", content: "Depok: Cerah Berawan\nSuhu: 32°C" },
            { title: "💡 Quote of Day", content: "'Keamanan adalah pondasi,\nSpiritualitas adalah atap.'" }
        ];
        this.currentSlide = 0;
        this.init();
    }

    init() {
        if (document.readyState === 'complete') { this.renderUI(); }
        else { window.addEventListener('load', () => this.renderUI()); }
        this.startSlider(); 
    }

    startSlider() {
        setInterval(() => {
            const slideEl = document.getElementById('smart-slide-content');
            if (slideEl && this.state.isAuth) {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
                const s = this.slides[this.currentSlide];
                slideEl.style.opacity = 0;
                setTimeout(() => {
                    slideEl.innerHTML = `<h3 style="color:#10b981; margin:0 0 5px 0; font-size:14px;">${s.title}</h3><p style="color:#cbd5e1; font-size:11px; line-height:1.4; white-space:pre-line; margin:0;">${s.content}</p>`;
                    slideEl.style.opacity = 1;
                }, 300);
            }
        }, 7000);
    }

    renderUI() {
        const shell = document.getElementById('app-shell');
        if (!shell) return;

        shell.innerHTML = `
            <header style="text-align:center; padding: 15px; background: rgba(16,185,129,0.05);">
                <p style="font-family:serif; color:#10b981; font-size:18px; margin:0;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <p style="font-family:serif; color:#34d399; font-size:12px; margin:2px 0;">اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                <small style="color:#475569; font-size:8px; letter-spacing:2px;">ISO 27001 | 9001 | 55001 COMPLIANT</small>
            </header>

            <div style="margin: 10px 15px; background: rgba(30,41,59,0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 15px; min-height: 80px; display:flex; align-items:center; justify-content:center; text-align:center;" id="smart-slide-container">
                <div id="smart-slide-content" style="transition: opacity 0.3s;">
                    <h3 style="color:#10b981; margin:0;">Bismillah bi idznillah</h3>
                    <p style="color:#64748b; font-size:11px;">Initializing Smart Core...</p>
                </div>
            </div>

            <div id="main-content" style="padding-bottom: 100px;"></div>

            <nav style="position: fixed; bottom: 15px; left: 50%; transform: translateX(-50%); background: rgba(15,23,42,0.9); border: 1px solid rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 25px; display: flex; gap: 25px; backdrop-filter: blur(10px); z-index: 1000; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div onclick="window.DREAM.navigate('home')" style="cursor:pointer; display:flex; flex-direction:column; align-items:center; color:#10b981;">
                    <i class="fas fa-brain" style="font-size: 18px;"></i>
                    <span style="font-size:8px; font-weight:700; margin-top:3px;">HOME</span>
                </div>
                <div onclick="window.DREAM.navigate('profile')" style="cursor:pointer; display:flex; flex-direction:column; align-items:center; color:#64748b;">
                    <i class="fas fa-user" style="font-size: 18px;"></i>
                    <span style="font-size:8px; font-weight:700; margin-top:3px;">PROFILE</span>
                </div>
                <div onclick="window.DREAM.navigate('qr')" style="cursor:pointer; display:flex; flex-direction:column; align-items:center; color:#64748b;">
                    <i class="fas fa-qrcode" style="font-size: 18px;"></i>
                    <span style="font-size:8px; font-weight:700; margin-top:3px;">QR SCAN</span>
                </div>
            </nav>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        `;
        
        window.DREAM = { navigate: (id) => this.navigate(id) };
        this.navigate('home');
    }

    async navigate(id) {
        const content = document.getElementById('main-content');
        if (!content) return;
        try {
            // Memanggil modul sesuai struktur folder yang ada di screenshot Anda
            const mod = await import(`./modules/${id}/module.js?v=${Date.now()}`);
            content.innerHTML = await mod.default.render();
            if (mod.default.afterRender) mod.default.afterRender();
        } catch(e) { 
            console.error(e);
            content.innerHTML = `<div style="color:#ef4444; padding:40px; text-align:center;"><i class="fas fa-exclamation-triangle"></i><br>Module '${id}' failed to load.</div>`; 
        }
    }
}

new DreamKernel();
