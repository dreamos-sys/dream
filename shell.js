const PASSWORDS = {
    master: 'b15m1ll4h_012443410',
    admin: '4dm1n_AF6969@00'
};

let currentUser = null;

function showLogin() {
    const pw = prompt('🔐 Masukkan password Dream OS:');
    if (pw === PASSWORDS.master) {
        currentUser = 'Master M';
        sessionStorage.setItem('user', 'master');
        renderApp();
    } else if (pw === PASSWORDS.admin) {
        currentUser = 'Administrator';
        sessionStorage.setItem('user', 'admin');
        renderApp();
    } else {
        alert('Password salah!');
        showLogin();
    }
}

function logout() {
    sessionStorage.clear();
    currentUser = null;
    location.reload();
}

// ========== MODAL SYSTEM ==========
function createModal() {
    // Cek apakah modal sudah ada
    let modal = document.getElementById('module-modal');
    if (modal) return modal;

    // Buat struktur modal
    modal = document.createElement('div');
    modal.id = 'module-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(8px);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #0f172a;
        border-radius: 24px;
        max-width: 600px;
        width: 100%;
        max-height: 90%;
        overflow-y: auto;
        position: relative;
        border: 1px solid #10b981;
        box-shadow: 0 20px 35px rgba(0,0,0,0.3);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: sticky;
        top: 10px;
        right: 10px;
        float: right;
        background: #10b981;
        border: none;
        color: #000;
        font-size: 24px;
        font-weight: bold;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        margin: 10px;
        z-index: 1;
    `;
    closeBtn.onclick = () => modal.style.display = 'none';

    const modalBody = document.createElement('div');
    modalBody.id = 'modal-body';
    modalBody.style.padding = '20px';
    modalBody.style.color = '#e2e8f0';

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Tutup modal jika klik di luar konten
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    return modal;
}

async function loadModuleInModal(moduleId) {
    const modal = createModal();
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = '<div style="text-align:center; padding:20px;">⏳ Memuat modul...</div>';
    modal.style.display = 'flex';

    try {
        const module = await import(`./modules/${moduleId}/module.js`);
        const html = module.default.render({ user: currentUser, toast: (msg) => alert(msg) });
        modalBody.innerHTML = html;
        if (module.default.afterRender) module.default.afterRender({ user: currentUser });
    } catch (err) {
        console.error(err);
        modalBody.innerHTML = `<div style="background:#0f172a; padding:20px; border-radius:12px;">❌ Modul "${moduleId}" belum siap: ${err.message}</div>`;
    }
}

// ========== RENDER DASHBOARD ==========
function renderApp() {
    document.getElementById('loading').style.display = 'none';
    const app = document.getElementById('app');

    // Ambil daftar modul dari window.MODULES (dari modules-list.js)
    const modules = window.MODULES || [];

    // Generate card grid
    const cardsHtml = modules.map(mod => `
        <div class="card" data-module="${mod.id}">
            <div class="card-icon"><i class="fas ${mod.icon}"></i></div>
            <div class="card-title">${mod.name}</div>
            <div class="card-desc">${mod.description || ''}</div>
        </div>
    `).join('');

    app.innerHTML = `
        <div class="header">
            <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div style="font-size: 12px; color: #94a3b8;">THE POWER SOUL OF SHALAWAT</div>
            <div style="margin-top: 20px;">Selamat datang, <strong>${currentUser}</strong></div>
        </div>
        <div class="grid" id="module-grid">
            ${cardsHtml}
        </div>
        <nav class="nav">
            <button data-page="home"><i class="fas fa-home"></i><br>Home</button>
            <button data-page="profile"><i class="fas fa-user"></i><br>Profile</button>
            <button data-page="settings"><i class="fas fa-cog"></i><br>Settings</button>
            <button onclick="logout()"><i class="fas fa-sign-out-alt"></i><br>Exit</button>
        </nav>
        <footer>DREAM TEAM © 2026 · v2.1</footer>
    `;

    // Event listener untuk card
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const moduleId = card.dataset.module;
            loadModuleInModal(moduleId);
        });
    });

    // Navigasi bawah (home, profile, settings) juga pakai modal
    document.querySelectorAll('.nav button').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            if (page === 'home') {
                renderApp();
            } else if (page === 'profile') {
                loadModuleInModal('profile');
            } else if (page === 'settings') {
                loadModuleInModal('settings');
            }
        });
    });
}

// ========== INIT ==========
window.onload = () => {
    // Load modules list first
    const script = document.createElement('script');
    script.src = './modules-list.js';
    script.onload = () => {
        const saved = sessionStorage.getItem('user');
        if (saved === 'master' || saved === 'admin') {
            currentUser = saved === 'master' ? 'Master M' : 'Administrator';
            renderApp();
        } else {
            showLogin();
        }
    };
    script.onerror = () => {
        console.error('Failed to load modules list');
        alert('Gagal memuat daftar modul. Periksa file modules-list.js');
    };
    document.head.appendChild(script);
};
