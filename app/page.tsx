'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const MODULES = [
  { id: 'command', name: 'Command', icon: '🎯', color: 'from-purple-500 to-purple-600', href: '/commandcenter' },
  { id: 'booking', name: 'Booking', icon: '📅', color: 'from-blue-500 to-blue-600', href: '/dream' },
  { id: 'k3', name: 'K3', icon: '⚠️', color: 'from-amber-500 to-amber-600', href: '/dream' },
  { id: 'security', name: 'Security', icon: '🛡️', color: 'from-emerald-500 to-emerald-600', href: '/dream' },
  { id: 'janitor', name: 'Janitor', icon: '🧹', color: 'from-pink-500 to-pink-600', href: '/dream' },
  { id: 'stok', name: 'Stok', icon: '📦', color: 'from-orange-500 to-orange-600', href: '/dream' },
  { id: 'maintenance', name: 'Maintenance', icon: '🔧', color: 'from-cyan-500 to-cyan-600', href: '/dream' },
  { id: 'inventaris', name: 'Inventaris', icon: '📋', color: 'from-indigo-500 to-indigo-600', href: '/dream' },
  { id: 'gudang', name: 'Gudang', icon: '🏭', color: 'from-red-500 to-red-600', href: '/dream' },
];

export default function HomePage() {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Selamat Pagi');
    else if (hour < 15) setGreeting('Selamat Siang');
    else if (hour < 18) setGreeting('Selamat Sore');
    else setGreeting('Selamat Malam');

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="ios-header">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">{currentTime}</p>
            <h1 className="text-lg font-bold text-gray-900">Dream OS</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">D</div>
        </div>
      </header>

      {/* Welcome Card */}      <div className="ios-welcome">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-1">{greeting}</p>
            <h2 className="text-2xl font-bold mb-2">Dream OS v2.1</h2>
            <p className="text-blue-100 text-sm">Welcome, Developer</p>
          </div>
          <div className="text-4xl">👋</div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="ios-module-grid">
        {MODULES.map((module) => (
          <Link key={module.id} href={module.href} className="ios-module-item group">
            <div className={`ios-module-icon bg-gradient-to-br ${module.color} group-active:scale-90 transition-transform`}>
              {module.icon}
            </div>
            <span className="ios-module-label">{module.name}</span>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="px-4 mt-2">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Stats</h3>
        <div className="ios-stats-grid">
          <div className="ios-stat-card">
            <div className="ios-stat-value">12</div>
            <div className="ios-stat-label">Pending</div>
          </div>
          <div className="ios-stat-card">
            <div className="ios-stat-value">8</div>
            <div className="ios-stat-label">Completed</div>
          </div>
          <div className="ios-stat-card">
            <div className="ios-stat-value">3</div>
            <div className="ios-stat-label">Urgent</div>
          </div>
          <div className="ios-stat-card">
            <div className="ios-stat-value">98%</div>
            <div className="ios-stat-label">Success</div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <nav className="ios-tab-bar">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 p-2 text-blue-500">            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-semibold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-semibold">Profile</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xl">🔳</span>
            <span className="text-[10px] font-semibold">QR</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xl">🔔</span>
            <span className="text-[10px] font-semibold">Alerts</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xl">⚙️</span>
            <span className="text-[10px] font-semibold">Settings</span>
          </button>
        </div>
      </nav>
    </main>
  );
}
