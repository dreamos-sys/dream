/**
 * MODULE: AI-CHAT v2.1
 * Interface: Sovereign Glassmorphism Bubble Chat
 */
export default {
    render: async (ctx) => {
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
                    <button onclick="alert('Mrs Gemini sedang berpikir...')" style="background: #10b981; color: #000; border: none; width: 50px; border-radius: 15px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                
                <button onclick="location.reload()" style="background: transparent; color: #64748b; border: none; font-size: 12px; text-decoration: underline; margin-top: 5px;">KEMBALI KE HOME</button>
            </div>
        `;
    }
};
