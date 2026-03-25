export default {
    name: 'Command Center',
    icon: 'fa-building',
    color: '#a855f7',
    description: 'Enterprise Command Center',
    
    async render(context) {
        window.open('/command-center.html', '_blank');
        return `
            <div style="text-align:center; padding:60px;">
                <i class="fas fa-chart-line" style="font-size:64px; color:#a855f7; margin-bottom:20px;"></i>
                <h3 style="color:#a855f7;">Opening Command Center</h3>
                <p style="color:#64748b;">Redirecting to enterprise dashboard...</p>
                <button onclick="window.open('/command-center.html', '_blank')" 
                    style="margin-top:20px; background:#a855f7; border:none; padding:12px 24px; border-radius:12px; cursor:pointer;">
                    <i class="fas fa-external-link-alt"></i> Open Dashboard
                </button>
            </div>
        `;
    }
};
