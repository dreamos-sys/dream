export const babyDreamLogic = (input: string) => {
  const query = input.toLowerCase();
  if (query.includes('status')) return "🛡️ Dream OS v2.1: Semua sistem Imun aktif 100%!";
  if (query.includes('k3')) return "⚠️ Ada 3 laporan pending di area Lobby. Perlu cek segera!";
  if (query.includes('sholawat')) return "✨ Allahumma Sholli 'ala Sayyidina Muhammad. Semangat kerjanya, My Bro!";
  return "🤖 Maaf My Bro, Baby masih belajar. Coba tanya 'Status' atau 'K3'.";
};
