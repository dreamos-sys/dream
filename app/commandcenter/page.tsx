'use client';

import { useState, useEffect } from 'react';
import { BismillahBanner } from '@/components/spiritual/BismillahBanner';

export default function CommandCenterPage() {
  const [clock, setClock] = useState('');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString('id-ID'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-dream-900 text-neutral-100">
      <BismillahBanner className="sticky top-0 z-50" />
      
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        <header className="bg-cc-bg border border-cc-border rounded-xl p-4 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dream-500/10 to-transparent animate-cc-sweep" />
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dream-500 to-blue-500 flex items-center justify-center text-xl">🚀</div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-dream-400 to-blue-400 bg-clip-text text-transparent">
                  Command Center <span className="text-sm font-normal">v3.0</span>
                </h1>
                <p className="text-xs text-neutral-400">Master Control · Real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-red-500 rounded-full text-xs font-bold text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-cc-pulse" /> LIVE
              </span>
              <span className="font-mono text-sm bg-neutral-800/50 px-3 py-1 rounded-lg">{clock}</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Total', 'Booking', 'K3', 'Dana'].map((label) => (
            <div key={label} className="bg-neutral-800/40 border border-cc-border rounded-xl p-3 text-center">
              <div className="font-mono text-xl font-bold text-dream-400">—</div>
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <nav className="flex gap-1 border-b border-dream-700/30 overflow-x-auto pb-0.5">
          {['Dashboard', 'Ruang Kerja', 'Dana', 'SPJ', 'Approval'].map((tab) => (
            <button key={tab} className="px-4 py-2 rounded-t-lg font-bold text-xs whitespace-nowrap bg-neutral-800/30 text-neutral-400">{tab}</button>
          ))}
        </nav>

        <div className="bg-cc-bg border border-cc-border rounded-xl p-6 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-3">🔧</div>
            <p className="text-neutral-300 font-bold">Command Center v3.0</p>
            <p className="text-neutral-500 text-sm mt-1">Module loading... (Coming Soon)</p>
            <p className="text-dream-400 text-xs mt-3">Bismillah bi idznillah 💚</p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {['Backup', 'Export', 'Refresh', 'Diagnostic', 'Dana Baru', 'SPJ Baru'].map((action) => (
            <button key={action} className="bg-neutral-800/50 border border-cc-border rounded-lg px-3 py-2 text-xs font-bold text-neutral-300 hover:bg-dream-500/10 hover:border-dream-500 transition-colors">{action}</button>
          ))}
        </div>
      </div>

      <footer className="text-center py-4 text-xs text-neutral-500 border-t border-dream-700/30 mt-6">
        <p>Dream Team © 2026 · ISO 27001 · Command Center Master v3.0</p>
        <p className="mt-1 text-dream-400">Bismillah bi idznillah 💚</p>
      </footer>
    </main>
  );
}
