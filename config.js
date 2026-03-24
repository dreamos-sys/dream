/**
 * 🔑 DREAM OS v13.4 - SYSTEM CONFIGURATION
 * Security Standard: ISO 27001 (Information Security)
 * Device: Xiaomi Redmi Note 9 Pro Integration
 * Bismillah bi idznillah.
 */

const CONFIG = {
    // SUPABASE CORE ENGINE
    // Ganti dengan API Key & URL dari dashboard Supabase Anda
    SUPABASE_URL: "https://your-project-id.supabase.co",
    SUPABASE_ANON_KEY: "your-anon-public-key",

    // SYSTEM IDENTITY
    VERSION: "13.4.1-STABLE",
    ENVIRONMENT: "Production",
    ARCHITECT: "My Bro / Master M",
    
    // SECURITY CONTROLS
    LOCKOUT_ATTEMPTS: 3,
    LOCKOUT_DURATION: 300000, // 5 Menit
    GHOST_MODE: true, // Developer Stealth Architecture
    
    // DEVICE BINDING
    TARGET_DEVICE: "Redmi Note 9 Pro",
    FINGERPRINT_AUTH: true
};

// Initialize Supabase Global
if (typeof supabase !== 'undefined') {
    window.supabase = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    console.log(`🛡️ Dream OS Engine: Connected (v${CONFIG.VERSION})`);
} else {
    console.warn("⚠️ Warning: Supabase Library not loaded yet.");
}

// Export for Modules
window.DREAM_CONFIG = CONFIG;
