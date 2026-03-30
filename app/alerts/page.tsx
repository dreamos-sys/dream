"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AlertsPage() {
  const router = useRouter();
  const alerts = [
    { id: 1, title: 'System Update', message: 'New version available', time: '2 hours ago', read: false },
    { id: 2, title: 'Booking Confirmed', message: 'Meeting Room A booked', time: '5 hours ago', read: true },
  ];

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#10b981', marginBottom: '30px' }}>🔔 Alerts</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '15px', padding: '15px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', color: '#10b981' }}>{alerts.filter(a => !a.read).length}</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Unread</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alerts.map((alert) => (
          <div key={alert.id} style={{ background: alert.read ? '#0f172a' : 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: 'white', fontWeight: 'bold' }}>{alert.title}</span>
              <span style={{ color: '#94a3b8', fontSize: '10px' }}>{alert.time}</span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '12px' }}>{alert.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
