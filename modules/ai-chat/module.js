Alert('🤖 AI Speak Module Loaded');

(function() {
    const supabase = window.supabase;
    const chatDisplay = document.getElementById('chat-display');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const voiceWave = document.getElementById('voice-wave');

    // Add message to chat
    function addMessage(text, isUser = false) {
        if(!chatDisplay) return;
        const div = document.createElement('div');
        div.className = `flex items-start gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`;
        div.innerHTML = `
            <div class="w-10 h-10 rounded-full ${isUser ? 'bg-blue-600' : 'bg-purple-600'} flex items-center justify-center text-xl shadow-lg border border-white/10">${isUser ? '👤' : '🤖'}</div>
            <div class="${isUser ? 'bg-blue-600' : 'bg-slate-800'} p-4 rounded-2xl ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[85%] shadow-xl border border-white/5">
                <p class="text-[13px] leading-relaxed text-white">${text}</p>
                <p class="text-[9px] opacity-40 mt-2 uppercase tracking-widest font-mono">${isUser ? 'User' : 'Dream AI'} • Now</p>
            </div>
        `;
        chatDisplay.appendChild(div);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    async function getAIResponse(question) {
        const q = question.toLowerCase();
        try {
            if (q.includes('booking')) {
                const { count } = await supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending');
                return `📅 Status: Ada **${count || 0} booking** yang masih pending di sistem SIF Al-Fikri.`;
            }
            if (q.includes('k3')) {
                const { count } = await supabase.from('k3_reports').select('*', { count: 'exact', head: true }).eq('status', 'pending');
                return `⚠️ Laporan: Terdeteksi **${count || 0} temuan K3** baru yang butuh verifikasi.`;
            }
            if (q.includes('hanung')) {
                return `✍️ Bapak **Hanung Budianto, S.E.** bertindak sebagai Final Approver di sistem ini.`;
            }
        } catch (e) { return "❌ Error: Gagal koneksi ke Core Supabase."; }
        return `🤖 Siap Master M! Apa lagi yang bisa saya bantu terkait operasional sistem?`;
    }

    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        addMessage(text, true);
        chatInput.value = '';
        const response = await getAIResponse(text);
        addMessage(response);
    }

    sendBtn?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
})();
