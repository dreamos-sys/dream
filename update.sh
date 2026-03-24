#!/data/data/com.termux/files/usr/bin/bash

# --- DREAM OS AUTO-DEPLOYER v13.2 ---
echo "🚀 [SYSTEM] Memulai Prosedur Imunisasi & Update..."

# 1. Pastikan di folder yang benar
cd ~/dream-os

# 2. Inisialisasi Git jika hilang (Self-Healing)
if [ ! -d ".git" ]; then
    echo "🔧 [KERNEL] Folder .git tidak ditemukan. Melakukan inisialisasi ulang..."
    git init
    git branch -m main
    git remote add origin https://github.com/dreamos-sys/dream-os-v2.-1.git
fi

# 3. Update Remote (Just in case berubah)
git remote set-url origin https://github.com/dreamos-sys/dream-os-v2.-1.git

# 4. Prosedur Push (Bismillah)
echo "📦 [GIT] Mengemas semua modul Dream OS..."
git add .
git commit -m "Auto-Update Dream OS v13.2: $(date '+%Y-%m-%d %H:%M:%S')"
echo "📤 [CLOUD] Mendorong kode ke dreamos-sys.github.io..."
git push -u origin main --force

echo "✅ [SUCCESS] Kode berhasil mengudara, Master M! Silakan cek browser."
