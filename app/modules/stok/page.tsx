"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function StokPage() {
  const router = useRouter();
  const items = [
    { name: 'Paper A4', stock: 150, unit: 'reams', status: 'good' },
    { name: 'Ink Black', stock: 8, unit: 'boxes', status: 'low' },
    { name: 'Pens', stock: 200, unit: 'pcs', status: 'good' },
  ];

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#f97316', marginBottom: '20px' }}>📦 Stock Management</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: '#0f172a', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '12px', padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</span>              <span style={{ color: item.status === 'good' ? '#10b981' : '#ef4444', fontSize: '10px' }}>● {item.status}</span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '12px' }}>Stock: {item.stock} {item.unit}</div>
          </div>
        ))}
      </div>
      <button style={{ width: '100%', background: '#f97316', border: 'none', borderRadius: '12px', padding: '15px', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>+ Add Item</button>
    </div>
  );
}
