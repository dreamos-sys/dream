"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState('DEVELOPER');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: '👋 Say Greeting', icon: '👋', content: 'Selamat Datang\nDream OS v2.1' },
    { title: '📅 Booking', icon: '📅', content: 'Booking Hari Ini\n12 Bookings · 3 Pending' },
    { title: '⚠️ K3', icon: '⚠️', content: 'K3 Reports\n3 Pending · 7 Resolved' },
    { title: '🌤️ Weather', icon: '🌤️', content: 'Weather\n28°C · Depok, ID' },
    { title: '👔 Management', icon: '👔', content: 'Info Management\n5 Approvals Pending' },
    { title: '🏢 Info Umum', icon: '🏢', content: 'Info Umum\n3 Tasks Today' },
    { title: '💬 Ucapan', icon: '💬', content: 'Ucapan Kabar\nBirthday: Bapak Hanung' },
  ];

  const modules = [
    { name: 'Command', icon: '🎯', color: '#8b5cf6' },
    { name: 'Booking', icon: '📅', color: '#3b82f6' },
    { name: 'K3', icon: '⚠️', color: '#f59e0b' },
    { name: 'Security', icon: '🛡️', color: '#10b981' },
    { name: 'Janitor', icon: '🧹', color: '#ec4899' },
    { name: 'Stok', icon: '📦', color: '#f97316' },
    { name: 'Maintenance', icon: '🔧', color: '#06b6d4' },
    { name: 'Inventaris', icon: '📋', color: '#6366f1' },
    { name: 'Gudang', icon: '🏭', color: '#84cc16' },
  ];

  useEffect(() => {
    const session = sessionStorage.getItem('dream_session');
    const sessionUser = sessionStorage.getItem('dream_user');
    if (!session) {
      router.push('/login');
    } else if (sessionUser) {
      setUser(sessionUser);
    }
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);  }, [slides.length]);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white', paddingBottom: '100px' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, background: 'rgba(2,6,23,0.95)', backdropFilter: 'blur(20px)', padding: '20px 15px', borderBottom: '1px solid rgba(16,185,129,0.2)', zIndex: 100 }}>
        <div style={{ fontFamily: 'serif', fontSize: '32px', color: '#10b981', marginBottom: '5px', textAlign: 'center' }}>بِسْمِ اللَّهِ</div>
        <div style={{ fontFamily: 'serif', fontSize: '16px', color: 'rgba(16,185,129,0.7)', textAlign: 'center', marginBottom: '10px' }}>اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
        <div style={{ fontSize: '14px', color: '#10b981', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center' }}>DREAM OS V2.1</div>
        <div style={{ fontSize: '10px', color: 'rgba(148,163,184,0.7)', textAlign: 'center', marginTop: '5px' }}>Welcome, {user}</div>
      </header>

      {/* Carousel */}
      <div style={{ background: 'rgba(15,23,42,0.9)', border: '2px solid rgba(16,185,129,0.3)', borderRadius: '20px', padding: '20px', margin: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div style={{ color: '#10b981', fontSize: '14px', fontWeight: '700' }}>{slides[currentSlide].title}</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>◀</button>
            <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>▶</button>
          </div>
        </div>
        <div style={{ minHeight: '200px', background: 'rgba(2,6,23,0.8)', borderRadius: '15px', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>{slides[currentSlide].icon}</div>
          <div style={{ color: '#10b981', fontSize: '18px', marginBottom: '10px' }}>{slides[currentSlide].content.split('\n')[0]}</div>
          <div style={{ color: 'rgba(148,163,184,0.7)', fontSize: '14px' }}>{slides[currentSlide].content.split('\n')[1]}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '15px' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: '10px', height: '10px', borderRadius: '50%', border: '2px solid rgba(16,185,129,0.3)', background: i === currentSlide ? '#10b981' : 'transparent', cursor: 'pointer' }} />
          ))}
        </div>
      </div>

      {/* Module Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', padding: '15px' }}>
        {modules.map((mod) => (
          <div key={mod.name} style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: '25px', padding: '25px 15px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: '60px', height: '60px', margin: '0 auto 10px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', background: `linear-gradient(135deg,${mod.color},#059669)` }}>{mod.icon}</div>
            <div style={{ fontSize: '9px', color: 'rgba(16,185,129,0.8)', textTransform: 'uppercase', fontWeight: '600' }}>{mod.name}</div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', height: '70px', background: 'rgba(2,6,23,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(16,185,129,0.2)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000 }}>
        <button onClick={() => router.push('/dashboard')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#10b981', background: 'none', border: 'none', fontSize: '9px' }}>
          <span style={{ fontSize: '20px', marginBottom: '4px' }}>🏠</span>
          <span>Home</span>
        </button>
        <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(148,163,184,0.8)', background: 'none', border: 'none', fontSize: '9px' }}>          <span style={{ fontSize: '20px', marginBottom: '4px' }}>👤</span>
          <span>Profile</span>
        </button>
        <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(148,163,184,0.8)', background: 'none', border: 'none', fontSize: '9px' }}>
          <span style={{ fontSize: '20px', marginBottom: '4px' }}>📷</span>
          <span>QR</span>
        </button>
        <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(148,163,184,0.8)', background: 'none', border: 'none', fontSize: '9px' }}>
          <span style={{ fontSize: '20px', marginBottom: '4px' }}>🔔</span>
          <span>Alerts</span>
        </button>
        <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(148,163,184,0.8)', background: 'none', border: 'none', fontSize: '9px' }}>
          <span style={{ fontSize: '20px', marginBottom: '4px' }}>⚙️</span>
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}
