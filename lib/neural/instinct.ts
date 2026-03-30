import { store } from '@/lib/data/global-store';

export const NeuralInstinct = {
  // 🧠 ANALISIS PENALARAN (Reasoning)
  analyzeState: async () => {
    const bookings = store.get('bookings') || [];
    const k3 = store.get('k3Reports') || [];
    const now = new Date();
    const hour = now.getHours();

    console.log("🧠 NEURAL: Reasoning in progress...");

    // Prediksi 1: Insting Waktu (Work Habits)
    if (hour > 16 && bookings.length > 5) {
      return {
        type: 'WARNING',
        msg: "⚠️ Insting: Over-capacity terdeteksi! Banyak booking di luar jam kerja.",
        action: 'SUGGEST_RESCHEDULE'
      };
    }

    // Prediksi 2: Insting Keselamatan (Cross-Module)
    const leakingReport = k3.find((r: any) => r.description.toLowerCase().includes('bocor'));
    if (leakingReport && hour > 18) {
      return {
        type: 'URGENT',
        msg: "🚨 Insting: Bahaya Korsleting! Ada laporan bocor di malam hari.",
        action: 'ALERT_MAINTENANCE'
      };
    }

    return { type: 'NORMAL', msg: "✅ Sistem Stabil. Belum ada deviasi pola." };
  },

  // 💾 SMART SAVING (Hanya simpan yang penting)
  smartRemember: (key: string, data: any) => {
    const memory = JSON.parse(localStorage.getItem('neural_memory') || '{}');
    memory[key] = {
      val: data,
      timestamp: Date.now(),
      importance: data.priority === 'high' ? 1.0 : 0.5
    };
    localStorage.setItem('neural_memory', JSON.stringify(memory));
  }
};
