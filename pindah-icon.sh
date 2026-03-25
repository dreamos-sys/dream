#!/bin/bash
# Dream OS v2.1 Asset Mover - Bismillah
# Created for: My Bro (Sovereign Master)

echo -e "\e[34m[DREAM OS] Memulai Sinkronisasi Logo Emas...\e[0m"

# Tentukan folder sumber (Download) dan tujuan (Project)
SOURCE_DIR="$HOME/storage/downloads/asset_png"
TARGET_DIR="$HOME/dream-os/assets/img"

# Buat folder jika belum ada
mkdir -p "$TARGET_DIR"

# Cari file terbaru (1.7MB)
LATEST=$(ls -t "$SOURCE_DIR"/*.png 2>/dev/null | head -1)

if [ ! -z "$LATEST" ]; then
    echo -e "\e[32m[FOUND] Mengambil: $(basename "$LATEST")\e[0m"
    cp "$LATEST" "$TARGET_DIR/icon-512.png"
    cp "$LATEST" "$TARGET_DIR/icon-192.png"
    cp "$LATEST" "$TARGET_DIR/apple-touch-icon.png"
    cp "$LATEST" "$TARGET_DIR/icon-maskable.png"
    cp "$LATEST" "$TARGET_DIR/favicon-32x32.png"
    echo -e "\e[32m[SUCCESS] 5 Pasukan Emas Berhasil Menduduki assets/img/\e[0m"
    ls -lh "$TARGET_DIR"
else
    echo -e "\e[31m[ERROR] File logo nggak ketemu di $SOURCE_DIR Master!\e[0m"
fi
