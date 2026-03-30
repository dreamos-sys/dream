"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const router = useRouter();
  const [bookings] = useState([
    { id: 1, title: 'Meeting Room A', time: '09:00 - 10:00', status: 'confirmed' },
    { id: 2, title: 'Vehicle Request', time: '10:00 - 12:00', status: 'pending' },
    { id: 3, title: 'Equipment Loan', time: '13:00 - 15:00', status: 'confirmed' },
  ]);

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#3b82f6', marginBottom: '20px' }}>📅 Booking System</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: 'rgba(59,130,246,0.1)', border: '1px solid #3b82f6', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', color: '#3b82f6' }}>12</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Total Bookings</div>
        </div>
        <div style={{ flex: 1, background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', color: '#f59e0b' }}>3</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Pending</div>
        </div>      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {bookings.map((booking) => (
          <div key={booking.id} style={{ background: '#0f172a', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '12px', padding: '15px' }}>
            <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '5px' }}>{booking.title}</div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '5px' }}>🕐 {booking.time}</div>
            <div style={{ color: booking.status === 'confirmed' ? '#10b981' : '#f59e0b', fontSize: '10px' }}>● {booking.status.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <button style={{ width: '100%', background: '#3b82f6', border: 'none', borderRadius: '12px', padding: '15px', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>+ New Booking</button>
    </div>
  );
}
