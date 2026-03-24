/**
 * 🚀 DREAM OS v13.4 - THE ORCHESTRATOR (CORE NAVIGATION)
 * Mengatur flow antar modul: Home -> Module -> Home
 * Standar: Mobile Responsive & Fast Execution
 * Bismillah bi idznillah.
 */
console.log('🚀 Dream OS Orchestrator Active');

(function() {
    'use strict';

    // 1. Database & Session Check
    const checkSystemIntegrity = () => {
        if (!window.supabase) {
            console.error('⚠️ Critical: Supabase Engine not found!');
            return false;
        }
        return true;
    };

    // 2. Navigation Logic (The 9-Grid Switcher)
    window.showModule = (moduleId) => {
        console.log(`📡 Switching to Module: ${moduleId}`);
        
        // Sembunyikan Dashboard Utama
        const dashboard = document.getElementById('main-dashboard');
        if (dashboard) dashboard.classList.add('hidden');

        // Sembunyikan semua panel modul yang mungkin sedang terbuka
        document.querySelectorAll('.module-panel').forEach(panel => {
            panel.classList.add('hidden');
        });

        // Tampilkan modul yang dipilih
        const targetPanel = document.getElementById(`panel-${moduleId}`);
        if (targetPanel) {
            targetPanel.classList.remove('hidden');
            // Trigger auto-load data jika modul punya fungsi load
            triggerModuleLoad(moduleId);
        } else {
            console.error(`❌ Module Panel [panel-${moduleId}] not found in HTML!`);
        }
    };

    window.backToHome = () => {
        // Sembunyikan semua modul
        document.querySelectorAll('.module-panel').forEach(panel => {
            panel.classList.add('hidden');
        });
        
        // Tampilkan Dashboard
        const dashboard = document.getElementById('main-dashboard');
        if (dashboard) {
            dashboard.classList.remove('hidden');
            // Refresh stats dashboard
            if (typeof loadDashboardStats === 'function') loadDashboardStats();
        }
    };

    // 3. Auto-Trigger Loader per Modul
    function triggerModuleLoad(id) {
        switch(id) {
            case 'gudang': if(window.loadGudang) window.loadGudang(); break;
            case 'inventaris': if(window.loadInventaris) window.loadInventaris(); break;
            case 'k3': if(window.loadK3History) window.loadK3History(); break;
            case 'janitor-indoor': if(window.activateJanitorTab) window.activateJanitorTab('form'); break;
            case 'janitor-outdoor': if(window.activateOutdoorTab) window.activateOutdoorTab('form'); break;
            case 'dana': if(window.loadDana) window.loadDana(); break;
        }
    }

    // 4. Global Event Listeners (Back Button Physical & UI)
    window.addEventListener('popstate', (event) => {
        backToHome();
    });

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        if (checkSystemIntegrity()) {
            console.log('✅ System Integrity Verified. Ready for User.');
        }
    });

})();
