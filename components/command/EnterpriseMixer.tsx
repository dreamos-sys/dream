"use client";
import React, { useState } from 'react';

export const EnterpriseMixer = () => {
  const [masterVolume, setMasterVolume] = useState(100);
  
  const modules = [
    { id: 'ops', name: 'Operations', color: 'text-pink-500', sub: ['Janitor', 'Maint'] },
    { id: 'sec', name: 'Security', color: 'text-emerald-500', sub: ['Security', 'K3'] },
    { id: 'ast', name: 'Asset', color: 'text-blue-500', sub: ['Inv', 'Gudang', 'Stok'] },
    { id: 'adm', name: 'Admin', color: 'text-amber-500', sub: ['Booking', 'CC'] },
  ];

  return (
    <div className="ios-card bg-slate-900 text-white p-6 rounded-[30px] shadow-2xl border border-emerald-500/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold tracking-widest text-emerald-400">🎚️ MASTER MIXER v2.1</h3>
        <div className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full animate-pulse">
          LIVE SYNC
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 h-48 mb-6">
        {modules.map((m) => (
          <div key={m.id} className="flex flex-col items-center">
            <div className="flex-1 w-2 bg-slate-800 rounded-full relative overflow-hidden">
              <div 
                className="absolute bottom-0 w-full bg-emerald-500 transition-all duration-500" 
                style={{ height: `${Math.random() * 60 + 40}%` }}
              ></div>
            </div>
            <span className={`text-[8px] mt-2 font-bold ${m.color}`}>{m.id.toUpperCase()}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-400 w-12">MASTER</span>
          <input 
            type="range" 
            className="flex-1 accent-emerald-500" 
            value={masterVolume} 
            onChange={(e) => setMasterVolume(parseInt(e.target.value))}
          />
          <span className="text-[10px] font-mono w-8">{masterVolume}%</span>
        </div>
      </div>
    </div>
  );
};
