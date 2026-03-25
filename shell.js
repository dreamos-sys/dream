(function() {
    'use strict';
    let att = 0, lock = false;

    // 1. Injeksi CSS dengan Spasi Presisi
    const s = document.createElement('style');
    s.textContent = `
        :root { --p: #4a148c; --a: #10b981; --bg: #e0f2f1; }
        body { 
            margin: 0; 
            background: var(--bg); 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            min-height: 100vh; 
        }
        .box { 
            background: var(--p); 
            padding: 35px 25px; 
            border-radius: 25px; 
            text-align: center; 
            color: #fff; 
            width: 280px; 
            box-shadow: 0 15px 35px rgba(0,0,0,0.3); 
        }
        .ig { 
            position: relative; 
            margin: 25px 0; 
            display: flex;
            align-items: center;
        }
        input { 
            width: 100%; 
            padding: 14px 45px 14px 20px; 
            border-radius: 30px; 
            border: none; 
            text-align: center; 
            font-weight: bold; 
            font-size: 16px;
            outline: none;
        }
        .eye { 
            position: absolute; 
            right: 18px; 
            cursor: pointer; 
            color: var(--p); 
            font-size: 1.3rem; 
            z-index: 10;
            user-select: none;
        }
        .btn { 
            background: var(--a); 
            color: #fff; 
            border: none; 
            padding: 14px; 
            border-radius: 30px; 
            width: 100%; 
            font-weight: bold; 
            cursor: pointer; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        #g { 
            display: none; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 20px; 
            padding: 25px; 
            width: 100%; 
            max-width: 420px; 
        }
        .tile { 
            text-align: center; 
            color: var(--p); 
            font-weight: bold; 
            font-size: 11px; 
        }
        .tile img { 
            width: 65px; 
            height: 65px; 
            object-fit: contain; 
            margin-bottom: 8px; 
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
    `;
    document.head.appendChild(s);

    // 2. Render UI
    document.body.innerHTML = `
        <div id="app">
            <div class="box">
                <img src="assets/img/icon-192.png" width="80" style="margin-bottom:15px;">
                <div style="font-weight:bold; letter-spacing: 2px; margin-bottom:10px;">بِسْمِ اللّٰهِ</div>
                <div class="ig">
                    <input type="password" id="p" placeholder="ACCESS KEY">
                    <span class="eye" onclick="DREAM.t()">👁️</span>
                </div>
                <button class="btn" onclick="DREAM.v()">VERIFIKASI AKSES</button>
                <div id="m" style="font-size:12px; color:#ffeb3b; margin-top:15px; font-weight:bold; min-height:18px;"></div>
            </div>
        </div>
        <div id="g"></div>
    `;

    // 3. Logic Core
    window.DREAM = {
        t: () => { 
            const p = document.getElementById('p'); 
            p.type = p.type === 'password' ? 'text' : 'password'; 
        },
        v: () => {
            if (lock) return;
            const p = document.getElementById('p').value, m = document.getElementById('m');
            if (p === 'DREAM13') {
                document.getElementById('app').style.display = 'none';
                document.getElementById('g').style.display = 'grid';
                DREAM.r();
            } else {
                att++;
                if (att >= 3) {
                    lock = true; m.innerText = 'SISTEM TERKUNCI 5 MENIT';
                    setTimeout(() => { lock = false; att = 0; m.innerText = ''; }, 300000);
                } else { m.innerText = `AKSES DITOLAK (${att}/3)`; }
            }
        },
        r: () => {
            const list = ['Gudang', 'Booking', 'Security', 'AI Hub', 'Settings', 'Sync', 'Asset', 'Report', 'Network'];
            document.getElementById('g').innerHTML = list.map(l => `
                <div class="tile"><img src="assets/img/icon-192.png"><div>${l}</div></div>
            `).join('');
        }
    };
})();
