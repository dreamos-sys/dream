/**
 * 🧠 NEURAL ENGINE - AI Learning System
 * Dream OS v14.0 - Self-Learning Architecture
 */

import { useState, useEffect } from 'react';

export interface NeuralState {
  status: string;
  modules: Record<string, number>;
  lastLearned: string | null;
  patterns: string[];
}

export const useNeuralAgent = () => {
  const [state, setState] = useState<NeuralState>({
    status: 'INITIALIZING',
    modules: {},
    lastLearned: null,
    patterns: []
  });

  // Initialize Neural Network
  useEffect(() => {
    const memory = localStorage.getItem('dream_memory');
    if (memory) {
      setState({
        status: 'ACTIVE',
        modules: JSON.parse(memory).modules || {},
        lastLearned: JSON.parse(memory).lastLearned || null,
        patterns: JSON.parse(memory).patterns || []      });
    } else {
      setState(prev => ({ ...prev, status: 'ACTIVE' }));
    }
    
    console.log('🧠 NEURAL: Engine initialized');
  }, []);

  // Learn from user behavior
  const learn = (moduleId: string): void => {
    const memory = JSON.parse(localStorage.getItem('dream_memory') || '{"modules":{},"patterns":[]}');
    
    // Track module access
    memory.modules[moduleId] = (memory.modules[moduleId] || 0) + 1;
    
    // Detect patterns
    const hour = new Date().getHours();
    const pattern = `${moduleId}_${hour}`;
    if (!memory.patterns.includes(pattern)) {
      memory.patterns.push(pattern);
    }
    
    memory.lastLearned = new Date().toISOString();
    localStorage.setItem('dream_memory', JSON.stringify(memory));
    
    setState({
      status: 'LEARNING',
      modules: memory.modules,
      lastLearned: memory.lastLearned,
      patterns: memory.patterns
    });
    
    console.log(`🧠 NEURAL: Learned - User accessed ${moduleId} (${memory.modules[moduleId]} times)`);
    
    // Auto-calibration after learning
    setTimeout(() => {
      setState(prev => ({ ...prev, status: 'ACTIVE' }));
    }, 1000);
  };

  // Get recommendations based on patterns
  const getRecommendations = (): string[] => {
    const hour = new Date().getHours();
    const relevant = state.patterns.filter(p => p.includes(`_${hour}`));
    return relevant.map(p => p.split('_')[0]).slice(0, 3);
  };

  // Predict next module
  const predict = (): string | null => {
    const sorted = Object.entries(state.modules).sort((a, b) => b[1] - a[1]);    return sorted[0]?.[0] || null;
  };

  return {
    ...state,
    learn,
    getRecommendations,
    predict
  };
};

export default useNeuralAgent;
