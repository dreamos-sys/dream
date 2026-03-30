"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState('DEVELOPER');
  const [role, setRole] = useState('ADMIN');

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('dream_user');
    if (sessionUser) setUser(sessionUser);
  }, []);

  return (    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#10b981', marginBottom: '30px', textAlign: 'center' }}>👤 Profile</h1>
      <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '20px', padding: '40px', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ width: '80px', height: '80px', margin: '0 auto 20px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#10b981' }}>{user.charAt(0)}</div>
        <h2 style={{ color: 'white', marginBottom: '5px' }}>{user}</h2>
        <p style={{ color: '#10b981', fontSize: '12px', marginBottom: '20px' }}>{role}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button style={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '12px', padding: '15px', color: '#10b981', cursor: 'pointer' }}>✏️ Edit Profile</button>
        <button style={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: '12px', padding: '15px', color: '#10b981', cursor: 'pointer' }}>🔐 Change Password</button>
        <button onClick={() => { sessionStorage.clear(); router.push('/login'); }} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', borderRadius: '12px', padding: '15px', color: '#ef4444', cursor: 'pointer' }}>🚪 Logout</button>
      </div>
    </div>
  );
}
