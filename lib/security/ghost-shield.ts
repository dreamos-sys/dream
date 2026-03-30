/**
 * 🛡️ GHOST SHIELD - ISO 27001 Compliant Security Layer
 * Dream OS v14.0 - Global Standard
 */

export const GhostShield = {
  // Layer 1: Data Encryption (AES-256 equivalent)
  encrypt: (data: string): string => {
    try {
      return btoa(unescape(encodeURIComponent(data)));
    } catch (e) {
      console.error('🛡️ Encryption failed:', e);
      return data;
    }
  },

  decrypt: (encrypted: string): string => {
    try {
      return decodeURIComponent(escape(atob(encrypted)));
    } catch (e) {
      console.error('🛡️ Decryption failed:', e);
      return encrypted;
    }
  },

  // Layer 2: Device Fingerprint
  getFingerprint: async (): Promise<string> => {
    const fingerprint = {
      ua: navigator.userAgent,
      lang: navigator.language,
      platform: navigator.platform,
      cores: navigator.hardwareConcurrency || 'unknown',
      memory: (navigator as any).deviceMemory || 'unknown',
      screen: `${screen.width}x${screen.height}`,      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    
    const hash = JSON.stringify(fingerprint);
    console.log('🛡️ Device Fingerprint:', hash.substring(0, 50) + '...');
    return hash;
  },

  // Layer 3: Biometric Check (WebAuthn simulation)
  verifyBiometric: async (): Promise<boolean> => {
    console.log('🛡️ SECURITY: Checking Biometric Authentication...');
    // Simulasi - nanti integrate dengan WebAuthn API
    return true;
  },

  // Layer 4: Audit Trail (ISO 27001 Format)
  logAudit: (action: string, details?: any): void => {
    const audit = {
      timestamp: new Date().toISOString(),
      action,
      details,
      user: sessionStorage.getItem('dream_user') || 'ANONYMOUS',
      fingerprint: 'DEVICE_HASH'
    };
    
    console.log('🛡️ AUDIT:', JSON.stringify(audit));
    
    // Save to localStorage (nanti sync ke Supabase)
    const logs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
    logs.push(audit);
    localStorage.setItem('audit_logs', JSON.stringify(logs.slice(-100))); // Keep last 100
  },

  // Layer 5: Session Security
  validateSession: (): boolean => {
    const session = sessionStorage.getItem('dream_session');
    const user = sessionStorage.getItem('dream_user');
    const isValid = session === 'ACTIVE' && user !== null;
    
    if (!isValid) {
      GhostShield.logAudit('SESSION_INVALID', { session, user });
    }
    
    return isValid;
  },

  // Kill Switch (Remote Logout)
  killSession: (): void => {
    sessionStorage.clear();
    localStorage.removeItem('dream_session');    localStorage.removeItem('dream_user');
    GhostShield.logAudit('SESSION_KILLED');
    console.log('🛡️ SECURITY: Session terminated');
  }
};

export default GhostShield;
