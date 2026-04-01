import { create } from 'zustand';

interface GhostState {
  active: boolean;
  toggle: () => void;
  activate: () => void;
  deactivate: () => void;
}

export const useGhostStore = create<GhostState>((set) => ({
  active: false,
  toggle: () => set((state) => ({ active: !state.active })),
  activate: () => set({ active: true }),
  deactivate: () => set({ active: false }),
}));
