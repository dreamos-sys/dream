"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}
export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🛡️ ERROR BOUNDARY CAUGHT:', error, errorInfo);
    
    // Log to Supabase (if available)
    import('@/lib/database/supabase').then(({ db }) => {
      db.logAudit('ERROR_BOUNDARY', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    });
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: '#020617', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px',
          color: 'white'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>⚠️</div>
          <h1 style={{ fontSize: '24px', marginBottom: '10px', color: '#10b981' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: '30px', textAlign: 'center' }}>
            Don't worry! Our Neural AI is fixing this...
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>            <button 
              onClick={this.handleReload}
              style={{ 
                background: '#10b981', 
                border: 'none', 
                borderRadius: '12px', 
                padding: '14px 28px', 
                color: '#020617', 
                fontWeight: '700', 
                cursor: 'pointer'
              }}
            >
              🔄 Reload
            </button>
            <button 
              onClick={() => window.history.back()}
              style={{ 
                background: 'rgba(148,163,184,0.2)', 
                border: '1px solid rgba(148,163,184,0.3)', 
                borderRadius: '12px', 
                padding: '14px 28px', 
                color: 'white', 
                fontWeight: '700', 
                cursor: 'pointer'
              }}
            >
              ← Back
            </button>
          </div>
          {this.state.error && (
            <details style={{ marginTop: '30px', maxWidth: '500px' }}>
              <summary style={{ color: '#94a3b8', cursor: 'pointer' }}>
                Error Details (for developers)
              </summary>
              <pre style={{ 
                background: '#0f172a', 
                padding: '15px', 
                borderRadius: '8px', 
                fontSize: '12px', 
                overflow: 'auto',
                marginTop: '10px'
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;  }
}

export default ErrorBoundary;
