import { createClient } from '@supabase/supabase-js'

// Inisialisasi Cloud Brain (Ganti URL & KEY nanti di Env Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const GlobalSync = {
  // Sync Audit Log ke Cloud agar permanen (Standard ISO)
  pushAudit: async (log: any) => {
    const { error } = await supabase.from('audit_logs').insert([log])
    if (error) console.error("🛡️ Cloud Sync Error:", error)
  },
  // Backup Memory Baby Agent
  backupNeural: async (userId: string, memory: any) => {
    await supabase.from('profiles').upsert({ id: userId, neural_memory: memory })
  }
}
