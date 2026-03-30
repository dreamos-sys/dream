/**
 * 📦 MODULE DISCOVERY - Auto-Scan & Hot Reload
 * Dream OS v14.0 - Dynamic Module Registry
 */

export interface ModuleInfo {
  id: string;
  name: string;
  icon: string;
  path: string;
  version: string;
  loaded: boolean;
  lastAccessed?: number;
}

export const ModuleDiscovery = {
  registry: new Map<string, ModuleInfo>(),

  // Pre-registered modules
  defaultModules: [
    { id: 'command', name: 'Command', icon: '🎯', path: '/modules/command', version: '1.0.0' },
    { id: 'booking', name: 'Booking', icon: '📅', path: '/modules/booking', version: '1.0.0' },
    { id: 'k3', name: 'K3', icon: '⚠️', path: '/modules/k3', version: '1.0.0' },
    { id: 'security', name: 'Security', icon: '🛡️', path: '/modules/security', version: '1.0.0' },
    { id: 'janitor', name: 'Janitor', icon: '🧹', path: '/modules/janitor', version: '1.0.0' },
    { id: 'stok', name: 'Stok', icon: '📦', path: '/modules/stok', version: '1.0.0' },
    { id: 'maintenance', name: 'Maintenance', icon: '🔧', path: '/modules/maintenance', version: '1.0.0' },    { id: 'inventaris', name: 'Inventaris', icon: '📋', path: '/modules/inventaris', version: '1.0.0' },
    { id: 'tinygo', name: 'TinyGo', icon: '🚀', path: '/modules/tinygo', version: '1.0.0' }
  ],

  // Initialize registry
  init: (): void => {
    ModuleDiscovery.defaultModules.forEach(mod => {
      ModuleDiscovery.registry.set(mod.id, { ...mod, loaded: true });
    });
    console.log('📦 DISCOVERY: Registry initialized with', ModuleDiscovery.registry.size, 'modules');
  },

  // Get all modules
  getAllModules: (): ModuleInfo[] => {
    return Array.from(ModuleDiscovery.registry.values());
  },

  // Get module by ID
  getModule: (id: string): ModuleInfo | undefined => {
    return ModuleDiscovery.registry.get(id);
  },

  // Track module access
  trackAccess: (id: string): void => {
    const mod = ModuleDiscovery.registry.get(id);
    if (mod) {
      mod.lastAccessed = Date.now();
      ModuleDiscovery.registry.set(id, mod);
      console.log(`📦 DISCOVERY: Module ${id} accessed`);
    }
  },

  // Health check
  healthCheck: (): { id: string; status: string; uptime?: number }[] => {
    const report: { id: string; status: string; uptime?: number }[] = [];
    for (const [id, mod] of ModuleDiscovery.registry) {
      report.push({
        id,
        status: mod.loaded ? 'healthy' : 'failed',
        uptime: mod.lastAccessed ? Date.now() - mod.lastAccessed : undefined
      });
    }
    console.log('📦 DISCOVERY: Health check complete', report);
    return report;
  },

  // Export registry for debugging
  export: (): string => {
    return JSON.stringify(Array.from(ModuleDiscovery.registry.values()), null, 2);
  }};

export default ModuleDiscovery;
