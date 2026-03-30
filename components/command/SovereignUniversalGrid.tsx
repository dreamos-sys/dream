"use client";

import React, { useEffect, useState, useRef } from 'react';
import { 
  LayoutDashboard, FileEdit, Warehouse, 
  Boxes, ShieldCheck, Camera, 
  Fingerprint, ClipboardList, History, CloudSync, Settings, MonitorPlay, Mic
} from 'lucide-react';
import { NeuralCoordinator } from '@/lib/neural/NeuralCoordinator';
import { VoiceEngine } from '@/lib/neural/VoiceEngine';

export const SovereignUniversalGrid = () => {
  const [isTV, setIsTV] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [systemState, setSystemState] = useState<any>(null);
  const idleTimer = useRef<any>(null);

  const modules = [
    { id: 1, name: 'Dashboard', icon: LayoutDashboard, color: 'text-gold' },
    { id: 2, name: 'Form Mgmt', icon: FileEdit, color: 'text-gold' },
    { id: 3, name: 'Inventory', icon: Warehouse, color: 'text-gold' },
    { id: 4, name: 'Stock', icon: Boxes, color: 'text-gold' },
    { id: 5, name: 'Approval', icon: ShieldCheck, color: 'text-emerald-400' },
    { id: 6, name: 'Surveillance', icon: Camera, color: 'text-gold' },
    { id: 7, name: 'Security', icon: Fingerprint, color: 'text-gold' },
    { id: 8, name: 'Reports', icon: ClipboardList, color: 'text-gold' },
    { id: 9, name: 'Audit', icon: History, color: 'text-gold' },
    { id: 10, name: 'Backup', icon: CloudSync, color: 'text-gold' },
    { id: 11, name: 'Config', icon: Settings, color: 'text-gold' },
    { id: 12, name: 'Idle View', icon: MonitorPlay, color: 'text-gold' },
  ];

  const slides = [
    "Bismillah bi idznillah",
    "Neural Core Integrated",
    "Sovereign Intelligence v3.0",
    "Dream Team Sibling System",
    "Out of The Box Inside",
    "Global Sovereign Power",
    "The Power Soul Of Shalawat"
  ];

  const resetIdleTimer = () => {
    setIsIdle(false);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsIdle(true), 60000);
  };

  useEffect(() => {
    const runSync = () => {
      setIsTV(window.innerWidth / window.innerHeight > 1.3);
      NeuralCoordinator.syncProcess((data) => setSystemState(data));
    };
    runSync();
    resetIdleTimer();
    const slideInt = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(slideInt);
  }, []);

  if (isIdle) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 animate-pulse-slow" onClick={resetIdleTimer}>
        <div className="relative">
          <div className="absolute inset-0 bg-gold/10 blur-[120px] rounded-full animate-blob"></div>
          <h1 className="relative text-gold text-5xl md:text-8xl font-black tracking-tighter uppercase text-center drop-shadow-[0_0_35px_rgba(255,215,0,0.4)]">
            {slides[currentSlide]}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* 🧬 Neural Aura Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[150px] animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[150px] animate-blob animation-delay-2000"></div>

      <header className="mb-12 text-center z-10">
        <h2 className="text-4xl md:text-6xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-white to-gold/40 uppercase">Dream OS</h2>
        <div className="h-1 w-24 bg-gold mx-auto mt-2 rounded-full shadow-[0_0_15px_#FFD700]"></div>
      </header>

      {/* 🎚️ 3D PERSPECTIVE GRID */}
      <div className={`grid gap-6 md:gap-10 w-full max-w-7xl perspective-[1200px] transition-all duration-1000
        ${isTV ? 'grid-cols-6' : 'grid-cols-3'}`}>
        {modules.map((m) => (
          <button
            key={m.id}
            tabIndex={0}
            className="
              group relative aspect-square flex flex-col items-center justify-center
              bg-white/[0.03] backdrop-blur-2xl rounded-[40px]
              border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]
              transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1)
              
              /* 🛰️ Future Tilt & Perspective Logic */
              hover:rotate-x-12 hover:rotate-y-12 hover:scale-110 hover:z-20
              focus:rotate-x-12 focus:rotate-y-12 focus:scale-110 focus:z-20
              hover:border-gold/40 hover:bg-gold/5 focus:outline-none
              hover:shadow-[0_0_40px_rgba(255,215,0,0.2)]
            "
          >
            <m.icon className={`w-10 h-10 md:w-16 md:h-16 mb-4 transition-all duration-500 group-hover:translate-z-10 ${m.color} drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]`} />
            <span className="text-[9px] md:text-xs font-black text-white/40 group-hover:text-gold uppercase tracking-[0.2em]">{m.name}</span>
            
            {/* 🧬 Holographic Light Bar */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold group-hover:w-1/2 transition-all duration-500 shadow-[0_0_10px_#FFD700]"></div>
          </button>
        ))}
      </div>

      <footer className="mt-16 z-10 flex flex-col items-center gap-4">
        <div className="flex gap-4 text-[10px] font-mono text-white/20 tracking-[0.5em] uppercase">
          <span>{systemState?.sensors.net.online ? 'Core: Online' : 'Core: Offline'}</span>
          <span>|</span>
          <span>Sync: v2.5.Holo</span>
        </div>
        <Mic className="text-gold/30 w-6 h-6 animate-pulse" />
      </footer>

      <style jsx global>{`
        .text-gold { color: #FFD700; }
        .rotate-x-12 { transform: rotateX(12deg); }
        .rotate-y-12 { transform: rotateY(12deg); }
        .perspective-1200 { perspective: 1200px; }
        .translate-z-10 { transform: translateZ(20px); }
        
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite alternate; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};
