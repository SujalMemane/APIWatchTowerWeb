import React from 'react';
import { 
  Server, 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  ArrowDown
} from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '../data/mockData';

export const ArchitectureDiagram: React.FC = () => {

  return (
    <section className="section-wrapper" id="architecture">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Verified System Architecture</span>
          </div>
          <h2 className="section-title">Fits into your existing development workflow.</h2>
          <p className="section-description">
            A secure, local-first architecture. All probes, diff calculations, SQLite storage, and test validations execute directly on your machine over loopback.
          </p>
        </div>

        {/* Visual Responsive Diagram */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            maxWidth: '1000px',
            margin: '0 auto 3rem auto'
          }}
        >
          {/* Layer 1: Simulated External APIs */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-default)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Server size={18} style={{ color: 'var(--color-brand-primary)' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Simulated External Dependencies (Local Ports)</h4>
              </div>
              <span className="status-pill neutral">Target Environment (Localhost)</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}
            >
              {ARCHITECTURE_LAYERS[0].components.map((c, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--color-surface-muted)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text-primary)', marginBottom: '0.2rem' }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-brand-primary)', marginBottom: '0.35rem' }}>
                    {c.tech}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                    {c.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Directional Flow Pipe 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '-0.35rem 0' }}>
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
              <line x1="12" y1="0" x2="12" y2="36" stroke="#818cf8" strokeWidth="2.5" strokeDasharray="6 6" style={{ animation: 'data-flow 1.2s linear infinite' }} />
              <circle cx="12" cy="18" r="3.5" fill="#4f46e5" />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-brand-primary)', backgroundColor: 'var(--color-brand-surface)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-brand-border)', marginTop: '0.25rem' }}>
              <ArrowDown size={13} />
              <span>HTTP Probes & Fingerprint Capture (HTTPX async)</span>
              <ArrowDown size={13} />
            </div>
          </div>

          {/* Layer 2: Local Python FastAPI Backend */}
          <div
            style={{
              backgroundColor: '#0f172a',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #1e293b',
              padding: '1.75rem',
              color: '#ffffff',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Cpu size={20} style={{ color: '#818cf8' }} />
                <div>
                  <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#ffffff' }}>
                    Local Python Backend (FastAPI • 127.0.0.1:8765)
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Bound strictly to loopback • SQLite Persistence • Pytest Validation Sandbox
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: 'rgba(99, 102, 241, 0.25)',
                  color: '#c7d2fe',
                  border: '1px solid rgba(129, 140, 248, 0.4)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px'
                }}
              >
                Zero External Telemetry
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
              }}
            >
              {ARCHITECTURE_LAYERS[1].components.map((c, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#1e293b',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #334155',
                    padding: '0.85rem'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#ffffff', marginBottom: '0.2rem' }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: '#a5b4fc', marginBottom: '0.35rem' }}>
                    {c.tech}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.45 }}>
                    {c.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Directional Flow Pipe 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '-0.35rem 0' }}>
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
              <line x1="12" y1="0" x2="12" y2="36" stroke="#818cf8" strokeWidth="2.5" strokeDasharray="6 6" style={{ animation: 'data-flow 1.2s linear infinite' }} />
              <circle cx="12" cy="18" r="3.5" fill="#4f46e5" />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-brand-primary)', backgroundColor: 'var(--color-brand-surface)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-brand-border)', marginTop: '0.25rem' }}>
              <ArrowDown size={13} />
              <span>Local REST Client • Tree View RPC • Diff & Approval Commands</span>
              <ArrowDown size={13} />
            </div>
          </div>

          {/* Layer 3: VS Code Extension Client */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-default)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={18} style={{ color: 'var(--color-brand-primary)' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Developer Interface: VS Code Extension</h4>
              </div>
              <span className="status-pill success">TypeScript Extension Host</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem'
              }}
            >
              {ARCHITECTURE_LAYERS[2].components.map((c, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--color-surface-muted)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text-primary)', marginBottom: '0.2rem' }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-brand-primary)', marginBottom: '0.35rem' }}>
                    {c.tech}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                    {c.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Reliability Callout Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--color-border-default)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          <ShieldCheck size={24} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--color-text-primary)' }}>
              Built Around Explicit Safety Guarantees (PRD Sec. 19)
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              The local backend binds exclusively to loopback (<code>127.0.0.1</code>), enforces request timeouts and size limits, rejects path traversal outside the workspace, verifies file hashes before applying patches, and keeps LLM interactions completely disabled by default.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
