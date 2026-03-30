"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function QRPage() {
  const router = useRouter();

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px', alignSelf: 'flex-start' }}>← Back</button>
      <h1 style={{ color: '#10b981', marginBottom: '30px' }}>📷 QR Scanner</h1>
      <div style={{ width: '250px', height: '250px', background: '#0f172a', border: '2px solid #10b981', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ color: '#94a3b8', textAlign: 'center' }}>📷<br/>Camera Preview<br/><span style={{ fontSize: '12px' }}>Point at QR code</span></div>
      </div>
      <button style={{ width: '250px', background: '#10b981', border: 'none', borderRadius: '12px', padding: '15px', color: '#020617', fontWeight: 'bold', cursor: 'pointer' }}>Scan QR Code</button>
    </div>
  );
}
