/* ============================================
   🕌 DREAM OS 2026 - PRAYER TIME UTILITY
   Islamic Integration - FIXED VERSION
   ============================================ */

(function() {
    // Pastikan DREAM object dan utils tersedia
    if (typeof window.DREAM === 'undefined') {
        console.error('[PRAYER] DREAM not available');
        return;
    }
    
    if (!window.DREAM.utils) window.DREAM.utils = {};
    
    class PrayerTimeUtility {
        constructor() {
            // Fallback jika config belum siap
            this.api = 'https://api.aladhan.com/v1/timingsByCity'; // Default API
            this.cache = null;
            this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 jam
            this.location = { city: 'Jakarta', country: 'Indonesia' };
            
            // Data default untuk fallback
            this.defaultTimes = {
                Fajr: '04:30',
                Dhuhr: '12:05',
                Asr: '15:20',
                Maghrib: '18:00',
                Isha: '19:15'
            };
            
            // Inisialisasi
            this.init();
        }
        
        async init() {
            // Update API dari config jika sudah tersedia
            if (window.DREAM?.config?.api?.prayerTime) {
                this.api = window.DREAM.config.api.prayerTime;
            }
            
            await this.loadFromCache();
            await this.fetchPrayerTimes();
            this.startAutoUpdate();
        }
        
        async fetchPrayerTimes() {
            try {
                const url = `${this.api}?city=${this.location.city}&country=${this.location.country}`;
                const response = await fetch(url);
                
                if (!response.ok) throw new Error('API request failed');
                
                const data = await response.json();
                this.cache = {
                    data: data.data,
                    timestamp: Date.now()
                };
                
                localStorage.setItem('dreamos-prayer-times', JSON.stringify(this.cache));
                this.updateUI();
                
            } catch (error) {
                console.warn('⚠️ [PRAYER] Failed to fetch:', error);
                this.loadFromCache();
            }
        }
        
        async loadFromCache() {
            try {
                const cached = localStorage.getItem('dreamos-prayer-times');
                if (cached) {
                    this.cache = JSON.parse(cached);
                    this.updateUI();
                }
            } catch (error) {
                console.warn('⚠️ [PRAYER] Cache load failed:', error);
            }
        }
        
        startAutoUpdate() {
            setInterval(() => this.fetchPrayerTimes(), this.cacheExpiry);
        }
        
        updateUI() {
            const timings = this.cache?.data?.timings || this.defaultTimes;
            const display = document.getElementById('prayer-time-display');
            
            if (display) {
                const nextPrayer = this.getNextPrayer(timings);
                display.textContent = `${nextPrayer.name} ${nextPrayer.time}`;
            }
        }
        
        getNextPrayer(timings) {
            const now = new Date();
            const prayers = [
                { name: 'Fajr', time: timings.Fajr || this.defaultTimes.Fajr },
                { name: 'Dhuhr', time: timings.Dhuhr || this.defaultTimes.Dhuhr },
                { name: 'Asr', time: timings.Asr || this.defaultTimes.Asr },
                { name: 'Maghrib', time: timings.Maghrib || this.defaultTimes.Maghrib },
                { name: 'Isha', time: timings.Isha || this.defaultTimes.Isha }
            ];
            
            for (const prayer of prayers) {
                const prayerTime = this.parseTime(prayer.time);
                if (prayerTime > now) {
                    return prayer;
                }
            }
            
            return prayers[0]; // Return Fajr untuk besok
        }
        
        parseTime(timeStr) {
            try {
                const [hours, minutes] = timeStr.split(':').map(Number);
                const now = new Date();
                return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            } catch (e) {
                return new Date(); // Return now jika error
            }
        }
        
        getTimes() {
            // SELALU kembalikan object, jangan null
            return this.cache?.data?.timings || this.defaultTimes;
        }
    }
    
    // Inisialisasi dan simpan ke DREAM.utils
    window.DREAM.utils.prayerTime = new PrayerTimeUtility();
    console.log('✅ [PRAYER] Utility initialized with fallback');
})();
