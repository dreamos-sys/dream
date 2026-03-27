// Dream OS - Real-time Sync Service
export class SyncService {
    constructor() {
        this.supabase = null;
        this.listeners = new Map();
        this.offlineQueue = [];
        this.isOnline = navigator.onLine;
    }
    
    async init(supabaseClient) {
        this.supabase = supabaseClient;
        
        // Monitor online status
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
        
        // Load offline queue
        this.loadOfflineQueue();
        
        console.log('🔄 Sync Service initialized');
        return this;
    }
    
    handleOnline() {
        this.isOnline = true;
        console.log('🟢 Online - Syncing offline data...');
        this.syncOfflineQueue();
    }
    
    handleOffline() {
        this.isOnline = false;
        console.log('🔴 Offline - Queueing changes...');
    }
    
    async sync(table, data, action = 'upsert') {
        if (!this.supabase) {
            console.warn('No Supabase client');
            return;
        }
        
        if (!this.isOnline) {
            this.queueOffline({ table, data, action });
            return { offline: true, queued: true };
        }
        
        try {
            let result;
            switch(action) {
                case 'insert':
                    result = await this.supabase.from(table).insert(data);
                    break;
                case 'update':
                    result = await this.supabase.from(table).update(data).eq('id', data.id);
                    break;
                case 'delete':
                    result = await this.supabase.from(table).delete().eq('id', data.id);
                    break;
                default:
                    result = await this.supabase.from(table).upsert(data);
            }
            
            if (result.error) throw result.error;
            
            // Notify listeners
            this.notifyListeners(table, action, data);
            
            return { success: true, data: result.data };
        } catch (error) {
            console.error('Sync error:', error);
            this.queueOffline({ table, data, action });
            return { error: error.message, offline: true };
        }
    }
    
    queueOffline(operation) {
        this.offlineQueue.push({
            ...operation,
            timestamp: new Date().toISOString()
        });
        this.saveOfflineQueue();
        console.log(`📦 Queued offline operation: ${operation.table}`);
    }
    
    async syncOfflineQueue() {
        if (this.offlineQueue.length === 0) return;
        
        console.log(`🔄 Syncing ${this.offlineQueue.length} offline operations...`);
        
        const results = [];
        for (const op of this.offlineQueue) {
            const result = await this.sync(op.table, op.data, op.action);
            results.push(result);
        }
        
        // Clear synced queue
        this.offlineQueue = [];
        this.saveOfflineQueue();
        
        console.log(`✅ Synced ${results.length} operations`);
        return results;
    }
    
    saveOfflineQueue() {
        localStorage.setItem('dreamos_offline_queue', JSON.stringify(this.offlineQueue));
    }
    
    loadOfflineQueue() {
        const saved = localStorage.getItem('dreamos_offline_queue');
        if (saved) {
            this.offlineQueue = JSON.parse(saved);
            console.log(`📦 Loaded ${this.offlineQueue.length} offline operations`);
        }
    }
    
    subscribe(table, callback) {
        if (!this.listeners.has(table)) {
            this.listeners.set(table, []);
        }
        this.listeners.get(table).push(callback);
        
        // Setup realtime subscription if supabase available
        if (this.supabase && this.isOnline) {
            this.supabase
                .channel(`realtime:${table}`)
                .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
                    this.notifyListeners(table, payload.eventType, payload.new);
                })
                .subscribe();
        }
        
        return () => this.unsubscribe(table, callback);
    }
    
    notifyListeners(table, action, data) {
        const listeners = this.listeners.get(table) || [];
        listeners.forEach(cb => cb({ action, data, timestamp: new Date() }));
    }
    
    unsubscribe(table, callback) {
        const listeners = this.listeners.get(table) || [];
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
    }
    
    getStatus() {
        return {
            online: this.isOnline,
            queueSize: this.offlineQueue.length,
            listeners: Object.fromEntries(this.listeners.entries())
        };
    }
}

export const syncService = new SyncService();
