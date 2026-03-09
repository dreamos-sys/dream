// shell.js - Dream OS v2.1 Shell
import { services, initServices } from '/shared/services/index.js';

let currentCleanup = null;

async function init() {
  // Inisialisasi shared services
  await initServices();

  // Ambil manifest.json
  const manifestRes = await fetch('/manifest.json');
  const { modules } = await manifestRes.json();

  // Render shell layout
  document.getElementById('app-shell').innerHTML = `
    <header style="display: flex; justify-content: space-between; padding: 1rem; background: #0b1120;">
      <h1 style="color:#10b981">Dream OS v2.1</h1>
      <div id="user-badge" style="background:#1e293b; padding:0.5rem 1rem; border-radius:20px;">GUEST</div>
    </header>
    <div id="module-grid" class="module-grid"></div>
    <div id="module-container" class="module-container"></div>
  `;

  // Render module grid
  const grid = document.getElementById('module-grid');
  grid.innerHTML = modules.map(m => `
    <div class="module-card" data-module-id="${m.id}">
      <span class="icon">${m.icon}</span>
      <span>${m.name}</span>
    </div>
  `).join('');

  // Event listeners untuk membuka modul
  document.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('click', async () => {
      const id = card.dataset.moduleId;
      const moduleInfo = modules.find(m => m.id === id);
      if (moduleInfo) await openModule(moduleInfo);
    });
  });

  // Clock sederhana (opsional)
  setInterval(() => {
    const clock = document.getElementById('clock');
    if (clock) clock.textContent = new Date().toLocaleTimeString('id-ID');
  }, 1000);
}

async function openModule(moduleInfo) {
  // Bersihkan modul sebelumnya
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  try {
    // Dynamic import modul
    const module = await import(moduleInfo.path);
    // Panggil fungsi default modul dengan context
    const cleanup = await module.default({
      container: document.getElementById('module-container'),
      services: services,
      user: null // nanti bisa diisi dari auth
    });
    currentCleanup = cleanup;
  } catch (err) {
    services.toast('Gagal memuat modul: ' + err.message, 'error');
    console.error(err);
  }
}

// Jalankan init setelah DOM siap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
