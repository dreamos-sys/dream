export const getPrayerRakaat = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) return "2"; // Subuh
  if (hour >= 11 && hour < 15) return "4"; // Dzuhur
  if (hour >= 15 && hour < 18) return "4"; // Ashar
  if (hour >= 18 && hour < 19) return "3"; // Maghrib
  return "4"; // Isya
};

export const GhostShield = {
  verify: (input: string) => input === `dreamos${getPrayerRakaat()}`,
  logAudit: (action: string) => {
    console.log(`🛡️ ISO AUDIT: ${action} at ${new Date().toISOString()}`);
  }
};
