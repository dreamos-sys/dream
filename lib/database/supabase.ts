/**
 * 🗄️ SUPABASE CLIENT - Cloud Sync & Database
 * Dream OS v14.0 - Global Pro Standard
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export const db = {
  // Sync local data to cloud
  async sync(data: any, userId: string) {
    try {
      const { error } = await supabase
        .from('user_data')
        .upsert({           user_id: userId, 
          data, 
          updated_at: new Date().toISOString() 
        })
      if (error) throw error
      console.log('🗄️ SYNC: Data synced to cloud')
    } catch (e) {
      console.error('🗄️ SYNC FAILED:', e)
    }
  },
  
  // Restore data from cloud
  async restore(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_data')
        .select('data')
        .eq('user_id', userId)
        .single()
      if (error) throw error
      console.log('🗄️ RESTORE: Data restored from cloud')
      return data
    } catch (e) {
      console.error('🗄️ RESTORE FAILED:', e)
      return null
    }
  },
  
  // Log audit trail
  async logAudit(action: string, details: any, userId?: string) {
    try {
      const { error } = await supabase
        .from('audit_logs')
        .insert([{ 
          action, 
          details, 
          user_id: userId || 'ANONYMOUS',
          timestamp: new Date().toISOString() 
        }])
      if (error) throw error
      console.log('🗄️ AUDIT: Logged to cloud')
    } catch (e) {
      console.error('🗄️ AUDIT FAILED:', e)
      // Fallback to localStorage
      const logs = JSON.parse(localStorage.getItem('audit_logs') || '[]')
      logs.push({ action, details, timestamp: new Date().toISOString() })
      localStorage.setItem('audit_logs', JSON.stringify(logs.slice(-100)))
    }
  },
    // Backup all data
  async backup(userId: string) {
    try {
      const localData = localStorage.getItem('dream_data')
      const backup = {
        timestamp: Date.now(),
        version: '14.0.0',
        data: JSON.parse(localData || '{}')
      }
      
      const { error } = await supabase
        .from('backups')
        .insert([{ user_id: userId, backup }])
      
      if (error) throw error
      console.log('🗄️ BACKUP: Created successfully')
    } catch (e) {
      console.error('🗄️ BACKUP FAILED:', e)
    }
  }
}

export default supabase
