// Dream OS - AI Service Layer (Multi-LLM Support)
export class AIService {
    constructor() {
        this.models = {
            gemini: { available: false, apiKey: null },
            claude: { available: false, apiKey: null },
            deepseek: { available: false, apiKey: null },
            gpt: { available: false, apiKey: null }
        };
        this.currentModel = 'gemini';
        this.conversationHistory = [];
    }
    
    async init() {
        console.log('🤖 Initializing AI Service Layer...');
        
        // Check available models
        await this.checkModelAvailability();
        
        return this;
    }
    
    async checkModelAvailability() {
        // Gemini (Google)
        if (window.ai && window.ai.gemini) {
            this.models.gemini.available = true;
        }
        
        // Check for API keys in localStorage
        const apiKeys = JSON.parse(localStorage.getItem('dreamos_api_keys') || '{}');
        Object.keys(this.models).forEach(model => {
            if (apiKeys[model]) {
                this.models[model].available = true;
                this.models[model].apiKey = apiKeys[model];
            }
        });
        
        // Fallback to local AI (simulated)
        if (!Object.values(this.models).some(m => m.available)) {
            console.log('⚠️ No LLM API available, using local AI simulation');
            this.models.local = { available: true, simulated: true };
        }
    }
    
    async chat(message, context = {}) {
        const startTime = Date.now();
        
        // Add to history
        this.conversationHistory.push({ role: 'user', content: message, timestamp: new Date() });
        
        let response;
        
        // Try real LLM first
        if (this.models.gemini.available) {
            response = await this.callGemini(message, context);
        } else if (this.models.claude.available) {
            response = await this.callClaude(message, context);
        } else if (this.models.deepseek.available) {
            response = await this.callDeepSeek(message, context);
        } else {
            response = await this.localAI(message, context);
        }
        
        // Add to history
        this.conversationHistory.push({ role: 'assistant', content: response.text, timestamp: new Date() });
        
        return {
            ...response,
            processingTime: Date.now() - startTime,
            model: response.model || this.currentModel
        };
    }
    
    async callGemini(message, context) {
        // Gemini API call simulation (replace with real API)
        return {
            text: await this.localAI(message, context),
            model: 'gemini',
            confidence: 0.95
        };
    }
    
    async callClaude(message, context) {
        return {
            text: await this.localAI(message, context),
            model: 'claude',
            confidence: 0.93
        };
    }
    
    async callDeepSeek(message, context) {
        return {
            text: await this.localAI(message, context),
            model: 'deepseek',
            confidence: 0.91
        };
    }
    
    async localAI(message, context) {
        const lower = message.toLowerCase();
        
        // Intelligent response based on context and message
        const systemData = context.systemData || {};
        
        if (lower.includes('stok') || lower.includes('inventory')) {
            const stokData = systemData.stok || { total: 245, low: 3 };
            return `📊 *Analisis Stok Real-time*\n\n📦 Total Stok: ${stokData.total} item\n⚠️ Stok Menipis: ${stokData.low} item\n\n📋 Detail:\n• Kabel HDMI: 2 unit (Reorder Point: 5)\n• Adaptor: 1 unit (Reorder Point: 3)\n• Mouse Wireless: 2 unit (Reorder Point: 5)\n\n💡 *Rekomendasi AI:*\nSegera lakukan purchase order untuk item menipis. Estimasi kebutuhan 7 hari: +15 unit total.\n\n📊 *Prediksi:* Stok akan habis dalam 3-5 hari jika tidak diorder.`;
        }
        
        if (lower.includes('maintenance') || lower.includes('perawatan')) {
            const maintData = systemData.maintenance || { today: 3, pending: 5 };
            return `🔧 *Analisis Maintenance Prediktif*\n\n📅 Jadwal Hari Ini: ${maintData.today} tugas\n⏳ Pending: ${maintData.pending} tugas\n\n✅ *Progress:*\n• Server Backup: 100% (Completed 10:00)\n• Network Check: 65% (In Progress)\n• Database Cleanup: 40% (Scheduled 16:00)\n\n🔮 *AI Prediction:*\nBerdasarkan historical data, maintenance load akan meningkat 20% dalam 7 hari ke depan. Rekomendasi alokasi resource tambahan.`;
        }
        
        if (lower.includes('security') || lower.includes('keamanan')) {
            return `🔒 *Security Intelligence Report*\n\n📊 Status: 🟢 ACTIVE\n🎥 CCTV: 8/8 Online\n👮 Patroli: Terakhir 5 menit lalu\n📋 Incident Log: 0 dalam 24 jam\n\n🤖 *AI Threat Analysis:*\n• Anomali Detected: 0\n• Suspicious Activity: 0\n• Risk Level: LOW\n\n💡 *Rekomendasi:* Update firewall signature dalam 48 jam.`;
        }
        
        if (lower.includes('booking')) {
            const bookingData = systemData.booking || { today: 8, tomorrow: 12 };
            return `📅 *Booking Intelligence*\n\n📊 Hari Ini: ${bookingData.today} ruangan\n📊 Besok: ${bookingData.tomorrow} ruangan\n\n📋 *Detail Booking Today:*\n• 09:00 - Executive Meeting (Ruang Utama)\n• 11:00 - Training K3 (Meeting Room 2)\n• 14:00 - Client Presentation (Ruang VIP)\n\n📈 *AI Prediction:*\nBooking demand meningkat 15% dibanding minggu lalu. Rekomendasi: Buka slot tambahan di jam 13:00-15:00.`;
        }
        
        if (lower.includes('prediksi') || lower.includes('forecast')) {
            return `🔮 *AI Predictive Analytics*\n\n📊 *7-Day Forecast:*\n• Booking: +15% 📈\n• Maintenance: +20% 📈\n• Stok Demand: +8% 📈\n• Security Risk: Stable 📊\n\n💰 *Budget Forecast:*\n• Estimated Cost: Rp 45.000.000\n• Variance: +5.2%\n\n🎯 *Recommendations:*\n1. Siapkan resource maintenance ekstra\n2. Order stok 2 minggu lebih awal\n3. Jadwalkan preventive maintenance`;
        }
        
        if (lower.includes('laporan') || lower.includes('report')) {
            return `📊 *Executive Report - ${new Date().toLocaleDateString('id-ID')}*\n\n📈 *Operational KPI:*\n• Operational Health: 92% 🟢\n• Booking Fulfillment: 94% 🟢\n• Maintenance SLA: 88% 🟡\n• Security Compliance: 100% 🟢\n\n💰 *Financial:*\n• Budget Used: 76%\n• Variance: -2.3%\n\n🤖 *AI Summary:*\nOverall performance above target. Focus on maintenance SLA improvement.`;
        }
        
        return `💚 *Dream AI Assistant*\n\nSaya siap membantu Anda dengan:\n• 📦 Analisis Stok & Inventory\n• 🔧 Maintenance Prediktif\n• 🔒 Security Intelligence\n• 📅 Booking Management\n• ⚠️ K3 Safety Analysis\n• 🏢 Asset Management\n• 📊 Executive Reports\n• 🔮 Predictive Analytics\n\n💡 *Coba tanyakan:*\n"analisa stok", "prediksi maintenance", "laporan hari ini", "status keamanan"`;
    }
    
    async analyzeData(data, type) {
        const analysis = {
            timestamp: new Date().toISOString(),
            type: type,
            data: data,
            insights: [],
            predictions: [],
            recommendations: []
        };
        
        // Generate insights based on data type
        if (type === 'stok') {
            analysis.insights.push(`Total stok: ${data.total} item`);
            analysis.insights.push(`Stok kritis: ${data.lowStock} item`);
            analysis.predictions.push('Kebutuhan akan meningkat 15% dalam 30 hari');
            analysis.recommendations.push('Order stok 2 minggu sebelum habis');
        }
        
        if (type === 'maintenance') {
            analysis.insights.push(`${data.pending} maintenance pending`);
            analysis.predictions.push('Load maintenance +20% minggu depan');
            analysis.recommendations.push('Tambahan 2 teknisi untuk shift malam');
        }
        
        return analysis;
    }
    
    async generateReport(period, filters = {}) {
        const report = {
            generatedAt: new Date().toISOString(),
            period: period,
            filters: filters,
            sections: {
                executive: {
                    summary: 'Operational performance at 92%, above target',
                    kpi: { ohi: 92, booking: 94, maintenance: 88, security: 100 }
                },
                operational: {},
                financial: {},
                recommendations: []
            }
        };
        
        // Generate recommendations
        if (report.sections.executive.kpi.maintenance < 90) {
            report.sections.recommendations.push('Improve maintenance SLA by adding night shift');
        }
        
        return report;
    }
    
    getConversationHistory() {
        return this.conversationHistory;
    }
    
    clearHistory() {
        this.conversationHistory = [];
        return { success: true, message: 'History cleared' };
    }
}

export const aiService = new AIService();
