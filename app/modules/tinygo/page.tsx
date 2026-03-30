"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function TinyGoPage() {
  const router = useRouter();

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#84cc16', marginBottom: '20px' }}>🚀 TinyGo Module</h1>
      <div style={{ background: 'rgba(132,204,22,0.1)', border: '1px solid #84cc16', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🚀</div>
        <h2 style={{ color: '#84cc16', marginBottom: '10px' }}>TinyGo is Ready!</h2>
        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>High-performance Go module for Dream OS</p>
        <button style={{ background: '#84cc16', border: 'none', borderRadius: '12px', padding: '15px 30px', color: '#020617', fontWeight: 'bold', cursor: 'pointer' }}>Launch TinyGo</button>
      </div>
    </div>
  );
}
