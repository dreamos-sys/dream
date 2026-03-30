"use client";
import React, { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const modules = [
  { name: 'COMMAND CENTER', icon: 'LayoutDashboard' },
  { name: 'FORM BOOKING', icon: 'FileEdit' },
  { name: 'K3 SYSTEM', icon: 'AlertTriangle' },
  { name: 'SEKURITI', icon: 'Shield' },
  { name: 'JANITOR INDOOR', icon: 'Brush' },
  { name: 'JANITOR OUTDOOR', icon: 'TreeDeciduous' },
  { name: 'STOK GUDANG', icon: 'Box' },
  { name: 'MAINTENANCE', icon: 'Wrench' },
  { name: 'ASSET MANAGEMENT', icon: 'Database' },
  { name: 'BACKUP DATA', icon: 'CloudSync' },
  { name: 'SYSTEM CONFIG', icon: 'Settings' },
  { name: 'SMART HUB TV', icon: 'MonitorPlay' },
];

export const SovereignUniversalGrid = () => {
  const [isTV, setIsTV] = useState(false);

  useEffect(() => {
    setIsTV(window.innerWidth / window.innerHeight > 1.2);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-4 md:p-10 font-sans overflow-hidden selections:bg-gold/30">
      
      {/* Aura Hologram */}
      <div className="absolute top-0 left-0 w-full h-full bg-gold/5 blur-[150px] pointer-events-none z-0"></div>

      <header className="mb-10 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-black text-[#FFD700] uppercase tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
          Dream OS v2.1
        </h1>
        <p className="text-[10px] text-white/30 tracking-[0.5em] mt-2 uppercase italic">Sovereign Edition • Neural Integrated</p>
      </header>

      {/* Grid 6x2 TV / 3x4 Mobile */}
      <div className={`grid gap-4 md:gap-6 w-full max-w-7xl relative z-10 ${isTV ? 'grid-cols-6' : 'grid-cols-3'}`}>
        {modules.map((m, i) => {
          const IconComp = (Icons as any)[m.icon] || Icons.HelpCircle;
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10, backgroundColor: 'rgba(255, 215, 0, 0.1)', zIndex: 20 }}
              whileTap={{ scale: 0.95 }}
              className="group aspect-square flex flex-col items-center justify-center bg-white/5 rounded-[25px] md:rounded-[35px] border border-white/10 transition-all shadow-2xl outline-none focus:ring-2 focus:ring-[#FFD700]"
            >
              <IconComp className="w-10 h-10 md:w-16 md:h-16 mb-3 text-[#FFD700] group-hover:drop-shadow-[0_0_12px_#FFD700] transition-all" />
              <span className="text-[7px] md:text-[10px] font-bold text-white/50 group-hover:text-white uppercase text-center px-1 tracking-tighter">
                {m.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
