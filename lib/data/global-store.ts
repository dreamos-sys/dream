/** 📊 DREAM OS V14.0 - Global Data Store */
export interface BookingData { id:number; title:string; date:string; time:string; location:string; status:'pending'|'approved'|'rejected'; user:string; }
export interface K3Report { id:number; type:string; location:string; description:string; priority:'low'|'medium'|'high'; status:'pending'|'in-progress'|'resolved'; timestamp:string; assignedTo?:string; }

class GlobalStore {
  private static instance: GlobalStore;
  private storage: Map<string, any>;
  private constructor() { this.storage = new Map(); this.init(); }
  static getInstance() { if(!GlobalStore.instance) GlobalStore.instance = new GlobalStore(); return GlobalStore.instance; }
  private init() { 
    this.set('bookings',[]); this.set('k3Reports',[]); this.set('maintenanceTasks',[]); 
    this.set('securityAlerts',[]); this.set('janitorTasks',[]); 
    this.set('weatherAlert',{condition:'clear',temperature:28,mitigations:[]}); 
    this.set('announcements',[]); 
  }
  set(k:string,v:any){ this.storage.set(k,v); localStorage.setItem(\`dream_\${k}\`,JSON.stringify(v)); }
  get(k:string){ const s=localStorage.getItem(\`dream_\${k}\`); return s?JSON.parse(s):this.storage.get(k); }
  add(k:string,item:any){ const d=this.get(k)||[]; d.push(item); this.set(k,d); }
  getGreeting(){ const h=new Date().getHours(); 
    if(h>=4&&h<11) return {text:'Selamat Pagi',icon:'🌅',subtext:'Semangat memulai hari!'};
    if(h>=11&&h<15) return {text:'Selamat Siang',icon:'☀️',subtext:'Tetap produktif!'};
    if(h>=15&&h<18) return {text:'Selamat Sore',icon:'🌤️',subtext:'Selesaikan tugas!'};
    return {text:'Selamat Malam',icon:'🌙',subtext:'Istirahat yang cukup!'}; 
  }
  getK3Progress(){ const r=this.get('k3Reports')||[]; return { total:r.length, pending:r.filter((x:any)=>x.status==='pending').length, inProgress:r.filter((x:any)=>x.status==='in-progress').length, resolved:r.filter((x:any)=>x.status==='resolved').length }; }
  getWeatherMitigations(){ const c=['clear','rain','storm','extreme'], cond=c[Math.floor(Math.random()*c.length)], m:Record<string,string[]>={ clear:['Aktivitas normal'], rain:['🧹 Siapkan alat kebersihan','🔧 Cek saluran air'], storm:['🚨 Siaga tinggi!','🧹 Amankan peralatan outdoor'], extreme:['🚨 BENCANA! Ikuti protokol darurat'] }; 
    return { condition:cond, temperature:Math.floor(Math.random()*15)+25, warning:cond!=='clear'?'Peringatan Cuaca':undefined, mitigations:m[cond] }; 
  }
}
export const store = GlobalStore.getInstance(); export default store;
