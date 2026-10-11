import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Terminal, 
  FileCode2, 
  Play, 
  Check, 
  Copy, 
  Search, 
  FolderTree,
  Activity
} from 'lucide-react';
import { Logo } from './Logo';

export const ExtensionShowcase: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedIncident, setSelectedIncident] = useState<'users' | 'payments' | 'search'>('users');
  const [validationRun, setValidationRun] = useState<boolean>(true);
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const copyInstallCommand = () => {
    navigator.clipboard.writeText('code --install-extension dependency-guardian.vsix');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section-wrapper section-subtle-bg" id="extension-showcase">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>VS Code Extension</span>
          </div>
          <h2 className="section-title">Dependency intelligence, right where you code.</h2>
          <p className="section-description">
            Never context-switch to third-party dashboards. Inspect endpoint regressions, trace affected code, preview adapters, and run sandboxed validations inside your editor.
          </p>
        </div>

        {/* VS Code IDE Window Mockup */}
        <div
          style={{
            backgroundColor: '#181824',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #2d2d3f',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
            overflow: 'hidden',
            marginBottom: '2rem'
          }}
        >
          {/* Top Title Bar */}
          <div
            style={{
              backgroundColor: '#1f1f2e',
              padding: '0.6rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #2a2a3c',
              fontSize: '0.75rem',
              color: '#94a3b8'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              </div>
              <span style={{ marginLeft: '0.5rem', color: '#cbd5e1', fontWeight: 500 }}>
                demo-shop — Visual Studio Code
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#818cf8' }}>
                Backend: 127.0.0.1:8765 [Connected]
              </span>
            </div>
          </div>

          {/* IDE Layout: Activity Bar + Sidebar + Main Editor Area */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 240px 1fr',
              minHeight: '520px'
            }}
            className="vscode-ide-grid"
          >
            {/* 1. Activity Bar */}
            <div
              style={{
                backgroundColor: '#14141f',
                borderRight: '1px solid #242436',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '0.75rem',
                gap: '1.25rem',
                color: '#64748b'
              }}
            >
              <div title="Dependency Guardian Active View" style={{ color: '#818cf8', cursor: 'pointer' }}>
                <Logo size={24} showText={false} />
              </div>
              <FolderTree size={20} style={{ cursor: 'pointer' }} />
              <Search size={20} style={{ cursor: 'pointer' }} />
              <Activity size={20} style={{ cursor: 'pointer' }} />
            </div>

            {/* 2. Sidebar: Guardian Explorer */}
            <div
              style={{
                backgroundColor: '#1b1b28',
                borderRight: '1px solid #28283a',
                padding: '0.85rem 0',
                display: 'flex',
                flexDirection: 'column',
                fontSize: '0.75rem',
                color: '#cbd5e1'
              }}
              className="vscode-sidebar"
            >
              <div
                style={{
                  padding: '0 0.85rem 0.5rem',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#94a3b8'
                }}
              >
                Dependency Guardian
              </div>

              {/* Services Section */}
              <div style={{ padding: '0.4rem 0.85rem', color: '#818cf8', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>SERVICES (3)</span>
                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>PROBES</span>
              </div>

              <div
                onClick={() => setSelectedIncident('users')}
                style={{
                  padding: '0.4rem 0.85rem',
                  cursor: 'pointer',
                  backgroundColor: selectedIncident === 'users' ? '#27273a' : 'transparent',
                  borderLeft: selectedIncident === 'users' ? '2px solid #818cf8' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Users API (:8001)</span>
                <span style={{ color: '#ef4444', fontSize: '0.65rem' }}>1 Issue</span>
              </div>

              <div
                onClick={() => setSelectedIncident('payments')}
                style={{
                  padding: '0.4rem 0.85rem',
                  cursor: 'pointer',
                  backgroundColor: selectedIncident === 'payments' ? '#27273a' : 'transparent',
                  borderLeft: selectedIncident === 'payments' ? '2px solid #818cf8' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Payments API (:8002)</span>
                <span style={{ color: '#f59e0b', fontSize: '0.65rem' }}>Uncertain</span>
              </div>

              <div
                onClick={() => setSelectedIncident('search')}
                style={{
                  padding: '0.4rem 0.85rem',
                  cursor: 'pointer',
                  backgroundColor: selectedIncident === 'search' ? '#27273a' : 'transparent',
                  borderLeft: selectedIncident === 'search' ? '2px solid #818cf8' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Search API (:8003)</span>
                <span style={{ color: '#38bdf8', fontSize: '0.65rem' }}>Pagination</span>
              </div>

              {/* Detected Changes */}
              <div style={{ padding: '0.75rem 0.85rem 0.4rem', color: '#818cf8', fontWeight: 600, marginTop: '0.5rem' }}>
                DETECTED INCIDENTS
              </div>

              <div
                style={{
                  padding: '0.4rem 0.85rem',
                  color: selectedIncident === 'users' ? '#ffffff' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <ShieldAlert size={12} style={{ color: '#ef4444' }} />
                <span>name &rarr; display_name</span>
              </div>

              {/* Affected Workflows */}
              <div style={{ padding: '0.75rem 0.85rem 0.4rem', color: '#818cf8', fontWeight: 600, marginTop: '0.5rem' }}>
                AFFECTED WORKFLOWS
              </div>
              <div style={{ padding: '0.4rem 0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileCode2 size={12} style={{ color: '#60a5fa' }} />
                <span>user_service.py:42</span>
              </div>
            </div>

            {/* 3. Main Editor / Webview Panel */}
            <div
              style={{
                backgroundColor: '#14141f',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                overflowY: 'auto'
              }}
            >
              {/* Webview Header Card */}
              <div
                style={{
                  backgroundColor: '#1e1e2d',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  border: '1px solid #2d2d42',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#ffffff' }}>
                      Incident: Field Rename Detected on GET /users/u_123
                    </span>
                    <span className="status-pill danger" style={{ fontSize: '0.6875rem' }}>
                      HIGH RISK
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Target Service: Users API (:8001) • Mapped Workflow: User Profile Page
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setValidationRun(true)}
                    className="btn btn-secondary btn-sm"
                    style={{ backgroundColor: '#2a2a3e', color: '#ffffff', borderColor: '#3b3b54' }}
                  >
                    <Play size={12} /> Run Validation
                  </button>
                  <button
                    onClick={() => setIsApplied(!isApplied)}
                    className="btn btn-primary btn-sm"
                    style={{ backgroundColor: isApplied ? '#10b981' : 'var(--color-brand-primary)' }}
                  >
                    {isApplied ? <Check size={12} /> : <FileCode2 size={12} />}
                    {isApplied ? 'Applied (Rollback Available)' : 'Apply Approved Repair'}
                  </button>
                </div>
              </div>

              {/* Diff Preview in Editor */}
              <div
                style={{
                  backgroundColor: '#0c0d14',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #242436',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  lineHeight: 1.6,
                  color: '#e2e8f0',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    backgroundColor: '#181824',
                    padding: '0.4rem 0.85rem',
                    borderBottom: '1px solid #242436',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.6875rem',
                    color: '#94a3b8'
                  }}
                >
                  <span>demo-app/src/services/user_service.py (Working Tree Diff)</span>
                  <span style={{ color: '#10b981' }}>+1 / -1 lines</span>
                </div>
                <div style={{ padding: '0.75rem' }}>
                  <div style={{ color: '#64748b' }}>@@ -41,3 +41,4 @@ def get_user_profile(user_id):</div>
                  <div style={{ color: '#94a3b8', paddingLeft: '1rem' }}>    id=payload["id"],</div>
                  <div style={{ color: '#f87171', backgroundColor: 'rgba(239, 68, 68, 0.15)', paddingLeft: '1rem' }}>
                    -   name=payload["name"],
                  </div>
                  <div style={{ color: '#4ade80', backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingLeft: '1rem' }}>
                    +   name=payload.get("display_name", payload.get("name", "")),
                  </div>
                  <div style={{ color: '#94a3b8', paddingLeft: '1rem' }}>    email=payload["email"],</div>
                </div>
              </div>

              {/* Integrated Terminal Output */}
              <div
                style={{
                  backgroundColor: '#0c0d14',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #242436',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', marginBottom: '0.4rem' }}>
                  <Terminal size={12} style={{ color: '#10b981' }} />
                  <span>Terminal: Guardian Validation Sandbox</span>
                </div>
                <div style={{ color: '#e2e8f0' }}>$ pytest demo-app/tests/test_user_profile.py -q</div>
                {validationRun ? (
                  <>
                    <div style={{ color: '#4ade80' }}>.... [100%] 4 passed in 0.14s</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.6875rem', marginTop: '0.2rem' }}>
                      Exit Code: 0 • Target file verification passed • Ready for developer approval
                    </div>
                  </>
                ) : (
                  <div style={{ color: '#fcd34d' }}>Running sandbox validation suite...</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Extension Installation & Command Reference */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--color-border-default)',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.65rem', color: 'var(--color-text-primary)', letterSpacing: '-0.025em' }}>
              Install Extension Locally
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              The Dependency Guardian extension connects directly to your local FastAPI backend over loopback (<code>127.0.0.1:8765</code>).
            </p>

            {/* Copyable Install Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1.15rem',
                gap: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <Terminal size={17} style={{ color: 'var(--color-brand-primary)' }} />
              <span style={{ flex: 1, color: 'var(--color-text-primary)', fontWeight: 600 }}>
                code --install-extension dependency-guardian.vsix
              </span>
              <button
                onClick={copyInstallCommand}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: copied ? 'var(--color-success)' : 'var(--color-brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
              Supported Extension Commands
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9375rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span><code style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.15rem 0.45rem', backgroundColor: 'var(--color-surface-muted)', border: '1px solid var(--color-border-subtle)', borderRadius: '4px' }}>Dependency Guardian: Create Baseline</code> — Capture known-good state</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span><code style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.15rem 0.45rem', backgroundColor: 'var(--color-surface-muted)', border: '1px solid var(--color-border-subtle)', borderRadius: '4px' }}>Dependency Guardian: Scan Dependencies</code> — Run probes & diffing</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span><code style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.15rem 0.45rem', backgroundColor: 'var(--color-surface-muted)', border: '1px solid var(--color-border-subtle)', borderRadius: '4px' }}>Dependency Guardian: Preview Repair</code> — Review proposed patch & assumptions</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span><code style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.15rem 0.45rem', backgroundColor: 'var(--color-surface-muted)', border: '1px solid var(--color-border-subtle)', borderRadius: '4px' }}>Dependency Guardian: Roll Back Repair</code> — 1-click safe restoration</span>
              </li>
            </ul>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .vscode-ide-grid {
              grid-template-columns: 1fr !important;
            }
            .vscode-sidebar {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
