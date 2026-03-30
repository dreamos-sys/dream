import { store } from '@/lib/data/global-store';

export const NeuralInstinct = {
  analyzeState: async () => {
    const bookings = store.get('bookings') || [];
    const k3 = store.get('k3Reports') || [];
    const now = new Date();
    const hour = now.getHours();

    // 🧬 Reasoning berbobot
    let riskScore = 0;
    if (hour > 17) riskScore += 20; // Resiko lembur
    if (k3.length > 3) riskScore += 40; // Resiko incident menumpuk
    if (bookings.length > 10) riskScore += 30; // Resiko over-capacity

    // Insting dinamis
    if (riskScore > 70) {
      return {
        type: 'URGENT',
        msg: `🚨 Insting: System Stress Level ${riskScore}%! Segera koordinasi tim.`,
        action: 'AUTO_ROUTE_TO_MASTER'
      };
    }

    if (riskScore > 40) {
      return {
        type: 'WARNING',
        msg: "⚠️ Insting: Aktivitas mulai padat. Pantau modul Stok.",
        action: 'NOTIFY_ADMIN'
      };
    }

    return { type: 'NORMAL', msg: "✅ Sistem Stabil. Kapasitas Saraf Optimal." };
  }
};
