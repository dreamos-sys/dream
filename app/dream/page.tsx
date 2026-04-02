export default function DreamPage() {
  return (
    <main style={{minHeight:'100vh',background:'#f9fafb',color:'#111827',fontFamily:'system-ui'}}>
      {/* Header dengan Logo */}
      <header style={{background:'white',borderBottom:'1px solid #e5e7eb',padding:'1rem',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
          {/* Logo Dream OS */}
          <img src="/assets/img/dream-logo.png" alt="Dream OS" style={{width:'40px',height:'40px',borderRadius:'0.5rem'}} onError={(e) => {e.target.style.display='none'}} />
          <div>
            <h1 style={{fontSize:'1.25rem',fontWeight:'700'}}>🏠 Dream OS</h1>
            <p style={{fontSize:'0.75rem',color:'#6b7280'}}>AI-Powered Operational System</p>
          </div>
        </div>
      </header>

      {/* Bismillah Banner Lengkap */}
      <div style={{background:'linear-gradient(135deg, #fef3c7 0%, #fffbeb 50%, #fef3c7 100%)',borderBottom:'2px solid #fcd34d',padding:'1.5rem 1rem',textAlign:'center'}}>
        <p style={{color:'#92400e',fontSize:'1.75rem',fontWeight:'700',marginBottom:'0.5rem',fontFamily:'serif'}}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p style={{color:'#b45309',fontSize:'0.875rem',marginBottom:'0.25rem'}}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        <p style={{color:'#92400e',fontSize:'0.75rem',fontStyle:'italic'}}>Bismillahirrahmanirrahim</p>
        <p style={{color:'#b45309',fontSize:'0.75rem',marginTop:'0.5rem'}}>Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang</p>
        <p style={{color:'#92400e',fontSize:'0.75rem',marginTop:'0.25rem',fontWeight:'600'}}>Dream OS V2.1</p>
      </div>

      {/* Content */}
      <div style={{padding:'1rem'}}>
        {/* AI Assistant Card */}
        <div style={{background:'white',borderRadius:'1rem',padding:'1.5rem',border:'1px solid #e5e7eb',marginBottom:'1rem',boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
          <p style={{color:'#374151',marginBottom:'0.5rem',fontWeight:'600'}}>💬 Dream AI Assistant</p>
          <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:'0.75rem',padding:'1rem'}}>
            <p style={{color:'#1e293b',fontSize:'0.875rem'}}>Halo! Ada yang bisa Dream OS bantu hari ini? 🤖✨</p>
          </div>
        </div>

        {/* Modules Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.75rem',marginBottom:'1rem'}}>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb',boxShadow:'0 1px 2px rgba(0,0,0,0.05)',textAlign:'center'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.25rem'}}>🎯</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600',color:'#374151'}}>Command</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb',boxShadow:'0 1px 2px rgba(0,0,0,0.05)',textAlign:'center'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.25rem'}}>📅</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600',color:'#374151'}}>Booking</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb',boxShadow:'0 1px 2px rgba(0,0,0,0.05)',textAlign:'center'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.25rem'}}>⚠️</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600',color:'#374151'}}>K3</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb',boxShadow:'0 1px 2px rgba(0,0,0,0.05)',textAlign:'center'}}>            <div style={{fontSize:'2rem',marginBottom:'0.25rem'}}>🛡️</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600',color:'#374151'}}>Security</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb',boxShadow:'0 1px 2px rgba(0,0,0,0.05)',textAlign:'center'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.25rem'}}>🧹</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600',color:'#374151'}}>Janitor</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb',boxShadow:'0 1px 2px rgba(0,0,0,0.05)',textAlign:'center'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.25rem'}}>📦</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600',color:'#374151'}}>Stok</div>
          </button>
        </div>

        {/* Additional Modules */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.75rem'}}>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb',boxShadow:'0 1px 2px rgba(0,0,0,0.05)',textAlign:'center'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.25rem'}}>🔧</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600',color:'#374151'}}>Maintenance</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb',boxShadow:'0 1px 2px rgba(0,0,0,0.05)',textAlign:'center'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.25rem'}}>📋</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600',color:'#374151'}}>Inventaris</div>
          </button>
          <button style={{background:'white',borderRadius:'1rem',padding:'1rem',border:'1px solid #e5e7eb',boxShadow:'0 1px 2px rgba(0,0,0,0.05)',textAlign:'center'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.25rem'}}>🏭</div>
            <div style={{fontSize:'0.75rem',fontWeight:'600',color:'#374151'}}>Gudang</div>
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <nav style={{background:'white',borderTop:'1px solid #e5e7eb',position:'fixed',bottom:0,left:0,right:0,padding:'0.5rem 1rem',zIndex:50}}>
        <div style={{display:'flex',justifyContent:'space-around'}}>
          <button style={{padding:'0.5rem',color:'#3b82f6',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.25rem'}}>
            <span style={{fontSize:'1.25rem'}}>🏠</span>
            <span style={{fontSize:'0.625rem',fontWeight:'600'}}>Home</span>
          </button>
          <button style={{padding:'0.5rem',color:'#6b7280',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.25rem'}}>
            <span style={{fontSize:'1.25rem'}}>👤</span>
            <span style={{fontSize:'0.625rem',fontWeight:'600'}}>Profile</span>
          </button>
          <button style={{padding:'0.5rem',color:'#6b7280',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.25rem'}}>
            <span style={{fontSize:'1.25rem'}}>🔳</span>
            <span style={{fontSize:'0.625rem',fontWeight:'600'}}>QR</span>
          </button>
          <button style={{padding:'0.5rem',color:'#6b7280',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.25rem'}}>
            <span style={{fontSize:'1.25rem'}}>🔔</span>
            <span style={{fontSize:'0.625rem',fontWeight:'600'}}>Alerts</span>
          </button>
          <button style={{padding:'0.5rem',color:'#6b7280',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.25rem'}}>            <span style={{fontSize:'1.25rem'}}>⚙️</span>
            <span style={{fontSize:'0.625rem',fontWeight:'600'}}>Settings</span>
          </button>
        </div>
      </nav>
    </main>
  );
}
// Force 1775116766
