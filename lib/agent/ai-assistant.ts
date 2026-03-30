export const DreamAI = {
  chat: async (message: string) => {
    // Logic: Cek keyword modul dulu (Offline Mode)
    const msg = message.toLowerCase();
    if (msg.includes('booking')) return "📅 Buka module Booking untuk cek jadwal.";
    if (msg.includes('k3')) return "⚠️ Laporan K3 sedang diproses oleh Maintenance.";
    if (msg.includes('stok')) return "📦 Stok barang di Gudang aman, My Bro!";
    
    // Fallback: Simulasi AI Response (Bisa dikonek ke Gemini API)
    return "🤖 Dream AI: Siap membantu! Bi idznillah, sistem berjalan optimal.";
  },
  getSmartSuggestion: () => {
    return ["Cek K3 Pending", "Buat Laporan Harian", "Update Stok Gudang"];
  }
};
