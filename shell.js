/**
 * DREAM OS v2.1 - SOVEREIGN ENTERPRISE EDITION
 * The Power Soul of Shalawat - Limited Edition 2026
 */

const CONFIG = {
    version: '2.1.0-sovereign',
    supabase: {
        url: 'https://lfavawkzvdhdpaaplaiq.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYXZhd2t6dmRoZHBhYXBsYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjc0NjgsImV4cCI6MjA4OTUwMzQ2OH0.EhwnhAd20lUVaWHHB51UdWCGWxkyTaWIrsPY8xvhwE00'
    },
    ghost: { tapCount: 5, code: 'dreamos2026' }
};

const ROLE_CONFIG = {
    master: { level: 100, passwords: ['b15m1ll4h_012443410', 'Mr.M_Architect_2025'], displayName: 'Master M' },
    admin: { level: 90, passwords: ['4dm1n_AF6969@00'], displayName: 'Admin' }
};

const Auth = {
    login(pw) {
        for (const [role, cfg] of Object.entries(ROLE_CONFIG)) {
            if (cfg.passwords.includes(pw)) {
                sessionStorage.setItem('dreamos_role', role);
                sessionStorage.setItem('dreamos_user', cfg.displayName);
                return true;
            }
        }
        return false;
    },
    logout() { sessionStorage.clear(); location.reload(); }
};

function showLoginModal() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;inset:0;background:#000;z-index:10000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(15px);';
        modal.innerHTML = `
            <div style="background:rgba(15,23,42,0.9);border:1px solid #d4af37;border-radius:32px;padding:40px;width:90%;max-width:400px;text-align:center;">
                <img src="./assets/img/icon-512.png" style="width:120px;margin-bottom:20px;filter:drop-shadow(0 0 10px #d4af37);">
                <p style="color:#d4af37;font-family:serif;font-size:20px;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <div style="position:relative;margin:20px 0;">
                    <input type="password" id="pw" placeholder="Access Key..." style="width:100%;padding:15px;background:#000;border:1px solid #d4af37;border-radius:12px;color:#fff;text-align:center;">
                    <button id="eye" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:#d4af37;cursor:pointer;">👁️</button>
                </div>
                <button id="go" style="width:100%;padding:15px;background:#d4af37;border:none;border-radius:12px;font-weight:bold;cursor:pointer;">LOGIN</button>
            </div>`;
        document.body.appendChild(modal);
        const input = modal.querySelector('#pw'), eye = modal.querySelector('#eye');
        eye.onclick = () => { input.type = input.type === 'password' ? 'text' : 'password'; eye.innerHTML = input.type === 'password' ? '👁️' : '🙈'; };
        modal.querySelector('#go').onclick = () => { if(Auth.login(input.value)) { modal.remove(); location.reload(); } else { alert('Wrong Key!'); } };
    });
}

async function renderApp() {
    document.getElementById('app-shell').innerHTML = `
        <header id="islamic-header" style="border:1px solid #d4af37;border-radius:20px;padding:20px;margin:16px;text-align:center;cursor:pointer;">
            <p style="font-size:24px;color:#d4af37;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p style="color:#64748b;font-size:10px;letter-spacing:3px;">THE POWER SOUL OF SHALAWAT</p>
        </header>
        <div id="main-content" style="padding:16px;margin-bottom:80px;color:#fff;text-align:center;">Selamat Datang, Master M</div>
        <nav style="position:fixed;bottom:0;left:0;right:0;background:#020617;border-top:1px solid #d4af37;display:flex;justify-content:space-around;padding:12px;z-index:1000;">
            <button onclick="location.reload()" style="background:none;border:none;color:#d4af37;"><i class="fas fa-home"></i><br><span style="font-size:10px;">Home</span></button>
            <button style="background:none;border:none;color:#64748b;"><i class="fas fa-qrcode"></i><br><span style="font-size:10px;">QR</span></button>
            <button style="background:none;border:none;color:#64748b;"><i class="fas fa-user-shield"></i><br><span style="font-size:10px;">Profile</span></button>
            <button style="background:none;border:none;color:#64748b;"><i class="fas fa-cog"></i><br><span style="font-size:10px;">Setup</span></button>
            <button onclick="Auth.logout()" style="background:none;border:none;color:#ef4444;"><i class="fas fa-power-off"></i><br><span style="font-size:10px;">Exit</span></button>
        </nav>
    `;
    let taps = 0;
    document.getElementById('islamic-header').onclick = () => {
        taps++;
        if(taps === 5) { if(prompt('Code?') === 'dreamos2026') alert('Ghost Active!'); taps = 0; }
        setTimeout(() => taps = 0, 2000);
    };
}

async function init() {
    if(!sessionStorage.getItem('dreamos_role')) await showLoginModal();
    else await renderApp();
}
init();
