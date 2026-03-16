// ===== modules/sekuriti/module.js =====
export default async function initModule({ container, services, user }) {
  // Render HTML
  container.innerHTML = `
    <div class="sekuriti-panel">
      <h2>Laporan Patroli</h2>
      <form id="laporan-form">
        <input type="text" id="lokasi" placeholder="Lokasi">
        <button type="submit">Kirim</button>
      </form>
    </div>
  `;

  const form = container.querySelector('#laporan-form');
  const handleSubmit = async (e) => {
    e.preventDefault();
    services.toast('Laporan dikirim (demo)', 'success');
  };
  form.addEventListener('submit', handleSubmit);

  // Cleanup
  return () => {
    form.removeEventListener('submit', handleSubmit);
    console.log('Sekuriti cleanup');
  };

}
export default async function initModule({ container, services, user }) {
  container.innerHTML = `
    <div style="background:#1e293b; padding:2rem; border-radius:16px;">
      <h2 style="color:#10b981">Laporan Patroli</h2>
      <form id="demoForm">                                  <input type="text" id="lokasi" placeholder="Lokasi" style="width:100%; padding:0.8rem; margin:1rem 0; background:#334155; border:none; border-radius:8px; color:white;">
        <button type="submit" style="background:#10b981; color:white; padding:0.8rem 2rem; border:none; border-radius:8px; font-weight:bold;">Kirim</button>
     </form>
    </div>
  `;

  const form = container.querySelector('#demoForm');
  const handleSubmit = (e) => {
    e.preventDefault();
    services.toast('Laporan demo berhasil dikirim');
  };
  form.addEventListener('submit', handleSubmit);

  return () => {
    form.removeEventListener('submit', handleSubmit);
  };
}

