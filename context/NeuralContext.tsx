"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const NeuralContext = createContext<any>(null);

export const NeuralProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState('INIT');
  const [immunity, setImmunity] = useState(0);

  useEffect(() => {
    // 🦾 Tiny Init
    console.log("🧬 Neural Context: Waking up Tiny & Baby AI...");
    const data = JSON.parse(localStorage.getItem('dream_vaccines') || '{}');
    setImmunity(data.immunityLevel || 0);
    setStatus('FULLY_OPERATIONAL');
  }, []);

  const emitSignal = (signal: string, data: any) => {
    console.log(`✨ Signal [${signal}]:`, data);
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  return (
    <NeuralContext.Provider value={{ status, immunity, emitSignal }}>
      {children}
    </NeuralContext.Provider>
  );
};

export const useNeural = () => useContext(NeuralContext);
