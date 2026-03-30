"use client";
import React, { useEffect, useState } from 'react';
import { NeuralInstinct } from '@/lib/neural/instinct';

export const NeuralStatus = () => {
  const [instinct, setInstinct] = useState({ type: 'INIT', msg: 'Thinking...' });

  useEffect(() => {
    const runReasoning = async () => {
      const res = await NeuralInstinct.analyzeState();
      setInstinct(res);
    };
    runReasoning();
    const interval = setInterval(runReasoning, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`mt-6 p-5 rounded-[28px] border backdrop-blur-md transition-all duration-500 ${
      instinct.type === 'URGENT' ? 'bg-red-500/10 border-red-500/50' : 'bg-emerald-500/10 border-emerald-500/30'
    }`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-2 h-2 rounded-full animate-ping ${instinct.type === 'URGENT' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
        <span className="text-[10px] font-black tracking-widest uppercase">Neural Instinct Engine</span>
      </div>
      <p className="text-xs font-bold text-slate-200">{instinct.msg}</p>
      {instinct.type === 'URGENT' && (
        <button className="mt-3 w-full bg-red-500 text-white text-[10px] font-bold py-2 rounded-xl">RESOLVE NOW</button>
      )}
    </div>
  );
};
