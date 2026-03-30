"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function JanitorPage() {
  const router = useRouter();
  const tasks = [
    { area: 'Lobby', status: 'completed', time: '08:00' },
    { area: 'Meeting Room', status: 'pending', time: '10:00' },
    { area: 'Cafeteria', status: 'in-progress', time: '11:00' },
  ];

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#ec4899', marginBottom: '20px' }}>🧹 Janitor Hub</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '15px', padding: '15px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', color: '#10b981' }}>1</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Completed</div>
        </div>
        <div style={{ flex: 1, background: 'rgba(236,72,153,0.1)', border: '1px solid #ec4899', borderRadius: '15px', padding: '15px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', color: '#ec4899' }}>1</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>In Progress</div>
        </div>        <div style={{ flex: 1, background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b', borderRadius: '15px', padding: '15px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', color: '#f59e0b' }}>1</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Pending</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tasks.map((task, i) => (
          <div key={i} style={{ background: '#0f172a', border: '1px solid rgba(236,72,153,0.2)', borderRadius: '12px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: 'white', fontWeight: 'bold' }}>{task.area}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>🕐 {task.time}</div>
            </div>
            <div style={{ color: task.status === 'completed' ? '#10b981' : task.status === 'in-progress' ? '#ec4899' : '#f59e0b', fontSize: '10px' }}>● {task.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
