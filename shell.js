// shell.js – full version, handle navigasi, render fitur, search interaksi
// Semua fitur dari list: ai-panel, ai-speak, asset, booking, ghost, home, janitor-indoor, janitor-outdoor, k3-officer, k3, login, maintenance, prediction, profile, qr, sekuriti, settings, stok, weather

(function() {
    'use strict';

    // daftar fitur (berdasarkan list)
    const FEATURES = [
        "ai-panel", "ai-speak", "asset", "booking", "ghost", "home", 
        "janitor-indoor", "janitor-outdoor", "k3-officer", "k3", 
        "login", "maintenance", "prediction", "profile", "qr", 
        "sekuriti", "settings", "stok", "weather"
    ];

    // mapping icon (untuk tampilan grid)
    const ICON_MAP = {
        'ai-panel': '🧠', 'ai-speak': '🔊', 'asset': '💼', 'booking': '🗓️',
        'ghost': '👻', 'home': '🏠', 'janitor-indoor': '🧽', 'janitor-outdoor': '🍂',
        'k3-officer': '👷', 'k3': '🚧', 'login': '🔐', 'maintenance': '🔧',
        'prediction': '📊', 'profile': '👤', 'qr': '📲', 'sekuriti': '🛡️',
        'settings': '⚙️', 'stok': '📦', 'weather': '⛅'
    };

    // Nama tampilan (capitalize)
    function formatName(key) {
        return key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // elemen2 penting
    const sidebarItems = document.querySelectorAll('.nav-item[data-key]');
    const featureContainer = document.getElementById('featureContainer');
    const detailContainer = document.getElementById('detailViewContainer');
    const contentTitle = document.getElementById('contentTitle');
    const globalSearch = document.getElementById('globalSearchInput');

    // state aktif
    let activeFeature = 'home';

    // render grid semua fitur (home)
    function renderHomeGrid() {
        if (!featureContainer) return;
        featureContainer.innerHTML = ''; 
        featureContainer.style.display = 'grid';
        detailContainer.style.display = 'none';
        detailContainer.innerHTML = ''; 

        FEATURES.forEach(featureKey => {
            const tile = document.createElement('div');
            tile.className = 'feature-tile';
            tile.setAttribute('data-feature', featureKey);
            tile.innerHTML = `
                <div class="feature-icon">${ICON_MAP[featureKey] || '📌'}</div>
                <div class="feature-name">${formatName(featureKey)}</div>
            `;
            tile.addEventListener('click', (e) => {
                e.stopPropagation();
                setActiveFeature(featureKey);
            });
            featureContainer.appendChild(tile);
        });
    }

    // render detail suatu fitur (mode tampilan)
    function renderFeatureDetail(featureKey) {
        if (!detailContainer) return;
        featureContainer.style.display = 'none';
        detailContainer.style.display = 'block';

        const featureDisplayName = formatName(featureKey);
        contentTitle.innerText = featureDisplayName;

        // contoh konten dinamis (bisa dikustom tiap fitur)
        let detailHtml = `
            <div style="background: #17212b; border-radius: 36px; padding: 2rem; border: 1px solid #2d3a4c;">
            <h2 style="display: flex; gap: 10px; align-items: center; font-size: 2rem; margin-bottom: 1.5rem;">
                <span style="font-size: 3rem;">${ICON_MAP[featureKey] || '🔹'}</span> 
                <span>${featureDisplayName}</span>
            </h2>
            <p style="color: #9fb0cc; margin-bottom: 2rem;">Halaman khusus untuk fitur <strong>${featureDisplayName}</strong>. (Konten dinamis / integrasi backend bisa ditambahkan disini.)</p>
            <div style="background: #1b2637; border-radius: 24px; padding: 2rem 1.5rem;">
        `;

        // sedikit variasi tiap fitur (optional)
        if (featureKey === 'weather') {
            detailHtml += `<div>📍 Jakarta, Cerah Berawan • 30°C <br> 💧 Kelembaban 70% • angin 12 km/j</div>`;
        } else if (featureKey === 'stok') {
            detailHtml += `<div>📋 Stok terkini: 235 item tersedia, 12 hampir habis.</div>`;
        } else if (featureKey === 'k3' || featureKey === 'k3-officer') {
            detailHtml += `<div>⛑️ Laporan insiden: 0 • Alat safety: 98% terdistribusi.</div>`;
        } else if (featureKey === 'prediction') {
            detailHtml += `<div>📈 Prediksi beban kerja: +12% minggu depan.</div>`;
        } else if (featureKey === 'qr') {
            detailHtml += `<div>📱 Scan QR untuk akses cepat inventaris.</div>`;
        } else {
            detailHtml += `<div>🔹 Menu ini siap diisi dengan modul ${featureDisplayName}.</div>`;
        }

        detailHtml += `
                <br>
                <button class="back-button" style="background: #2d3e5a; border: none; color: white; padding: 0.75rem 1.5rem; border-radius: 30px; font-weight: 500; margin-top: 1rem; cursor: pointer;">← Kembali ke Home</button>
            </div></div>
        `;

        detailContainer.innerHTML = detailHtml;
        const backBtn = detailContainer.querySelector('.back-button');
        if (backBtn) {
            backBtn.addEventListener('click', () => setActiveFeature('home'));
        }
    }

    // ubah active feature + update UI
    function setActiveFeature(featureKey) {
        activeFeature = featureKey;

        // update active class di sidebar
        sidebarItems.forEach(item => {
            const key = item.getAttribute('data-key');
            if (key === featureKey) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // update title
        contentTitle.innerText = formatName(featureKey);

        if (featureKey === 'home') {
            renderHomeGrid();
        } else {
            renderFeatureDetail(featureKey);
        }
    }

    // inisialisasi sidebar click
    function initSidebar() {
        sidebarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const key = item.getAttribute('data-key');
                if (key) setActiveFeature(key);
            });
        });
    }

    // global search sederhana (filter / navigasi)
    function initSearch() {
        if (!globalSearch) return;
        globalSearch.addEventListener('input', (e) => {
            const term = e.target.value.trim().toLowerCase();
            if (term === '') return;

            // coba cari fitur yang match
            const matched = FEATURES.find(f => f.includes(term) || formatName(f).toLowerCase().includes(term));
            if (matched) {
                setActiveFeature(matched);
                globalSearch.value = ''; // opsional reset
            }
        });

        // enter langsung cari
        globalSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const term = globalSearch.value.trim().toLowerCase();
                const matched = FEATURES.find(f => f.includes(term) || formatName(f).toLowerCase().includes(term));
                if (matched) setActiveFeature(matched);
            }
        });
    }

    // footer weather interaksi kecil (dummy)
    function initWeatherFooter() {
        const weatherSpan = document.querySelector('#weatherFooter');
        if (weatherSpan) {
            weatherSpan.addEventListener('click', () => {
                setActiveFeature('weather');
            });
        }
    }

    // start
    window.addEventListener('DOMContentLoaded', () => {
        // set home aktif
        setActiveFeature('home');
        initSidebar();
        initSearch();
        initWeatherFooter();

        // dummy date sudah di set inline
        // tambahan efek pada notifikasi (contoh)
        document.querySelector('.notification-icon')?.addEventListener('click', ()=>{
            alert('🔔 Tidak ada notifikasi baru, Bro.');
        });
    });

})();
