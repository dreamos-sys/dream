"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button onClick={onChange} style={{ width: '50px', height: '26px', background: enabled ? '#10b981' : '#475569', borderRadius: '13px', position: 'relative', border: 'none', cursor: 'pointer' }}>
      <div style={{ width: '22px', height: '22px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: enabled ? '26px' : '2px', transition: 'left 0.2s' }} />
    </button>
  );

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#10b981', marginBottom: '30px', textAlign: 'center' }}>⚙️ Settings</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'white' }}>🔔 Notifications</span>
          <Toggle enabled={notifications} onChange={() => setNotifications(!notifications)} />        </div>
        <div style={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'white' }}>🌙 Dark Mode</span>
          <Toggle enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>
        <div style={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'white' }}>💾 Auto Save</span>
          <Toggle enabled={autoSave} onChange={() => setAutoSave(!autoSave)} />
        </div>
      </div>
      <button onClick={() => { sessionStorage.clear(); router.push('/login'); }} style={{ width: '100%', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', borderRadius: '12px', padding: '15px', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', marginTop: '30px' }}>🚪 Logout</button>
    </div>
  );
}
