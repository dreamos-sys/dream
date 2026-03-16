// ===== shared/services/index.js =====
import { config, sha256 } from './config.js';
import { auth } from './auth.js';
import { toast } from './toast.js';

export const services = {
  config,
  crypto: { sha256 },
  auth,
  toast
};

export async function initServices() {
  console.log('[Services] Initialized');
  // Bisa tambah inisialisasi lain (misal cek session)
}
export const services = {
  toast: (msg, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    const container = document.getElementById('toast-container');
    if (container) {
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } else {
      alert(msg);
    }
  }
};

export async function initServices() {
  console.log('✅ Shared services initialized');
}
