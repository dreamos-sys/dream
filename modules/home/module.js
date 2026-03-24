export default {
    async render({ user }) {
        const menus = [
            {id: 'booking', icon: 'calendar-check', label: 'Booking'},
            {id: 'k3', icon: 'shield-alt', label: 'K3'},
            {id: 'security', icon: 'video', label: 'Security'},
            {id: 'janitor', icon: 'broom', label: 'Janitor'},
            {id: 'tools', icon: 'tools', label: 'Tools'},
            {id: 'maintenance', icon: 'hammer', label: 'Maintenance'},
            {id: 'assets', icon: 'box-open', label: 'Assets'},
            {id: 'arena', icon: 'microchip', label: 'AI Arena'},
            {id: 'admin', icon: 'user-shield', label: 'Admin'}
        ];

        return `
            <div class="grid grid-cols-3 gap-4 animate-in fade-in duration-500">
                ${menus.map(m => `
                    <div onclick="DREAM.navigate('${m.id}')" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);" class="aspect-square flex flex-col items-center justify-center rounded-2xl active:scale-90 transition-all cursor-pointer">
                        <i class="fas fa-${m.icon} text-2xl mb-2 text-white/70"></i>
                        <span style="font-size:8px;" class="uppercase font-black text-white/30 tracking-widest">${m.label}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
}
