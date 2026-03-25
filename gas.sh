#!/bin/bash
echo "🚀 [SYSTEM] Memulai Prosedur Imunisasi & Update..."
echo "📦 [GIT] Mengemas semua modul Dream OS..."
git add .
git commit -m "Auto-Update Dream OS v13.2: $(date +'%Y-%m-%d %H:%M:%S')"
echo "📤 [CLOUD] Mendorong kode ke dreamos-sys.github.io..."
git push origin main --force
echo "✅ [SUCCESS] Kode berhasil mengudara, Master M! Silakan cek browser."
