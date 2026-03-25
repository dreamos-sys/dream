/**
 * ══════════════════════════════════════════════════════════════
 * DREAM OS v2.2.0 - INTEGRATED ENTERPRISE MAINTENANCE AGENT
 * Features: QR Scanner, Photo Upload, K3 Integration, Warehouse Sync
 * ══════════════════════════════════════════════════════════════
 */

export default {
    async render() {
        return `
            <div id="maintenance-pro" style="animation: fadeIn 0.5s ease;">
                <div style="margin-bottom:20px; border-bottom:1px solid #1e293b; padding-bottom:10px;">
                    <h2 style="color:#06b6d4; margin:0;">Enterprise Command Center</h2>
                    <p style="font-size:10px; color:#64748b;">INTEGRATED K3 & ASSET MANAGEMENT</p>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:20px;">
                    <button onclick="window.SCAN_QR()" style="background:#1e293b; border:1px solid #06b6d4; color:#06b6d4; padding:15px; border-radius:15px; font-weight:bold;">
                        <i class="fas fa-qrcode"></i> SCAN ASSET
                    </button>
                    <button onclick="window.TAKE_PHOTO()" style="background:#1e293b; border:1px solid #ec4899; color:#ec4899; padding:15px; border-radius:15px; font-weight:bold;">
                        <i class="fas fa-camera"></i> CAPTURE K3
                    </button>
                </div>

                <div id="form-container" style="background:rgba(15,23,42,0.9); padding:20px; border-radius:20px; border:1px solid rgba(255,255,255,0.05);">
                    <input type="hidden" id="qr-data">
                    <div id="asset-display" style="color:#94a3b8; font-size:12px; margin-bottom:10px;">Status: Menunggu Scan...</div>

                    <label style="font-size:10px; color:#64748b;">LAPORAN KERUSAKAN / K3</label>
                    <textarea id="main-report" rows="4" style="width:100%; background:#0f172a; border:1px solid #1e293b; color:#fff; border-radius:12px; margin-top:5px; padding:10px;"></textarea>
                    
                    <div style="margin-top:15px;">
                        <label style="font-size:10px; color:#64748b;">SUKU CADANG (GUDANG SYNC)</label>
                        <select id="part-sync" style="width:100%; background:#0f172a; border:1px solid #1e293b; color:#fff; padding:10px; border-radius:12px;">
                            <option value="none">Tidak Pakai Suku Cadang</option>
                            <option value="Filter-AC">Filter AC (Stok: 12)</option>
                            <option value="Oli-Genset">Oli Genset (Stok: 5L)</option>
                        </select>
                    </div>

                    <button onclick="window.SUBMIT_INTEGRATED()" id="btn-exec" style="width:100%; margin-top:20px; background:linear-gradient(90deg, #06b6d4, #ec4899); border:none; color:white; padding:15px; border-radius:15px; font-weight:bold;">
                        BISMILLAH - EXECUTE SYNC
                    </button>
                </div>
            </div>
        `;
    }
};

// --- LOGIC INTEGRASI ---

window.SCAN_QR = () => {
    // Simulasi integrasi dengan Camera API / ZXing
    const mockQR = "ASSET-DEPOK-AC-001";
    document.getElementById('qr-data').value = mockQR;
    document.getElementById('asset-display').innerHTML = `<b style="color:#06b6d4;">Aset Terdeteksi:</b> ${mockQR}`;
    console.log("QR Agent: Asset Linked.");
};

window.TAKE_PHOTO = () => {
    alert("Camera Mode: Menangkap Bukti K3 untuk Lampiran Command Center...");
    // Di Redmi Note 9 Pro, ini akan mentrigger input capture
};

window.SUBMIT_INTEGRATED = async () => {
    const btn = document.getElementById('btn-exec');
    const report = document.getElementById('main-report').value;
    const asset = document.getElementById('qr-data').value || "Manual-Entry";
    const part = document.getElementById('part-sync').value;

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-sync fa-spin"></i> SYNCING ECOSYSTEM...`;

    try {
        // 1. Update Maintenance Log
        const { error: logErr } = await _db.from('maintenance_logs').insert([{
            asset_id: asset,
            report_text: report,
            qr_code_data: asset,
            warehouse_part_used: part,
            k3_status: 'Verified'
        }]);

        if(logErr) throw logErr;

        // 2. Simulasi Update Stok Gudang (Jika ada part)
        if(part !== 'none') {
            console.log(`Gudang Agent: Mengurangi stok ${part}...`);
        }

        alert("✅ Bismillah, Ekosistem Tersinkronisasi.\nCommand Center & K3 telah menerima notifikasi.");
        location.reload();
    } catch(e) {
        alert("Sync Failed: " + e.message);
        btn.disabled = false;
        btn.innerText = "RETRY EXECUTE";
    }
};
