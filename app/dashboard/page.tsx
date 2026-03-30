"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GhostShield from '@/lib/security/ghost-shield';
import useNeuralAgent from '@/lib/agent/neural-engine';
import ModuleDiscovery from '@/lib/discovery';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState('DEVELOPER');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAI, setShowAI] = useState(false);
  const [aiMessages, setAiMessages] = useState<{role: string, text: string}[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [securityStatus, setSecurityStatus] = useState('🛡️ SECURE');

  // Initialize Neural Agent
  const neural = useNeuralAgent();

  const slides = [
    { title: '👋 Say Greeting', icon: '👋', content: 'Selamat Datang\nDream OS v14.0' },
    { title: '📅 Booking', icon: '📅', content: 'Booking Hari Ini\n12 Bookings · 3 Pending' },
    { title: '⚠️ K3', icon: '⚠️', content: 'K3 Reports\n3 Pending · 7 Resolved' },
    { title: '🌤️ Weather', icon: '🌤️', content: 'Weather\n28°C · Depok, ID' },
    { title: '👔 Management', icon: '👔', content: 'Info Management\n5 Approvals Pending' },
    { title: '🏢 Info Umum', icon: '🏢', content: 'Info Umum\n3 Tasks Today' },
    { title: '💬 Ucapan', icon: '💬', content: 'Ucapan Kabar\nBirthday: Bapak Hanung' },
  ];

  const modules = ModuleDiscovery.getAllModules();

  useEffect(() => {
    // Security Check on Load
    GhostShield.logAudit('DASHBOARD_LOAD', { user });    GhostShield.getFingerprint().then(() => {
      setSecurityStatus('🛡️ VERIFIED');
    });

    // Initialize Module Discovery
    ModuleDiscovery.init();

    // Session Validation
    const session = sessionStorage.getItem('dream_session');
    const sessionUser = sessionStorage.getItem('dream_user');
    if (!session) router.push('/login');
    else if (sessionUser) setUser(sessionUser);

    // Neural Agent Learning
    neural.learn('dashboard');
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNav = (page: string) => {
    setActiveNav(page);
    if (page === 'home') return;
    else if (page === 'profile') router.push('/profile');
    else if (page === 'qr') router.push('/qr');
    else if (page === 'alerts') router.push('/alerts');
    else if (page === 'settings') router.push('/settings');
  };

  const handleAIMessage = () => {
    if (!aiInput.trim()) return;
    setAiMessages([...aiMessages, { role: 'user', text: aiInput }]);
    setAiInput('');
    setTimeout(() => setAiMessages(prev => [...prev, { role: 'ai', text: '🤖 Neural AI: Saya sedang belajar dari pola Anda...' }]), 1000);
  };

  let ghostTapCount = 0, ghostLastTap = 0;
  const handleGhostTap = () => {
    const now = Date.now();
    if (now - ghostLastTap > 800) ghostTapCount = 0;
    ghostTapCount++;
    ghostLastTap = now;
    if (ghostTapCount >= 5) {
      GhostShield.logAudit('GHOST_MODE_ACTIVATED');
      alert('👻 GHOST MODE\n\n5x Tap detected!\n\nSecurity Level: MAXIMUM');
      ghostTapCount = 0;
    }
  };
  const handleModuleClick = (moduleId: string, path: string) => {
    ModuleDiscovery.trackAccess(moduleId);
    neural.learn(moduleId);
    router.push(path);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)', color: 'white', paddingBottom: '100px' }}>
      {/* ✨ Header with Security Status */}
      <header style={{ position: 'sticky', top: 0, background: 'rgba(2,6,23,0.98)', backdropFilter: 'blur(20px)', padding: '25px 15px', borderBottom: '1px solid rgba(16,185,129,0.3)', zIndex: 100, boxShadow: '0 4px 30px rgba(16,185,129,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>{securityStatus}</div>
          <div onClick={handleGhostTap} style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))', border: '1px solid rgba(16,185,129,0.4)', color: '#10b981', padding: '8px 14px', borderRadius: '20px', fontSize: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>👻 Ghost</div>
        </div>
        <div style={{ fontFamily: 'Amiri, serif', fontSize: '36px', color: '#10b981', marginBottom: '8px', textAlign: 'center', cursor: 'pointer', textShadow: '0 0 20px rgba(16,185,129,0.5)' }} onClick={handleGhostTap}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
        <div style={{ fontFamily: 'Amiri, serif', fontSize: '18px', color: 'rgba(16,185,129,0.8)', textAlign: 'center', marginBottom: '12px', cursor: 'pointer' }} onClick={handleGhostTap}>اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
        <div style={{ fontSize: '16px', color: '#10b981', letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'center', fontWeight: '700', marginBottom: '5px' }}>DREAM OS V14.0</div>
        <div style={{ fontSize: '11px', color: 'rgba(148,163,184,0.8)', textAlign: 'center' }}>Welcome, <span style={{ color: '#10b981', fontWeight: '700' }}>{user}</span> {neural.status === 'LEARNING' && '🧠'}</div>
      </header>

      {/* ✨ Carousel */}
      <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.9))', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '24px', padding: '20px', margin: '20px 15px', boxShadow: '0 8px 32px rgba(16,185,129,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div style={{ color: '#10b981', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>📅 {slides[currentSlide].title}</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer' }}>◀</button>
            <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '8px 14px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer' }}>▶</button>
          </div>
        </div>
        <div style={{ minHeight: '220px', background: 'linear-gradient(135deg, rgba(2,6,23,0.9), rgba(15,23,42,0.8))', borderRadius: '18px', padding: '25px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16,185,129,0.1)' }}>
          <div style={{ fontSize: '60px', marginBottom: '15px' }}>{slides[currentSlide].icon}</div>
          <div style={{ color: '#10b981', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{slides[currentSlide].content.split('\n')[0]}</div>
          <div style={{ color: 'rgba(148,163,184,0.8)', fontSize: '14px' }}>{slides[currentSlide].content.split('\n')[1]}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '18px' }}>
          {slides.map((_, i) => (<button key={i} onClick={() => setCurrentSlide(i)} style={{ width: '10px', height: '10px', borderRadius: '50%', border: '2px solid rgba(16,185,129,0.4)', background: i === currentSlide ? '#10b981' : 'transparent', cursor: 'pointer' }} />))}
        </div>
      </div>

      {/* ✨ Module Grid with Neural Tracking */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', padding: '15px' }}>
        {modules.map((mod) => (
          <div key={mod.id} onClick={() => handleModuleClick(mod.id, mod.path)} style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '28px', padding: '25px 15px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', backdropFilter: 'blur(10px)' }}>
            <div style={{ width: '64px', height: '64px', margin: '0 auto 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>{mod.icon}</div>
            <div style={{ fontSize: '10px', color: 'rgba(16,185,129,0.9)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px' }}>{mod.name}</div>
            {neural.modules[mod.id] > 0 && <div style={{ fontSize: '8px', color: 'rgba(16,185,129,0.5)', marginTop: '4px' }}>{neural.modules[mod.id]}x accessed</div>}
          </div>
        ))}
      </div>
      {/* ✨ Baby AI FAB */}
      <button onClick={() => setShowAI(true)} style={{ position: 'fixed', bottom: '90px', right: '20px', width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', border: '2px solid rgba(16,185,129,0.4)', color: 'white', fontSize: '26px', cursor: 'pointer', boxShadow: '0 8px 32px rgba(16,185,129,0.4)', zIndex: 999, transition: 'all 0.3s' }}>🤖</button>

      {/* Baby AI Modal */}
      {showAI && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.95)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: 'linear-gradient(135deg, #0f172a, #020617)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '24px', width: '90%', maxWidth: '500px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(16,185,129,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#10b981', margin: 0, fontSize: '16px', fontWeight: '700' }}>🤖 Neural AI Assistant</h3>
              <button onClick={() => setShowAI(false)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', maxHeight: '400px' }}>
              {aiMessages.length === 0 && <div style={{ color: 'rgba(148,163,184,0.7)', textAlign: 'center', padding: '40px 20px' }}>Assalamualaikum! Saya Neural AI Assistant. Saya belajar dari pola Anda! 🧠</div>}
              {aiMessages.map((msg, i) => (
                <div key={i} style={{ marginBottom: '15px', padding: '14px 18px', borderRadius: '16px', maxWidth: '80%', background: msg.role === 'ai' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.2)', marginLeft: msg.role === 'user' ? 'auto' : '0' }}>
                  <span style={{ color: msg.role === 'ai' ? '#10b981' : '#3b82f6', fontSize: '10px', fontWeight: '700', display: 'block', marginBottom: '6px' }}>{msg.role === 'ai' ? '🤖 AI' : '👤 YOU'}</span>
                  <p style={{ color: '#e2e8f0', fontSize: '13px', margin: 0 }}>{msg.text}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: '20px', borderTop: '1px solid rgba(16,185,129,0.2)', display: 'flex', gap: '10px' }}>
              <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAIMessage()} placeholder="Tanya sesuatu..." style={{ flex: 1, background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', padding: '14px 18px', color: '#e2e8f0', outline: 'none', fontSize: '14px' }} />
              <button onClick={handleAIMessage} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '14px 24px', borderRadius: '14px', fontWeight: '700', cursor: 'pointer' }}>Kirim</button>
            </div>
          </div>
        </div>
      )}

      {/* ✨ Bottom Navigation */}
      <nav style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', height: '75px', background: 'rgba(2,6,23,0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(16,185,129,0.3)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000, boxShadow: '0 -4px 30px rgba(16,185,129,0.1)' }}>
        <button onClick={() => handleNav('home')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: activeNav === 'home' ? '#10b981' : 'rgba(148,163,184,0.7)', background: activeNav === 'home' ? 'rgba(16,185,129,0.15)' : 'none', border: 'none', fontSize: '9px', padding: '10px 14px', borderRadius: '14px', cursor: 'pointer', minWidth: '60px' }}><span style={{ fontSize: '22px', marginBottom: '4px' }}>🏠</span><span>Home</span></button>
        <button onClick={() => handleNav('profile')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: activeNav === 'profile' ? '#10b981' : 'rgba(148,163,184,0.7)', background: activeNav === 'profile' ? 'rgba(16,185,129,0.15)' : 'none', border: 'none', fontSize: '9px', padding: '10px 14px', borderRadius: '14px', cursor: 'pointer', minWidth: '60px' }}><span style={{ fontSize: '22px', marginBottom: '4px' }}>👤</span><span>Profile</span></button>
        <button onClick={() => handleNav('qr')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: activeNav === 'qr' ? '#10b981' : 'rgba(148,163,184,0.7)', background: activeNav === 'qr' ? 'rgba(16,185,129,0.15)' : 'none', border: 'none', fontSize: '9px', padding: '10px 14px', borderRadius: '14px', cursor: 'pointer', minWidth: '60px' }}><span style={{ fontSize: '22px', marginBottom: '4px' }}>📷</span><span>QR</span></button>
        <button onClick={() => handleNav('alerts')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: activeNav === 'alerts' ? '#10b981' : 'rgba(148,163,184,0.7)', background: activeNav === 'alerts' ? 'rgba(16,185,129,0.15)' : 'none', border: 'none', fontSize: '9px', padding: '10px 14px', borderRadius: '14px', cursor: 'pointer', minWidth: '60px' }}><span style={{ fontSize: '22px', marginBottom: '4px' }}>🔔</span><span>Alerts</span></button>
        <button onClick={() => handleNav('settings')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: activeNav === 'settings' ? '#10b981' : 'rgba(148,163,184,0.7)', background: activeNav === 'settings' ? 'rgba(16,185,129,0.15)' : 'none', border: 'none', fontSize: '9px', padding: '10px 14px', borderRadius: '14px', cursor: 'pointer', minWidth: '60px' }}><span style={{ fontSize: '22px', marginBottom: '4px' }}>⚙️</span><span>Settings</span></button>
      </nav>
    </div>
  );
}
