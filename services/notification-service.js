// Dream OS - Push Notification Service
export class NotificationService {
    constructor() {
        this.permission = 'default';
        this.subscribers = [];
    }
    
    async init() {
        if ('Notification' in window) {
            this.permission = Notification.permission;
            console.log(`🔔 Notification permission: ${this.permission}`);
        }
        
        // Request permission on first use
        if (this.permission === 'default') {
            await this.requestPermission();
        }
        
        return this;
    }
    
    async requestPermission() {
        if (!('Notification' in window)) {
            console.warn('Notifications not supported');
            return false;
        }
        
        const permission = await Notification.requestPermission();
        this.permission = permission;
        
        if (permission === 'granted') {
            console.log('✅ Notification permission granted');
            this.notify({
                title: 'Dream OS',
                body: 'Notifications enabled! You will receive important updates.',
                icon: './assets/img/icon-192.png'
            });
        }
        
        return permission === 'granted';
    }
    
    async notify({ title, body, icon, data, actions }) {
        if (this.permission !== 'granted') {
            console.log('⚠️ Notification permission not granted');
            return false;
        }
        
        try {
            const notification = new Notification(title, {
                body,
                icon: icon || './assets/img/icon-192.png',
                data,
                actions: actions || [],
                silent: false,
                vibrate: [200, 100, 200]
            });
            
            notification.onclick = (event) => {
                event.preventDefault();
                if (data?.url) {
                    window.open(data.url, '_blank');
                }
                notification.close();
            };
            
            // Notify subscribers
            this.subscribers.forEach(cb => cb({ title, body, data }));
            
            return true;
        } catch (error) {
            console.error('Notification error:', error);
            return false;
        }
    }
    
    async scheduleNotification(title, body, delayMs, data = {}) {
        setTimeout(() => {
            this.notify({ title, body, data });
        }, delayMs);
        
        return { scheduled: true, delay: delayMs };
    }
    
    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            const index = this.subscribers.indexOf(callback);
            if (index > -1) this.subscribers.splice(index, 1);
        };
    }
    
    async sendAlert(type, details) {
        const alerts = {
            stock: { title: '⚠️ Low Stock Alert', body: `Stock kritis: ${details.item} - ${details.quantity} unit left` },
            maintenance: { title: '🔧 Maintenance Reminder', body: `Maintenance task: ${details.task} due in ${details.hours} hours` },
            booking: { title: '📅 Booking Reminder', body: `Booking: ${details.room} at ${details.time}` },
            security: { title: '🔒 Security Alert', body: `Security incident detected: ${details.incident}` }
        };
        
        const alert = alerts[type];
        if (alert) {
            await this.notify({
                title: alert.title,
                body: alert.body,
                data: details
            });
        }
    }
}

export const notificationService = new NotificationService();
