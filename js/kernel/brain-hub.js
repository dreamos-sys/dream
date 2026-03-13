/**
 * BRAIN HUB - Ghost Architect Developer Console
 * Premium Enterprise Dashboard v3.5 LUX
 * 
 * Fitur:
 * - Overview sistem (fingerprint, uptime, antibodi)
 * - Console real-time dengan log INFO/WARN/ERROR
 * - Audit trail dari Sovereign Kernel
 * - Hot-patch deployment
 * - Database inspector (localStorage/sessionStorage)
 */
class BrainHub {
    constructor() {
        this.isVisible = false;
        this.activeTab = 'overview';
        this.consoleBuffer = [];
        this.maxConsoleLines = 500;
        this.refreshInterval = null;
        this.interceptConsole();
    }

    // Menangkap console.log, warn, error
    interceptConsole() {
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;

        const addToBuffer = (level, args) => {
            const message = args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');

            this.consoleBuffer.push({
                timestamp: new Date().toLocaleTimeString(),
                level,
                message
            });

            if (this.consoleBuffer.length > this.maxConsoleLines) {
                this.consoleBuffer = this.consoleBuffer.slice(-this.maxConsoleLines);
            }
        };

        console.log = (...args) => {
            addToBuffer('INFO', args);
            originalLog.apply(console, args);
        };

        console.warn = (...args) => {
            addToBuffer('WARN', args);
            originalWarn.apply(console, args);
        };

        console.error = (...args) => {
            addToBuffer('ERROR', args);
            originalError.apply(console, args);
        };
    }

    static render() {
        if (!window.BrainHubInstance) window.BrainHubInstance = new BrainHub();
        window.BrainHubInstance.createOverlay();
    }

    createOverlay() {
        if (this.isVisible) return;
        this.isVisible = true;
        const overlay = document.createElement('div');
        overlay.id = 'brain-hub';
        overlay.innerHTML = this.getHTML();
        document.body.appendChild(overlay);
        this.bindEvents();
    }

    getHTML() {
        const diag = window.Sovereign?.getSystemDiagnostic?.() || {};
        return `
        <style>
            #brain-hub {
                position: fixed; inset: 0; z-index: 999999;
                background: #020617; color: #10b981;
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                display: flex; flex-direction: column;
            }
            .hub-header {
                background: linear-gradient(135deg, #0f172a, #1e293b);
                border-bottom: 2px solid #10b981;
                padding: 12px 16px;
                display: flex; justify-content: space-between; align-items: center;
            }
            .hub-title {
                font-size: 14px; font-weight: 700; letter-spacing: 2px;
                text-transform: uppercase;
            }
            .hub-close {
                color: #ef4444; cursor: pointer; padding: 4px 12px;
                border: 1px solid #ef4444; border-radius: 4px;
                background: rgba(239,68,68,0.1); transition: all 0.2s;
                font-weight: 700;
            }
            .hub-close:hover {
                background: rgba(239,68,68,0.2); transform: scale(1.05);
            }
            .hub-tabs {
                background: #0f172a; border-bottom: 1px solid #334155;
                display: flex; gap: 4px; padding: 8px; overflow-x: auto;
            }
            .hub-tab {
                padding: 8px 16px; border: 1px solid transparent; border-radius: 6px;
                cursor: pointer; font-size: 10px; text-transform: uppercase;
                transition: all 0.2s;
            }
            .hub-tab:hover {
                background: rgba(16,185,129,0.1); border-color: #10b981;
            }
            .hub-tab.active {
                background: rgba(16,185,129,0.2); border-color: #10b981;
                color: #10b981; font-weight: 700;
            }
            .hub-content {
                flex: 1; overflow-y: auto; padding: 16px;
            }
            .hub-grid {
                display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 12px;
            }
            .hub-card {
                background: #0f172a; border: 1px solid #334155; border-radius: 8px;
                padding: 12px;
            }
            .hub-card-title {
                font-size: 12px; font-weight: 700; color: #fff;
                margin-bottom: 8px; text-transform: uppercase;
            }
            .hub-stat {
                display: flex; justify-content: space-between;
                padding: 6px 0; border-bottom: 1px solid #1e293b;
            }
            .hub-stat:last-child { border-bottom: none; }
            .hub-stat-label { color: #94a3b8; font-size: 10px; }
            .hub-stat-value { color: #10b981; font-weight: 600; }
            .hub-console {
                background: #000; border: 1px solid #334155; border-radius: 8px;
                padding: 12px; height: 400px; overflow-y: auto;
                font-size: 10px;
            }
            .console-INFO { color: #94a3b8; }
            .console-WARN { color: #f59e0b; }
            .console-ERROR { color: #ef4444; }
            .hub-btn {
                padding: 8px 16px; border: 1px solid #10b981; border-radius: 6px;
                background: rgba(16,185,129,0.1); color: #10b981;
                cursor: pointer; font-size: 10px; font-weight: 600;
                transition: all 0.2s; margin: 4px;
            }
            .hub-btn:hover {
                background: rgba(16,185,129,0.2); transform: translateY(-2px);
            }
            .hub-btn-danger {
                border-color: #ef4444; color: #ef4444;
                background: rgba(239,68,68,0.1);
            }
            .hub-btn-danger:hover {
                background: rgba(239,68,68,0.2);
            }
            .hub-footer {
                background: #0f172a; border-top: 1px solid #334155;
                padding: 8px 16px; font-size: 9px; text-align: center;
                color: #64748b;
            }
        </style>

        <div class="hub-header">
            <div>
                <span class="hub-title">🧠 BRAIN HUB [GHOST ARCHITECT]</span>
                <div style="font-size:9px; opacity:0.7;">Sovereign Enterprise Console</div>
            </div>
            <div class="hub-close" onclick="document.getElementById('brain-hub').remove(); window.BrainHubInstance.isVisible=false;">✕ CLOSE</div>
        </div>

        <div class="hub-tabs">
            <div class="hub-tab active" data-tab="overview">📊 OVERVIEW</div>
            <div class="hub-tab" data-tab="console">💻 CONSOLE</div>
            <div class="hub-tab" data-tab="audit">📋 AUDIT</div>
            <div class="hub-tab" data-tab="hotpatch">🔧 HOT-PATCH</div>
            <div class="hub-tab" data-tab="database">🗄️ DATABASE</div>
        </div>

        <div class="hub-content" id="hub-content">
            ${this.renderOverview()}
        </div>

        <div class="hub-footer">ISO 27001 | Bi idznillah 💚</div>
        `;
    }

    renderOverview() {
        const diag = window.Sovereign?.getSystemDiagnostic?.() || {};
        return `
        <div class="hub-grid">
            <div class="hub-card">
                <div class="hub-card-title">🔒 SECURITY</div>
                <div class="hub-stat">
                    <span class="hub-stat-label">Fingerprint</span>
                    <span class="hub-stat-value">${diag.fingerprint?.substring(0,16) || 'N/A'}</span>
                </div>
                <div class="hub-stat">
                    <span class="hub-stat-label">Integrity</span>
                    <span class="hub-stat-value">${diag.integrity || 'CHECK'}</span>
                </div>
            </div>
            <div class="hub-card">
                <div class="hub-card-title">⚡ PERFORMANCE</div>
                <div class="hub-stat">
                    <span class="hub-stat-label">Uptime</span>
                    <span class="hub-stat-value">${Math.floor((Date.now() - (window.Sovereign?.bootTime || Date.now())) / 1000)}s</span>
                </div>
            </div>
            <div class="hub-card">
                <div class="hub-card-title">💊 ANTIBODY</div>
                <div class="hub-stat">
                    <span class="hub-stat-label">Threats</span>
                    <span class="hub-stat-value">${window.Sovereign?.antibody?.threats?.length || 0}</span>
                </div>
                <div class="hub-stat">
                    <span class="hub-stat-label">Healed</span>
                    <span class="hub-stat-value">${window.Sovereign?.antibody?.healed || 0}</span>
                </div>
            </div>
        </div>
        <div style="margin-top:16px;">
            <button class="hub-btn" onclick="window.BrainHubInstance.switchTab('console')">💻 BUKA CONSOLE</button>
        </div>
        `;
    }

    renderConsole() {
        const logs = this.consoleBuffer.slice(-50).reverse();
        return `
        <div style="margin-bottom:8px;">
            <button class="hub-btn" onclick="window.BrainHubInstance.clearConsole()">🗑️ CLEAR</button>
            <span class="hub-badge" style="margin-left:8px; background:rgba(239,68,68,0.2); color:#ef4444; padding:2px 6px; border-radius:4px;">
                Errors: ${logs.filter(l => l.level === 'ERROR').length}
            </span>
        </div>
        <div class="hub-console">
            ${logs.length === 0 ? '<div class="console-INFO">No logs</div>' :
                logs.map(l => `<div class="console-${l.level}">[${l.timestamp}] ${l.level}: ${l.message}</div>`).join('')
            }
        </div>
        `;
    }

    renderAudit() {
        const logs = window.Sovereign?.audit?.logs?.slice(0,20) || [];
        return `<div style="background:#000; padding:12px; border:1px solid #334155; border-radius:8px;">
            ${logs.map(l => `<div style="color:#10b981; border-bottom:1px solid #1e293b; padding:4px 0;">
                <span style="color:#94a3b8;">[${l.timestamp}]</span> ${l.action} ${JSON.stringify(l.data)}
            </div>`).join('') || 'No audit logs'}
        </div>`;
    }

    renderHotPatch() {
        return `
        <textarea id="patch-code" style="width:100%; height:200px; background:#000; color:#10b981; border:1px solid #334155; border-radius:6px; padding:8px; font-family:'JetBrains Mono'; font-size:10px;">// Tulis kode di sini</textarea>
        <button class="hub-btn" onclick="eval(document.getElementById('patch-code').value)">🚀 EXECUTE</button>
        `;
    }

    renderDatabase() {
        let html = '<div class="hub-grid">';
        html += `<div class="hub-card"><div class="hub-card-title">LOCALSTORAGE</div>${localStorage.length} keys</div>`;
        html += `<div class="hub-card"><div class="hub-card-title">SESSIONSTORAGE</div>${sessionStorage.length} keys</div>`;
        return html + '</div>';
    }

    bindEvents() {
        document.querySelectorAll('.hub-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
    }

    switchTab(tab) {
        this.activeTab = tab;
        document.querySelectorAll('.hub-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`.hub-tab[data-tab="${tab}"]`)?.classList.add('active');
        const content = document.getElementById('hub-content');
        if (tab === 'overview') content.innerHTML = this.renderOverview();
        else if (tab === 'console') content.innerHTML = this.renderConsole();
        else if (tab === 'audit') content.innerHTML = this.renderAudit();
        else if (tab === 'hotpatch') content.innerHTML = this.renderHotPatch();
        else if (tab === 'database') content.innerHTML = this.renderDatabase();
    }

    close() {
        document.getElementById('brain-hub')?.remove();
        this.isVisible = false;
    }

    clearConsole() {
        this.consoleBuffer = [];
        this.switchTab('console');
    }
}

// Ekspor ke global – PASTIKAN HANYA SATU!
window.BrainHub = BrainHub;
console.log('[BRAINHUB] 🧠 Loaded');
