export const VoiceEngine = {
  // 🗣️ 1. Sistem Berbicara (Text-to-Speech)
  speak: (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID'; // Bahasa Indonesia Biar Akrab
      utterance.pitch = 1;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  },

  // 👂 2. Sistem Mendengar (Speech-to-Text)
  listen: (onResult: (cmd: string) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      onResult(command);
    };

    return recognition;
  }
};
