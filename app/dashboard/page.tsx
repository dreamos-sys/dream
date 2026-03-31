"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { store } from '@/lib/data/global-store';

export default function DashboardPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideData, setSlideData] = useState<any[]>([]);

  // 7 Integrated Slides Config
  const slides = [
    { 
      id: 1, title: '👋 Ucapan Salam', icon: '🌅',
      getData: () => store.getGreeting(),
      render: (d:any) => ({ title: d.text, subtitle: d.subtext, icon: d.icon })
    },
    { 
      id: 2, title: '📅 Booking Realtime', icon: '📅',
      getData: () => {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now()+86400000).toISOString().split('T')[0];
        const bookings = store.get('bookings')||[];
        return {
          today: bookings.filter((b:any)=>b.date===today).length,
          tomorrow: bookings.filter((b:any)=>b.date===tomorrow).length
        };
      },
      render: (d:any) => ({ title:'Booking Hari Ini', subtitle:\`\${d.today} Today · \${d.tomorrow} Besok\`, icon:'📅' })
    },
    { 
      id: 3, title: '⚠️ K3 & Safety', icon: '⚠️',
      getData: () => store.getK3Progress(),
      render: (d:any) => ({ title:'K3 Reports', subtitle:\`\${d.pending} Pending · \${d.inProgress} Action\`, icon:'⚠️' })
    },
    { 
      id: 4, title: '🌤️ Weather', icon: '🌤️',
      getData: () => store.getWeatherMitigations(),
      render: (d:any) => ({ title:d.warning||'Weather', subtitle:\`\${d.temperature}°C \${d.condition}\`, icon:'☀️', alert:d.mitigations })
    },
    { id:5, title:'👔 Command Center', icon:'👔', getData:()=>({title:'Management Info',items:['📌 CEO Meeting - Room A (14:00)']}), render:(d:any)=>({title:d.title,subtitle:\`\${d.items.length} Events\`,icon:'👔',list:d.items}) },
    { id:6, title:'🏢 Info Umum', icon:'🏢', getData:()=>({title:'General Info',items:['📌 Rapat Mingguan - 08:00']}), render:(d:any)=>({title:d.title,subtitle:\`\${d.items.length} Tasks\`,icon:'🏢',list:d.items}) },
    { id:7, title:'💬 Kabar', icon:'💬', getData:()=>({title:'Announcements',items:['🎂 Birthday: Pak Hanung']}), render:(d:any)=>({title:d.title,subtitle:\`\${d.items.length} News\`,icon:'💬',list:d.items}) },
  ];
  useEffect(() => {
    const update = () => setSlideData(slides.map(s => ({...s, rendered: s.render(s.getData())})));
    update();
    const t = setInterval(update, 10000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const rot = setInterval(() => setCurrentSlide(p => (p+1)%slides.length), 8000);
    return () => clearInterval(rot);
  }, []);

  const current = slideData[currentSlide]?.rendered || {title:'Loading...', subtitle:'', icon:'⏳'};

  return (
    <div style={{minHeight:'100vh', background:'#F2F2F7', paddingBottom:'120px'}}>
      <header style={{background:'white', padding:'30px 20px', borderBottomLeftRadius:'30px', borderBottomRightRadius:'30px'}}>
        <div style={{textAlign:'center'}}>
          <img src="/assets/img/icon-192.png" alt="Dream OS" style={{width:'80px',height:'80px',borderRadius:'22px',marginBottom:'15px'}}/>
          <div style={{fontFamily:'Amiri,serif', fontSize:'24px', color:'#10b981'}}>بِسْمِ اللَّهِ</div>
          <h1 style={{fontSize:'22px', fontWeight:'700', color:'#1c1c1e'}}>DREAM OS v14.0 PRO</h1>
        </div>
      </header>

      {/* 7-Slide Carousel */}
      <div style={{background:'linear-gradient(135deg,#0f172a,#020617)', border:'1px solid rgba(16,185,129,0.3)', borderRadius:'28px', padding:'24px', margin:'24px 15px'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'18px'}}>
          <span style={{color:'#10b981',fontWeight:'700'}}>{current.icon} {slideData[currentSlide]?.title}</span>
          <div>
            <button onClick={()=>setCurrentSlide(p=>(p-1+slides.length)%slides.length)} style={{background:'rgba(16,185,129,0.2)',border:'none',color:'#10b981',padding:'8px 14px',borderRadius:'10px',cursor:'pointer'}}>◀</button>
            <button onClick={()=>setCurrentSlide(p=>(p+1)%slides.length)} style={{background:'rgba(16,185,129,0.2)',border:'none',color:'#10b981',padding:'8px 14px',borderRadius:'10px',cursor:'pointer',marginLeft:'8px'}}>▶</button>
          </div>
        </div>
        <div style={{minHeight:'220px', background:'rgba(2,6,23,0.95)', borderRadius:'22px', padding:'24px', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <div style={{fontSize:'64px',marginBottom:'16px'}}>{current.icon}</div>
          <div style={{color:'#10b981',fontSize:'20px',fontWeight:'700'}}>{current.title}</div>
          <div style={{color:'rgba(148,163,184,0.85)',fontSize:'14px'}}>{current.subtitle}</div>
          {current.alert && <div style={{marginTop:'16px',background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:'12px',padding:'12px',width:'100%',textAlign:'left'}}>
            <div style={{color:'#ef4444',fontSize:'11px',fontWeight:'700'}}>⚠️ MITIGATION</div>
            {current.alert.map((a:string,i:number)=><div key={i} style={{color:'#fca5a5',fontSize:'10px',margin:'4px 0'}}>{a}</div>)}
          </div>}
          {current.list && <div style={{marginTop:'16px',width:'100%'}}>{current.list.map((item:string,i:number)=><div key={i} style={{color:'rgba(148,163,184,0.85)',fontSize:'11px',padding:'8px',background:'rgba(16,185,129,0.05)',borderRadius:'8px',margin:'4px 0'}}>{item}</div>)}</div>}
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:'8px',marginTop:'16px'}}>
          {slides.map((_,i)=><button key={i} onClick={()=>setCurrentSlide(i)} style={{width:'10px',height:'10px',borderRadius:'50%',border:'2px solid rgba(16,185,129,0.4)',background:i===currentSlide?'#10b981':'transparent',cursor:'pointer'}}/>) }
        </div>
      </div>

      {/* Module Grid Placeholder */}      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',padding:'16px'}}>
        {['Command','Booking','K3','Security','Janitor','Maintenance','Stok','Asset','Setting'].map(m=><div key={m} style={{background:'white',borderRadius:'20px',padding:'16px',textAlign:'center',boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}><div style={{fontSize:'24px',marginBottom:'8px'}}>⚡</div><div style={{fontSize:'11px',color:'#64748b'}}>{m}</div></div>)}
      </div>
    </div>
  );
}
