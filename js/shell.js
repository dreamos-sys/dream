/**
 * 🏛️ DREAM OS v2.1 - PEAR GREEN DYNAMIC SHELL
 * Master M Architect Revision - Anti Bash Error
 */

class DreamKernel {
    constructor() {
        this.state = {
            isAuth: sessionStorage.getItem('dream_auth_v2.1') === 'true',
            currentSlide: 0
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
        this.init();
    }

    init() {
        document.readyState === 'complete' ? this.renderUI() : window.addEventListener('load', () => this.renderUI());
        this.startSlider();
    }

    startSlider() {
        setInterval(() => {
            const el = document.getElementById('slide-content');
            if (el) {
                this.state.currentSlide = (this.state.currentSlide + 1) % this.slides.length;
                const s = this.slides[this.state.currentSlide];
                el.style.opacity = 0;
                setTimeout(() => {
                    el.innerHTML = `<h3 style="color:#a3e635; margin:0 0 5px 0; font-size:14px; text-shadow: 0 0 10px rgba(163,230,53,0.5);">${s.title}</h3><p style="color:#cbd5e1; font-size:11px; line-height:1.4; margin:0;">${s.content}</p>`;
                    el.style.opacity = 1;
                }, 300);
            }
        }, 7000);
    }

    renderUI() {
        const shell = document.getElementById('app-shell');
        if (!shell) return;

        shell.innerHTML = `
            <style>
                body { background: #020617; color: white; font-family: sans-serif; overflow-x: hidden; }
                .pear-glow { box-shadow: 0 0 20px rgba(163, 230, 53, 0.15); border: 1px solid rgba(163, 230, 53, 0.2); }
                .nav-active { color: #a3e635 !important; filter: drop-shadow(0 0 5px #a3e635); }
            </style>

            <header style="text-align:center; padding: 20px; background: radial-gradient(circle at top, rgba(163, 230, 53, 0.1), transparent);">
                <p style="color:#a3e635; font-size:20px; margin:0; font-weight:bold;">بِسْمِ اللَّهِ بِإِذْنِ اللَّهِ</p>
                <p style="color:#4d7c0f; font-size:12px; margin:5px 0; letter-spacing:1px;">اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
            </header>

            <div class="pear-glow" style="margin: 10px 15px; background: rgba(15,23,42,0.6); border-radius: 25px; padding: 20px; min-height: 90px; backdrop-filter: blur(10px); display:flex; align-items:center; justify-content:center; text-align:center;">
                <div id="slide-content" style="transition: opacity 0.3s;">
                    <h3 style="color:#a3e635; margin:0;">DREAM CORE v15.0</h3>
                    <p style="color:#64748b; font-size:11px;">System Initializing...</p>
                </div>
            </div>

            <div id="main-content" style="padding-bottom: 100px;"></div>

            <nav style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(2,6,23,0.9); border: 1px solid rgba(163,230,53,0.2); padding: 12px 30px; border-radius: 35px; display: flex; gap: 35px; backdrop-filter: blur(15px); z-index: 1000;">
                <div onclick="window.DREAM.navigate('home')" class="nav-active" style="cursor:pointer; text-align:center;">
                    <i class="fas fa-home" style="font-size: 20px;"></i>
                </div>
                <div onclick="window.DREAM.navigate('qr')" style="cursor:pointer; text-align:center; color:#475569;">
                    <i class="fas fa-qrcode" style="font-size: 20px;"></i>
                </div>
                <div onclick="window.DREAM.navigate('profile')" style="cursor:pointer; text-align:center; color:#475569;">
                    <i class="fas fa-user" style="font-size: 20px;"></i>
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
            const mod = await import(`./modules/${id}/module.js?v=${Date.now()}`);
            content.innerHTML = await mod.default.render();
            if (mod.default.afterRender) mod.default.afterRender();
        } catch(e) {
            content.innerHTML = `<div style="padding:40px; text-align:center; color:#ef4444;">Module '${id}' Not Found.</div>`;
        }
    }
}

new DreamKernel();
