/**
 * modules/booking/module.js
 * Dream OS v2.1 - Booking Module
 * Room booking system with anti-double booking
 */

export async function render({ container, user, supabase }) {
    return `
        <div class="module-container active" id="module-booking">
            <!-- Header -->
            <header class="glass-header">
                <div class="status-bar">
                    <span>📍 DEPOK CORE</span>
                    <span>ISO 27001 ✅</span>
                </div>
                <div class="islamic-header">
                    <h1 class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                    <p class="shalawat">اَللهم صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</p>
                </div>
            </header>

            <!-- Main Content -->
            <main style="padding:16px;padding-bottom:140px;">
                <h2 class="text-2xl font-bold text-emerald-400 mb-6">📅 Booking Ruangan</h2>
                
                <!-- Form Booking -->
                <div class="glass-card p-6 mb-6">
                    <h3 class="text-lg font-semibold mb-3">Form Booking</h3>
                    <form id="booking-form" class="space-y-4">
                        <div>
                            <label class="block mb-1 text-sm font-medium">Nama Peminjam *</label>
                            <input type="text" id="nama" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white" placeholder="Nama lengkap">
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Ruangan *</label>
                            <select id="ruang" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white">
                                <option value="">Pilih Ruangan</option>
                                <option value="Ruang Rapat 1">Ruang Rapat 1</option>
                                <option value="Ruang Rapat 2">Ruang Rapat 2</option>
                                <option value="Aula">Aula</option>
                                <option value="Lab Komputer">Lab Komputer</option>
                                <option value="Lab IPA">Lab IPA</option>
                            </select>
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Tanggal *</label>
                            <input type="date" id="tanggal" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>                                <label class="block mb-1 text-sm font-medium">Jam Mulai *</label>
                                <input type="time" id="jam_mulai" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white">
                            </div>
                            <div>
                                <label class="block mb-1 text-sm font-medium">Jam Selesai *</label>
                                <input type="time" id="jam_selesai" required class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white">
                            </div>
                        </div>
                        <div>
                            <label class="block mb-1 text-sm font-medium">Keperluan *</label>
                            <textarea id="keperluan" required rows="3" class="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white" placeholder="Tujuan penggunaan ruangan"></textarea>
                        </div>
                        <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl font-bold transition">
                            📅 Simpan Booking
                        </button>
                        <div id="form-result" class="text-center text-sm"></div>
                    </form>
                </div>

                <!-- Daftar Booking -->
                <div class="glass-card p-6">
                    <h3 class="text-lg font-semibold mb-4">📋 Daftar Booking</h3>
                    <div id="booking-list" class="space-y-3">
                        <p class="text-slate-400 text-center py-4">Memuat data...</p>
                    </div>
                </div>
            </main>

            <!-- Bottom Navigation -->
            <nav class="bottom-nav">
                <div class="nav-container">
                    <button class="nav-item" data-nav="home" onclick="window.loadModule('home')">
                        <i class="fas fa-home"></i><span>Home</span>
                    </button>
                    <button class="nav-item active" data-nav="booking" onclick="window.loadModule('booking')">
                        <i class="fas fa-calendar-check"></i><span>Booking</span>
                    </button>
                    <button class="nav-item" data-nav="sekuriti" onclick="window.loadModule('sekuriti')">
                        <i class="fas fa-shield-halved"></i><span>Security</span>
                    </button>
                    <button class="nav-item" data-nav="settings" onclick="window.loadModule('settings')">
                        <i class="fas fa-sliders"></i><span>Settings</span>
                    </button>
                </div>
            </nav>
        </div>
    `;
}

export async function afterRender({ supabase }) {    console.log('📅 [BOOKING] Module loaded');
    
    const form = document.getElementById('booking-form');
    const formResult = document.getElementById('form-result');
    const bookingList = document.getElementById('booking-list');
    const tanggalInput = document.getElementById('tanggal');
    
    // Set default date to today
    if (tanggalInput) {
        const today = new Date().toISOString().split('T')[0];
        tanggalInput.value = today;
    }
    
    // Load bookings
    await loadBookings();
    
    // Form submit handler
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '⏳ Menyimpan...';
        
        const booking = {
            id: Date.now(),
            nama: document.getElementById('nama')?.value,
            ruang: document.getElementById('ruang')?.value,
            tanggal: document.getElementById('tanggal')?.value,
            jam_mulai: document.getElementById('jam_mulai')?.value,
            jam_selesai: document.getElementById('jam_selesai')?.value,
            keperluan: document.getElementById('keperluan')?.value,
            status: 'pending',
            created_at: new Date().toISOString()
        };
        
        try {
            // Check for double booking
            const existing = await checkDoubleBooking(booking);
            if (existing) {
                throw new Error('❌ Ruangan sudah dibooking pada waktu yang sama!');
            }
            
            // Save to Supabase or localStorage
            if (supabase) {
                const { error } = await supabase.from('bookings').insert([booking]);
                if (error) throw error;
            } else {
                const bookings = JSON.parse(localStorage.getItem('dreamos-bookings') || '[]');                bookings.push(booking);
                localStorage.setItem('dreamos-bookings', JSON.stringify(bookings));
            }
            
            // Audit log
            if (window.GhostAudit) {
                window.GhostAudit.record(
                    window.DREAM?.state?.user?.email || booking.nama,
                    'BOOKING_CREATED',
                    `Ruangan: ${booking.ruang}, Tanggal: ${booking.tanggal}`
                );
            }
            
            // Toast
            if (window.toast) {
                window.toast('✅ Booking berhasil disimpan!', 'success');
            }
            
            formResult.innerHTML = '<span class="text-emerald-400">✅ Booking berhasil!</span>';
            form.reset();
            if (tanggalInput) tanggalInput.value = today;
            
            await loadBookings();
            
        } catch (error) {
            formResult.innerHTML = `<span class="text-red-500">${error.message}</span>`;
            if (window.toast) {
                window.toast(error.message, 'error');
            }
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    });
    
    // Load bookings function
    async function loadBookings() {
        if (!bookingList) return;
        
        bookingList.innerHTML = '<p class="text-slate-400 text-center py-4">⏳ Memuat...</p>';
        
        try {
            let bookings = [];
            
            if (supabase) {
                const { data, error } = await supabase
                    .from('bookings')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(20);                if (error) throw error;
                bookings = data || [];
            } else {
                bookings = JSON.parse(localStorage.getItem('dreamos-bookings') || '[]');
            }
            
            if (bookings.length === 0) {
                bookingList.innerHTML = '<p class="text-slate-400 text-center py-4">Belum ada booking</p>';
                return;
            }
            
            bookingList.innerHTML = bookings.map(b => `
                <div class="glass-card p-4 border-l-4 ${b.status === 'approved' ? 'border-emerald-500' : b.status === 'rejected' ? 'border-red-500' : 'border-yellow-500'}">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h4 class="font-bold text-white">${b.ruang}</h4>
                            <p class="text-sm text-slate-300">${b.nama}</p>
                            <p class="text-xs text-slate-400 mt-1">📅 ${b.tanggal} | ⏰ ${b.jam_mulai} - ${b.jam_selesai}</p>
                            <p class="text-xs text-slate-500 mt-1">${b.keperluan}</p>
                        </div>
                        <span class="text-xs px-2 py-1 rounded-full ${b.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : b.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}">
                            ${b.status}
                        </span>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            bookingList.innerHTML = '<p class="text-red-500 text-center py-4">Gagal memuat data</p>';
        }
    }
    
    // Check double booking
    async function checkDoubleBooking(newBooking) {
        let bookings = [];
        
        if (supabase) {
            const { data } = await supabase
                .from('bookings')
                .select('*')
                .eq('ruang', newBooking.ruang)
                .eq('tanggal', newBooking.tanggal)
                .in('status', ['pending', 'approved']);
            bookings = data || [];
        } else {
            bookings = JSON.parse(localStorage.getItem('dreamos-bookings') || '[]');
            bookings = bookings.filter(b => 
                b.ruang === newBooking.ruang && 
                b.tanggal === newBooking.tanggal &&
                b.status !== 'rejected'            );
        }
        
        // Check time overlap
        for (const b of bookings) {
            const overlap = (newBooking.jam_mulai < b.jam_selesai && newBooking.jam_selesai > b.jam_mulai);
            if (overlap) return b;
        }
        
        return null;
    }
    
    // Expose loadBookings for refresh
    window.refreshBookingList = loadBookings;
}

export function cleanup() {
    console.log('📅 [BOOKING] Module cleanup');
    delete window.refreshBookingList;
}
