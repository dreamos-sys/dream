'use client';

import { useState } from 'react';

export const AIChat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('ollama/gpt-oss:120b-cloud');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setMessages(prev => [...prev, { role: 'assistant', content: '⏳ Thinking...' }]);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, model }),
      });
      const data = await res.json();
      setMessages(prev => prev.slice(0, -1).concat({ role: 'assistant', content: data.reply || 'Maaf, tidak ada respons.' }));
    } catch (err) {
      setMessages(prev => prev.slice(0, -1).concat({ role: 'assistant', content: '⚠️ Error: ' + err.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="glass-card rounded-3xl p-4 h-[70vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-emerald-400">🤖 AI Assistant</h2>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-full px-3 py-1 text-sm"
          >
            <option value="ollama/gpt-oss:120b-cloud">Ollama (GPT-OSS 120B)</option>
            <option value="openrouter/openai/gpt-4o-mini">OpenRouter GPT-4o Mini</option>
            <option value="nvidia/qwen/qwen3.5-397b-a17b">NVIDIA Qwen 397B</option>
          </select>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-slate-800/70 border border-slate-700'}`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
            placeholder="Tanyakan apa saja..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-full px-6 py-2 font-bold transition"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};
