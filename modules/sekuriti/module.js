/**
 * SEKURITI MODULE - Dream OS v2.1
 * @param {Object} ctx - Module Context (container, services, user)
 */
export default async function initModule(ctx) {
  const { container, services, user } = ctx;

  // 1. Render UI Modul
  container.innerHTML = `
    <div class="module-wrapper animate-fade-in">
      <div class="module-header">
        <h2>🛡️ Sistem Sekuriti</h2>
        <p>Petugas: ${user ? user.name : 'GUEST'}</p>
      </div>

      <div class="module-content">
        <div class="card-action">
          <h3>Log Kejadian</h3>
          <textarea id="log-input" placeholder="Tulis laporan di sini..."></textarea>
          <button id="btn-submit-log" class="btn-primary">Kirim Laporan</button>
        </div>
        
        <div class="status-indicator">
          <span class="dot pulse"></span> Sistem Pemantauan Aktif
        </div>
      </div>
    </div>
  `;

  // 2. Logic & Event Listeners
  const btnSubmit = document.getElementById('btn-submit-log');
  const input = document.getElementById('log-input');

  const handleSubmit = async () => {
    const val = input.value.trim();
    if (!val) return services.toast('Laporan tidak boleh kosong!', 'warn');

    services.toast('Mengirim laporan ke Supabase...', 'info');
    
    // Simulasi pengiriman data
    setTimeout(() => {
      services.toast('✅ Laporan berhasil disimpan!', 'success');
      input.value = '';
    }, 1500);
  };

  btnSubmit.addEventListener('click', handleSubmit);

  // 3. CLEANUP FUNCTION (Wajib!)
  // Fungsi ini dijalankan saat user kembali ke Home atau pindah modul
  return function cleanup() {
    console.log('🧹 Cleaning up Sekuriti Module...');
    btnSubmit.removeEventListener('click', handleSubmit);
    // Hapus timer atau listener global jika ada di sini
  };
}
