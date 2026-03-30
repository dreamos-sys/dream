"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CommandPage() {
  const router = useRouter();
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    setOutput([...output, `> ${command}`, `✓ Command executed: ${command}`]);
    setCommand('');
  };

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#8b5cf6', marginBottom: '20px' }}>🎯 Command Center</h1>
      <div style={{ background: '#0f172a', border: '1px solid #8b5cf6', borderRadius: '15px', padding: '20px', marginBottom: '20px' }}>
        <div style={{ height: '200px', overflowY: 'auto', marginBottom: '15px', fontFamily: 'monospace', fontSize: '12px' }}>          {output.map((line, i) => <div key={i} style={{ color: line.startsWith('✓') ? '#10b981' : '#94a3b8' }}>{line}</div>)}
        </div>
        <form onSubmit={handleCommand} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" value={command} onChange={(e) => setCommand(e.target.value)} placeholder="Enter command..." style={{ flex: 1, background: '#1e293b', border: '1px solid #8b5cf6', borderRadius: '8px', padding: '12px', color: 'white' }} />
          <button type="submit" style={{ background: '#8b5cf6', border: 'none', borderRadius: '8px', padding: '12px 24px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Run</button>
        </form>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {['System Status', 'Network', 'Logs', 'Users'].map((item) => (
          <button key={item} style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid #8b5cf6', borderRadius: '12px', padding: '15px', color: '#8b5cf6', cursor: 'pointer' }}>{item}</button>
        ))}
      </div>
    </div>
  );
}
