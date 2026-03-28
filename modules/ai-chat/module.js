/**
 * MODULE: AI-CHAT v2.1
 * Menggunakan API Ollama Cloud dengan key yang sudah dikonfigurasi.
 * Interface: Sovereign Glassmorphism Bubble Chat
 */
export default {
    render: async (ctx) => {
        // Ambil konfigurasi dari localStorage (bisa diatur di Settings nanti)
        const AI_ENDPOINT = localStorage.getItem('dream_ai_endpoint') || 'https://ollama.com/api/chat';
        const AI_MODEL = localStorage.getItem('dream_ai_model') || 'gpt-oss:120b-cloud';
        const AI_KEY = localStorage.getItem('dream_ai_key') || 'a5cf7826213041019f9d7a9bf3e9ad22.Zt7Uj0jJhPjv2s31wDEYCOec';

        return `
            <div class="animate-fade" style="display: flex; flex-direction: column; height: calc(100vh - 150px); color: #fff; padding: 10px;">
                <div style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; padding: 15px; border-radius: 20px; display: flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                    <div style="width: 40px; height: 40px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #000;">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div>
                        <h4 style="margin: 0; font-size: 14px;">Mrs Gemini Copilot</h4>
                        <small style="color: #10b981; font-size: 10px;">● Online - Sovereign System</small>
                    </div>
                </div>

                <div id="chat-window" style="flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 15px;">
                    <div style="align-self: flex-start; max-width: 85%; background: rgba(30, 41, 59, 0.8); padding: 12px; border-radius: 20px 20px 20px 5px; font-size: 13px; line-height: 1.4; border-left: 3px solid #10b981;">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ <br><br>
                        Siap Master, ada yang bisa saya bantu untuk optimasi Dream OS hari ini?
                    </div>
                </div>

                <div style="padding: 15px 0; display: flex; gap: 10px;">
                    <input type="text" id="ai-input" placeholder="Ketik pesan..." style="flex: 1; background: rgba(15, 23, 42, 0.8); border: 1px solid #334155; color: #fff; padding: 15px; border-radius: 15px; font-size: 14px; outline: none;">
                    <button id="send-btn" style="background: #10b981; color: #000; border: none; width: 50px; border-radius: 15px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>

                <button id="back-home" style="background: transparent; color: #64748b; border: none; font-size: 12px; text-decoration: underline; margin-top: 5px;">KEMBALI KE HOME</button>
            </div>
        `;
    },
    afterRender: async (ctx) => {
        const input = document.getElementById('ai-input');
        const sendBtn = document.getElementById('send-btn');
        const chatWindow = document.getElementById('chat-window');
        const backHome = document.getElementById('back-home');

        // Ambil konfigurasi dari localStorage (sama seperti di render)
        const AI_ENDPOINT = localStorage.getItem('dream_ai_endpoint') || 'https://ollama.com/api/chat';
        const AI_MODEL = localStorage.getItem('dream_ai_model') || 'gpt-oss:120b-cloud';
        const AI_KEY = localStorage.getItem('dream_ai_key') || 'a5cf7826213041019f9d7a9bf3e9ad22.Zt7Uj0jJhPjv2s31wDEYCOec';

        // Fungsi tambah pesan
        function addMessage(text, isUser = false) {
            const bubble = document.createElement('div');
            bubble.style.alignSelf = isUser ? 'flex-end' : 'flex-start';
            bubble.style.maxWidth = '85%';
            bubble.style.background = isUser ? 'rgba(16, 185, 129, 0.2)' : 'rgba(30, 41, 59, 0.8)';
            bubble.style.padding = '12px';
            bubble.style.borderRadius = isUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px';
            bubble.style.fontSize = '13px';
            bubble.style.lineHeight = '1.4';
            bubble.style.border = isUser ? '1px solid #10b981' : 'none';
            bubble.style.borderLeft = isUser ? 'none' : '3px solid #10b981';
            bubble.textContent = text;
            chatWindow.appendChild(bubble);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }

        // Fungsi panggil AI
        async function callAI(prompt) {
            const response = await fetch(AI_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AI_KEY}`
                },
                body: JSON.stringify({
                    model: AI_MODEL,
                    messages: [{ role: 'user', content: prompt }],
                    stream: false
                })
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API error: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            // Handle response format (Ollama uses .message.content)
            return data.message?.content || data.response || "Maaf, saya tidak bisa menjawab saat ini.";
        }

        // Fungsi kirim pesan
        async function sendMessage() {
            const message = input.value.trim();
            if (!message) return;
            addMessage(message, true);
            input.value = '';

            // Loading
            const loadingBubble = document.createElement('div');
            loadingBubble.style.alignSelf = 'flex-start';
            loadingBubble.style.maxWidth = '85%';
            loadingBubble.style.background = 'rgba(30, 41, 59, 0.8)';
            loadingBubble.style.padding = '12px';
            loadingBubble.style.borderRadius = '20px 20px 20px 5px';
            loadingBubble.style.fontSize = '13px';
            loadingBubble.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sedang berpikir...';
            chatWindow.appendChild(loadingBubble);
            chatWindow.scrollTop = chatWindow.scrollHeight;

            try {
                const response = await callAI(message);
                loadingBubble.remove();
                addMessage(response, false);
            } catch (err) {
                loadingBubble.remove();
                addMessage(`⚠️ Error: ${err.message}`, false);
                console.error(err);
            }
        }

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        backHome.addEventListener('click', () => {
            // Kembali ke dashboard: kita panggil ulang render dashboard (bisa dengan reload atau panggil fungsi)
            // Karena kita pakai shell-simple.js, kita bisa minta user reload, atau panggil fungsi global jika ada.
            // Untuk sederhana, reload halaman.
            location.reload();
        });
    }
};
