"use client";
import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, FileEdit, AlertTriangle, Shield, 
  Brush, TreeDeciduous, Box, Wrench, Database, 
  CloudSync, Settings, MonitorPlay, Mic, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SovereignUniversalGrid = () => {
  const [isTV, setIsTV] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setIsTV(window.innerWidth / window.innerHeight > 1.2);
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white p-4 md:p-10 font-sans selection:bg-gold/30 overflow-hidden relative">
      {/* Golden Aura Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gold/5 blur-[120px] pointer-events-none" />

      {/* Apple Style Header */}
      <header className="mb-8 flex justify-between items-end z-10 relative">
        <div>
          <h1 className="text-2xl md:text-5xl font-black text-gold tracking-tighter drop-shadow-gold uppercase">Dream OS</h1>
          <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Sovereign v2.1 • Apple Grid Model</p>
        </div>
        <div className="text-right">
          <div className="text-xl md:text-3xl font-light tracking-widest text-gold/80">{time}</div>
          <div className="text-[8px] text-emerald-400 font-mono">SYSTEM ACTIVE: 100%</div>
        </div>
      </header>

      {/* THE BENTO GRID (Apple Grid Model) */}
      <div className="grid grid-cols-3 md:grid-cols-6 grid-rows-4 md:grid-rows-2 gap-4 h-[70vh] z-10 relative">
        
        {/* Large Item: Command Center */}
        <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 row-span-2 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-6 flex flex-col justify-between group hover:border-gold/50 transition-all shadow-2xl">
          <LayoutDashboard className="w-12 h-12 text-gold drop-shadow-gold" />
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-gold uppercase">Command Center</h3>
            <p className="text-[9px] text-white/30 mt-1">MAIN SYSTEM NEURAL HUB</p>
          </div>
        </motion.div>

        {/* Medium: Security & Monitoring */}
        <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 row-span-2 bg-emerald-500/10 backdrop-blur-2xl rounded-[40px] border border-emerald-500/20 p-6 flex flex-col items-center justify-center group hover:border-emerald-400 transition-all">
          <Shield className="w-10 h-10 text-emerald-400 mb-4" />
          <span className="text-[9px] font-bold text-emerald-400/60 uppercase">Security</span>
        </motion.div>

        {/* The Rest: Standard Bento Items */}
        {[
          { name: 'Form', icon: FileEdit },
          { name: 'K3', icon: AlertTriangle },
          { name: 'Janitor', icon: Brush },
          { name: 'Stock', icon: Box },
          { name: 'Service', icon: Wrench },
          { name: 'Asset', icon: Database },
          { name: 'Backup', icon: CloudSync },
          { name: 'TV Box', icon: MonitorPlay },
          { name: 'Config', icon: Settings },
        ].map((m, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-xl rounded-[30px] border border-white/10 flex flex-col items-center justify-center group hover:bg-gold/5 transition-all cursor-pointer">
            <m.icon className="w-6 h-6 text-gold/60 group-hover:text-gold" />
            <span className="text-[8px] mt-2 font-bold text-white/20 group-hover:text-gold uppercase tracking-tighter">{m.name}</span>
          </motion.div>
        ))}

      </div>

      {/* Baby AI Neural Mic */}
      <footer className="mt-10 flex justify-center z-10 relative">
        <motion.button whileTap={{ scale: 0.9 }} className="p-4 bg-gold/10 rounded-full border border-gold/20 group">
          <Mic className="text-gold group-hover:animate-pulse" />
        </motion.button>
      </header>

      <style jsx global>{`
        .text-gold { color: #FFD700; }
        .drop-shadow-gold { filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.4)); }
      `}</style>
    </div>
  );
};
