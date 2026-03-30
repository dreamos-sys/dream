"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function K3Page() {
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [formData, setFormData] = useState({ incident_type: '', location: '', description: '', priority: 'medium' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport = { ...formData, id: Date.now(), date: new Date().toISOString(), status: 'pending' };
    setReports([...reports, newReport]);
    alert('✅ K3 Report Submitted!');
    setFormData({ incident_type: '', location: '', description: '', priority: 'medium' });
  };

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh', background: '#020617' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#f59e0b', marginBottom: '20px' }}>⚠️ K3 & Safety</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b', borderRadius: '15px', padding: '15px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', color: '#f59e0b' }}>{reports.length}</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Reports</div>
        </div>        <div style={{ flex: 1, background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '15px', padding: '15px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', color: '#10b981' }}>7</div>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>Resolved</div>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ background: '#0f172a', border: '1px solid #f59e0b', borderRadius: '15px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ color: '#f59e0b', fontSize: '14px', marginBottom: '15px' }}>📝 New Report</h2>
        <input type="text" placeholder="Incident Type" value={formData.incident_type} onChange={(e) => setFormData({...formData, incident_type: e.target.value})} style={{ width: '100%', background: '#1e293b', border: '1px solid #f59e0b', borderRadius: '8px', padding: '12px', color: 'white', marginBottom: '10px' }} />
        <input type="text" placeholder="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={{ width: '100%', background: '#1e293b', border: '1px solid #f59e0b', borderRadius: '8px', padding: '12px', color: 'white', marginBottom: '10px' }} />
        <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} style={{ width: '100%', background: '#1e293b', border: '1px solid #f59e0b', borderRadius: '8px', padding: '12px', color: 'white', marginBottom: '10px' }}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ width: '100%', background: '#1e293b', border: '1px solid #f59e0b', borderRadius: '8px', padding: '12px', color: 'white', minHeight: '100px', marginBottom: '10px' }} />
        <button type="submit" style={{ width: '100%', background: '#f59e0b', border: 'none', borderRadius: '8px', padding: '12px', color: '#020617', fontWeight: 'bold', cursor: 'pointer' }}>Submit Report</button>
      </form>
    </div>
  );
}
