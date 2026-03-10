// ============================================
// GLOBAL EXPOSE - MUST BE BEFORE MODULE EXPORT
// ============================================

// Expose to window for non-module scripts
window.DREAM = window.DREAM || DREAM;
window.DreamCore = DreamCore;
window.app = app;

// Make load function accessible globally
window.DREAM.load = (moduleName, params) => {
    if (app && typeof app.loadModule === 'function') {
        return app.loadModule(moduleName, params);
    }
    console.warn('[DREAM] App not initialized yet');
};

// Make showToast accessible globally
window.DREAM.showToast = (message, type = 'info', duration = 3000) => {
    if (app && typeof app.showToast === 'function') {
        return app.showToast(message, type, duration);
    }
};

// Export for ES6 modules
export { DREAM, DreamCore, app };
