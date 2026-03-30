"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function MaintenancePage() {
  const router = useRouter();
  const equipment = [
    { name: 'AC Unit 1', status: 'operational', lastCheck: '2024-01-15' },
    { name: 'Generator', status: 'maintenance', lastCheck: '2024-01-10' },
    { name: 'Elevator', status: 'operational', lastCheck: '2024-01-14' },
  ];

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#06b6d4', marginBottom: '20px' }}>🔧 Maintenance</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {equipment.map((item, i) => (
          <div key={i} style={{ background: '#0f172a', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '12px', padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</span>
              <span style={{ color: item.status === 'operational' ? '#10b981' : '#f59e0b', fontSize: '10px' }}>● {item.status}</span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '12px' }}>Last Check: {item.lastCheck}</div>
          </div>
        ))}
      </div>
      <button style={{ width: '100%', background: '#06b6d4', border: 'none', borderRadius: '12px', padding: '15px', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>+ Schedule Maintenance</button>
    </div>
  );}
