export const VaccineEngine = {
  // Pakai SHA-256 biar Hacker nangis darah
  generateSignature: async (payload: string) => {
    const msgUint8 = new TextEncoder().encode(payload);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 24);
  },

  ingestAttack: async (payload: string) => {
    const signature = await VaccineEngine.generateSignature(payload);
    const vaccines = JSON.parse(localStorage.getItem('dream_vaccines') || '[]');
    
    if (!vaccines.includes(signature)) {
      vaccines.push(signature);
      localStorage.setItem('dream_vaccines', JSON.stringify(vaccines));
      // 🔥 Auto-report to Command Center
      console.log(`🧬 VACCINE CREATED: [${signature}]`);
    }
    return signature;
  }
};
