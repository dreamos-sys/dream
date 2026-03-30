"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SecurityPage() {
  const router = useRouter();
  const [alerts] = useState([
    { id: 1, type: 'Login Attempt', location: 'Gate A', time: '10:30', status: 'resolved' },
    { id: 2, type: 'Motion Detected', location: 'Warehouse', time: '11:45', status: 'active' },
  ]);

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#10b981', marginBottom: '20px' }}>🛡️ Security Hub</h1>
      <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '15px', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🛡️</div>
        <div style={{ color: '#10b981', fontWeight: 'bold' }}>System Active</div>
        <div style={{ color: '#94a3b8', fontSize: '12px' }}>All cameras online</div>
      </div>      <h2 style={{ color: '#10b981', fontSize: '14px', marginBottom: '10px' }}>📋 Recent Alerts</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alerts.map((alert) => (
          <div key={alert.id} style={{ background: '#0f172a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: 'white', fontWeight: 'bold' }}>{alert.type}</span>
              <span style={{ color: alert.status === 'active' ? '#ef4444' : '#10b981', fontSize: '10px' }}>● {alert.status}</span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '12px' }}>📍 {alert.location} • 🕐 {alert.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
