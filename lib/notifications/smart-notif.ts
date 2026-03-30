export const SmartNotif = {
  send: (title: string, body: string, priority: 'URGENT' | 'NORMAL') => {
    console.log(`🔔 [${priority}] ${title}: ${body}`);
    // Integrasi dengan browser notification API
  }
};
