/**
 * 🏛️ DREAM OS v2.1 - UX/UI REFINE (PEAR GREEN)
 * Fix: Overlapping, Z-Index, and Module Spacing
 */

class DreamKernel {
    constructor() {
        this.state = { currentSlide: 0 };
        this.slides = [
            { title: "🕌 Spiritual Core", content: "Bismillah bi idznillah.\nSistem beroperasi dengan keberkahan." },
            { title: "🛡️ Security Status", content: "ISO 27001 Active.\nNo threats detected." },
            { title: "📅 Today's Agenda", content: "Rapat Koordinasi: 13:00\nCek Lapangan: 15:00" }
        ];
        this.init();
    }

    init() {
        document.readyState === 'complete' ? this.renderUI() : window.addEventListener('load', () => this.renderUI());
        setInterval(() => this.rotateSlides(), 7000);
    }

    rotateSlides() {
        const el = document.getElementById('slide-content');
        if (el) {
            this.state.currentSlide = (this.state.currentSlide + 1) % this.slides.length;
            const s = this.slides[this.state.currentSlide];
            el.style.opacity = 0;
            setTimeout(() => {
                el.innerHTML = `<h3 style="color:#a3e635; margin:0; font-size:14px;">${s.title}</h3><p style="color:#cbd5e1; font-size:11px; margin:0;">${s.content}</p>`;
                el.style.opacity = 1;
            }, 300);
        }
    }

    renderUI() {
        const shell = document.getElementById('app-shell');
        if (!shell) return;

        shell.innerHTML = `
            <style>
                :root { --pear: #a3e635; --dark: #020617; }
                body { background: var(--dark); color: white; font-family: 'Inter', sans-serif; margin: 0; overflow-x: hidden; }
                
                /* Layout Fix */
                #main-content { 
                    padding: 20px 15px 120px 15px; 
                    min-height: 100vh;
                    box-sizing: border-box;
                }

                /* Glassmorphism Reusable */
                .glass { 
                    background: rgba(15, 23, 42, 0.6); 
                    backdrop-filter: blur(12px); 
                    border: 1px solid rgba(163, 230, 53, 0.2);
                    border-radius: 25px;
                }

                /* Animation */
                .animate-up { animation: slideUp 0.4s ease-out; }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

                /* Nav Fix */
                nav { 
                    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
                    width: 85%; max-width: 400px;
                    background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(20px);
                    border: 1px solid rgba(163, 230, 53, 0.3);
                    padding: 15px; border-radius: 40px;
                    display: flex; justify-content: space-around;
                    z-index: 9999; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
            </style>

            <header style="text-align:center; padding: 25px 10px 10px 10px;">
                <p style="color:var(--pear); font-size:20px; margin:0; font-weight:bold; letter-spacing:1px;">بِسْمِ اللَّهِ بِإِذْنِ اللَّهِ</p>
                <small style="color:#4d7c0f; font-size:9px; letter-spacing:2px;">DREAM OS v15.0 MASTER</small>
            </header>

            <div class="glass" style="margin: 10px 15px; padding: 20px; min-height: 80px; text-align:center;">
                <div id="slide-content" style="transition: opacity 0.3s;">
                    <h3 style="color:var(--pear); margin:0;">INITIALIZING...</h3>
                </div>
            </div>

            <div id="main-content" class="animate-up"></div>

            <nav>
                <div onclick="DREAM.navigate('home')" style="color:var(--pear); cursor:pointer;"><i class="fas fa-grid-2 text-xl"></i></div>
                <div onclick="DREAM.navigate('booking')" style="color:#475569; cursor:pointer;"><i class="fas fa-calendar-alt text-xl"></i></div>
                <div onclick="DREAM.navigate('profile')" style="color:#475569; cursor:pointer;"><i class="fas fa-user-shield text-xl"></i></div>
            </nav>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        `;
        
        window.DREAM = { navigate: (id) => this.navigate(id) };
        this.navigate('home');
    }

    async navigate(id) {
        const content = document.getElementById('main-content');
        if (!content) return;
        content.style.opacity = '0.5';
        try {
            const mod = await import(`./modules/${id}/module.js?v=${Date.now()}`);
            content.innerHTML = await mod.default.render();
            if (mod.default.afterRender) mod.default.afterRender();
            content.style.opacity = '1';
        } catch(e) {
            content.innerHTML = `<div class="glass p-10 text-center text-red-400">Error Loading Module: ${id}</div>`;
            content.style.opacity = '1';
        }
    }
}

new DreamKernel();
