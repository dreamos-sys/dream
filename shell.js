// DREAM OS v2.1 - SHELL.JS (MASTER ARCHITECT RESTORE)
// Bismillah...

(function() {
    'use strict';
    console.log('🚀 Dream OS core Restored...');

    // Config Utama
    const modules = [
        { name: 'Gudang', icon: 'assets/img/icon-192.png' }, // Pakai Logo D Emas
        { name: 'Booking', icon: 'assets/img/icon-192.png' },
        { name: 'Security', icon: 'assets/img/icon-192.png' },
        { name: 'AI Hub', icon: 'assets/img/icon-192.png' },
        { name: 'Settings', icon: 'assets/img/icon-192.png' },
        { name: 'Sync', icon: 'assets/img/icon-192.png' }
    ];

    // CSS Styling (Pearl Green & Clean Grid)
    const style = document.createElement('style');
    style.textContent = `
        :root { --pearl: #e0f2f1; --soft: #b2dfdb; --accent: #10b981; }
        body { margin: 0; padding: 0; font-family: sans-serif; background: linear-gradient(135deg, var(--pearl), var(--soft)); min-height: 100vh; }
        #login-screen { position: fixed; inset: 0; background: #4a148c; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2000; transition: 0.5s; }
        #app-shell { display: none; padding: 20px; padding-bottom: 90px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; text-align: center; }
        .tile { display: flex; flex-direction: column; align-items: center; font-weight: bold; color: #004d40; font-size: 0.75rem; }
        .icon-w { width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; }
        .icon-w img { width: 100%; height: 100%; object-fit: contain; }
        .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 75px; background: white; display: flex; justify-content: space-around; align-items: center; border-top: 1px solid #ddd; z-index: 1000; }
        .bottom-nav span { font-size: 1.25rem; opacity: 0.5; cursor: pointer; }
        .qr-btn { width: 70px; height: 70px; background: white; border-radius: 50%; border: 4px solid var(--accent); position: relative; top: -25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .qr-btn img { width: 80%; height: 80%; object-fit: contain; }
        input { width: 80%; max-width: 300px; padding: 12px; border-radius: 25px; border: none; text-align: center; font-weight: bold; margin: 20px 0; outline: none; }
        .btn { background: var(--accent); color: white; border: none; padding: 12px 40px; border-radius: 25px; cursor: pointer; font-weight: bold; }
    `;
    document.head.appendChild(style);

    // Render Login
    document.getElementById('app-shell').innerHTML = `
        <div id="login-screen">
            <img src="assets/img/icon-192.png" width="80" style="margin-bottom:20px;">
            <div style="font-size: 1.2rem; margin-bottom: 10px;">بِسْمِ اللّٰهِ</div>
            <div style="font-size: 0.6rem; opacity: 0.7;">DREAM OS v2.1 Enterprise</div>
            <input type="password" id="p" placeholder="ACCESS KEY">
            <button class="btn" onclick="DREAM.v()">VERIFIKASI AKSES</button>
        </div>
        
        <div id="dashboard">
            <h3 style="text-align:center; color: #00796b;">Dream OS | Serene Core</h3>
            <div class="grid">` + 
                modules.map(mod => `<div class="tile"><div class="icon-w"><img src="${mod.icon}"></div>${mod.name}</div>`).join('') + 
            `</div>
        </div>

        <nav class="bottom-nav">
            <span>🏠</span> <span>👤</span>
            <div class="qr-btn"><img src="assets/img/icon-192.png"></div>
            <span>ℹ️</span> <span>⚙️</span>
        </nav>
    `;

    // Eksplorasi Global Object agar onclick bisa manggil
    window.DREAM = {
        v: function() {
            if(document.getElementById('p').value === "DREAM13"){
                document.getElementById('login-screen').style.opacity = '0';
                setTimeout(() => { document.getElementById('login-screen').style.display='none'; document.getElementById('dashboard').style.display='block'; }, 500);
            } else { alert("Ditolak!"); }
        }
    };

    document.getElementById('app-shell').style.display = 'block';

})();
