export const services = {
    auth: {
        login: (code) => {
            // BYPASS MODE: ACCESS GRANTED FOR MASTER M
            console.log('🔓 GHOST BYPASS ACTIVATED');
            localStorage.setItem('dream_os_session', 'active');
            localStorage.setItem('failedAttempts', '0');
            return true; 
        }
    },
    toast: (msg, type = 'info') => {
        alert((type === 'error' ? '❌ ' : '✅ ') + msg);
    }
};

export async function initServices() {
    console.log('🔓 SECURITY BYPASSED - WELCOME HOME MASTER');
}
