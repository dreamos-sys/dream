'use client';

import Link from 'next/link';
import { useGhostStore } from '@/lib/ghost/store';

type Module = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

interface ModuleGridProps {
  modules: Module[];
}

export const ModuleGrid = ({ modules }: ModuleGridProps) => {
  const { active: ghostActive } = useGhostStore();

  const filtered = modules.filter(m => {
    if (m.id === 'ghost' && !ghostActive) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {filtered.map((mod) => (
        <Link
          key={mod.id}
          href={mod.id === 'ghost' && !ghostActive ? '#' : `/${mod.id}`}
          className={`group relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-6 text-center transition-all duration-300 hover:scale-105 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] focus:outline-none focus:ring-2 focus:ring-emerald-400`}
        >
          <i className={`fas ${mod.icon} text-3xl text-emerald-400 mb-3 block`}></i>
          <h3 className="font-semibold text-white">{mod.name}</h3>
          <p className="text-xs text-slate-400 mt-1">{mod.description}</p>
          {mod.id === 'ghost' && !ghostActive && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
              <span className="text-xs text-emerald-400">🔒 Ghost Mode</span>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};
