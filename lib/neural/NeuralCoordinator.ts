import { SovereignHub } from './SovereignHub';
import { NeuralInstinct } from './instinct';
import { VoiceEngine } from './VoiceEngine';

export const NeuralCoordinator = {
  // 🧬 Fungsi Utama: Sinkronisasi Total
  syncProcess: async (onUpdate: (data: any) => void) => {
    // 1. Ambil Data Segar dari Si Tiny (Hardware Hub)
    const sensors = {
      net: await SovereignHub.detectNetwork(),
      bt: await SovereignHub.scanBluetooth(),
      nfc: await SovereignHub.checkNFC(),
      tv: await SovereignHub.detectSmartBox(),
      ptr: await SovereignHub.detectPrinter()
    };

    // 2. Kirim ke Si Baby (Brain Analysis)
    const analysis = await NeuralInstinct.analyzeState();

    // 3. Eksekusi Feedback Suara (Hanya jika ada perubahan krusial)
    if (analysis.type === 'URGENT') {
      VoiceEngine.speak(analysis.msg);
    }

    // 4. Balikin Data Lengkap ke UI (Gue)
    onUpdate({ sensors, analysis });
  }
};
