export default {
    render(context) {
        return `
            <div style="background:#0f172a; border-radius:24px; padding:24px;">
                <h3 style="color:#10b981;">⚙️ Pengaturan</h3>
                <div style="margin:12px 0;">
                    <label><input type="checkbox"> Notifikasi Email</label>
                </div>
                <div style="margin:12px 0;">
                    <label><input type="checkbox"> Mode Gelap</label>
                </div>
                <button onclick="alert('Pengaturan disimpan')" style="background:#10b981; border:none; padding:8px 16px; border-radius:8px;">Simpan</button>
            </div>
        `;
    }
};
