"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function InventarisPage() {
  const router = useRouter();
  const assets = [
    { name: 'Laptop Dell #001', category: 'Electronics', location: 'Office A' },
    { name: 'Projector Epson', category: 'Electronics', location: 'Meeting Room' },
    { name: 'Desk Chair', category: 'Furniture', location: 'Office B' },
  ];

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#6366f1', marginBottom: '20px' }}>📋 Inventaris</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: 'rgba(99,102,241,0.1)', border: '1px solid #6366f1', borderRadius: '15px', padding: '15px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', color: '#6366f1' }}>{assets.length}</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Total Assets</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {assets.map((asset, i) => (
          <div key={i} style={{ background: '#0f172a', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', padding: '15px' }}>
            <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '5px' }}>{asset.name}</div>
            <div style={{ color: '#94a3b8', fontSize: '12px' }}>📁 {asset.category} • 📍 {asset.location}</div>
          </div>
        ))}
      </div>
      <button style={{ width: '100%', background: '#6366f1', border: 'none', borderRadius: '12px', padding: '15px', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>+ Add Asset</button>
    </div>
  );
}
