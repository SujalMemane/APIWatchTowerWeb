import React, { useState } from 'react';
import { Terminal, FileCode, Server, ShieldCheck, Copy, Check } from 'lucide-react';
import { CONFIG_EXAMPLE_YAML } from '../data/mockData';

export const DeveloperSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'config' | 'api' | 'safety'>('config');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const apiEndpoints = [
    { method: 'GET', path: '/api/health', desc: 'Checks backend health and SQLite readiness' },
    { method: 'POST', path: '/api/projects/initialize', desc: 'Validates dependency-guardian.yml and registers probes' },
    { method: 'GET', path: '/api/services', desc: 'Returns registered dependencies and their latest probe statuses' },
    { method: 'POST', path: '/api/baselines', desc: 'Captures and versions a known-good baseline for all probes' },
    { method: 'POST', path: '/api/scans', desc: 'Executes manual probe scan and computes deterministic diffs' },
    { method: 'GET', path: '/api/changes', desc: 'Lists detected differences and rule-based severity ratings' },
    { method: 'GET', path: '/api/changes/{id}/impact', desc: 'Returns configured affected workflows, files, and tests' },
    { method: 'POST', path: '/api/changes/{id}/repair-proposals', desc: 'Generates candidate adapter diff (field rename / pagination)' },
    { method: 'POST', path: '/api/repairs/{id}/validate', desc: 'Executes configured validation command in sandboxed copy' },
    { method: 'POST', path: '/api/repairs/{id}/apply', desc: 'Applies validated patch with file hash check and audit record' },
    { method: 'POST', path: '/api/repairs/{id}/rollback', desc: 'Reverts applied patch to original file snapshot' }
  ];

  return (
    <section className="section-wrapper section-subtle-bg" id="developer-docs">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Developer Reference & Contracts</span>
          </div>
          <h2 className="section-title">Easy to explore. Designed for real engineering workflows.</h2>
          <p className="section-description">
            Transparent YAML configuration, clean REST contracts, and reproducible local commands. Everything you need to inspect how the MVP functions.
          </p>
        </div>

        {/* Documentation Tab Nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.625rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          <button
            onClick={() => setActiveTab('config')}
            style={{
              padding: '0.7rem 1.35rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              backgroundColor: activeTab === 'config' ? 'var(--color-brand-primary)' : 'var(--color-surface-card)',
              color: activeTab === 'config' ? '#ffffff' : 'var(--color-text-secondary)',
              border: `1px solid ${activeTab === 'config' ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
              boxShadow: activeTab === 'config' ? '0 4px 12px var(--color-brand-glow)' : 'var(--shadow-xs)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <FileCode size={17} /> Configuration Contract (YAML)
          </button>

          <button
            onClick={() => setActiveTab('quickstart')}
            style={{
              padding: '0.7rem 1.35rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              backgroundColor: activeTab === 'quickstart' ? 'var(--color-brand-primary)' : 'var(--color-surface-card)',
              color: activeTab === 'quickstart' ? '#ffffff' : 'var(--color-text-secondary)',
              border: `1px solid ${activeTab === 'quickstart' ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
              boxShadow: activeTab === 'quickstart' ? '0 4px 12px var(--color-brand-glow)' : 'var(--shadow-xs)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Terminal size={17} /> Quickstart Guide
          </button>

          <button
            onClick={() => setActiveTab('api')}
            style={{
              padding: '0.7rem 1.35rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              backgroundColor: activeTab === 'api' ? 'var(--color-brand-primary)' : 'var(--color-surface-card)',
              color: activeTab === 'api' ? '#ffffff' : 'var(--color-text-secondary)',
              border: `1px solid ${activeTab === 'api' ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
              boxShadow: activeTab === 'api' ? '0 4px 12px var(--color-brand-glow)' : 'var(--shadow-xs)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Server size={17} /> Local API Contract
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            style={{
              padding: '0.7rem 1.35rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              backgroundColor: activeTab === 'safety' ? 'var(--color-brand-primary)' : 'var(--color-surface-card)',
              color: activeTab === 'safety' ? '#ffffff' : 'var(--color-text-secondary)',
              border: `1px solid ${activeTab === 'safety' ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
              boxShadow: activeTab === 'safety' ? '0 4px 12px var(--color-brand-glow)' : 'var(--shadow-xs)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <ShieldCheck size={17} /> Validation & Safety Rules
          </button>
        </div>

        {/* Tab Content Box */}
        <div
          style={{
            backgroundColor: '#090d16',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #1e293b',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            color: '#e2e8f0'
          }}
        >
          {/* Tab 1: Configuration YAML */}
          {activeTab === 'config' && (
            <div>
              <div
                style={{
                  padding: '0.85rem 1.25rem',
                  backgroundColor: '#131b2e',
                  borderBottom: '1px solid #1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                  dependency-guardian.yml (Project Configuration Specification)
                </span>
                <button
                  onClick={() => handleCopy(CONFIG_EXAMPLE_YAML, 'config')}
                  style={{
                    color: copied === 'config' ? '#10b981' : '#a5b4fc',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem'
                  }}
                >
                  {copied === 'config' ? <Check size={14} /> : <Copy size={14} />}
                  {copied === 'config' ? 'Copied YAML' : 'Copy Spec'}
                </button>
              </div>
              <pre
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  lineHeight: 1.6,
                  padding: '1.5rem',
                  margin: 0,
                  overflowX: 'auto',
                  color: '#cbd5e1'
                }}
              >
                <code>{CONFIG_EXAMPLE_YAML}</code>
              </pre>
            </div>
          )}

          {/* Tab 2: Quickstart Guide */}
          {activeTab === 'quickstart' && (
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '1.25rem' }}>
                Reproducible Local MVP Setup
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#818cf8', marginBottom: '0.4rem' }}>
                    1. Start the Local Python FastAPI Backend
                  </div>
                  <pre style={{ backgroundColor: '#05070d', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #1e293b', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#4ade80' }}>
                    <code>python -m uvicorn app.main:app --port 8765 --host 127.0.0.1</code>
                  </pre>
                </div>

                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#818cf8', marginBottom: '0.4rem' }}>
                    2. Launch Simulated REST Services (Users, Payments, Search)
                  </div>
                  <pre style={{ backgroundColor: '#05070d', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #1e293b', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#4ade80' }}>
                    <code>python demo-services/run_simulators.py  # Ports 8001, 8002, 8003, 8004</code>
                  </pre>
                </div>

                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#818cf8', marginBottom: '0.4rem' }}>
                    3. Install & Launch the VS Code Extension
                  </div>
                  <pre style={{ backgroundColor: '#05070d', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #1e293b', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#4ade80' }}>
                    <code>code --install-extension dependency-guardian.vsix</code>
                  </pre>
                  <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                    Open your workspace, press <code>Ctrl+Shift+P</code>, and run <code>Dependency Guardian: Create Baseline</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Local API Contract */}
          {activeTab === 'api' && (
            <div style={{ padding: '1.5rem', overflowX: 'auto' }}>
              <div style={{ marginBottom: '1rem', fontSize: '0.8125rem', color: '#94a3b8' }}>
                Local FastAPI Endpoints (Base URL: <code>http://127.0.0.1:8765</code>)
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e293b', textAlign: 'left', color: '#818cf8' }}>
                    <th style={{ padding: '0.6rem 0.75rem', width: '80px' }}>METHOD</th>
                    <th style={{ padding: '0.6rem 0.75rem' }}>ENDPOINT</th>
                    <th style={{ padding: '0.6rem 0.75rem', fontFamily: 'var(--font-sans)' }}>DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody>
                  {apiEndpoints.map((ep, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #131b2e' }}>
                      <td style={{ padding: '0.6rem 0.75rem', color: ep.method === 'GET' ? '#60a5fa' : '#34d399', fontWeight: 700 }}>
                        {ep.method}
                      </td>
                      <td style={{ padding: '0.6rem 0.75rem', color: '#f1f5f9' }}>
                        {ep.path}
                      </td>
                      <td style={{ padding: '0.6rem 0.75rem', color: '#94a3b8', fontFamily: 'var(--font-sans)' }}>
                        {ep.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 4: Validation & Safety Rules */}
          {activeTab === 'safety' && (
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '1rem' }}>
                Strict Engineering Invariants
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div style={{ backgroundColor: '#131b2e', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #1e293b' }}>
                  <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                    1. No Silent Disk Writes
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    Every file modification requires unified diff review and explicit developer approval action.
                  </p>
                </div>

                <div style={{ backgroundColor: '#131b2e', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #1e293b' }}>
                  <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                    2. Mandatory Sandboxed Pytest Run
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    Validation command executes against patched files with strict timeout limits before apply is enabled.
                  </p>
                </div>

                <div style={{ backgroundColor: '#131b2e', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #1e293b' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                    3. Semantic Uncertainty Lock
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    Ambiguous value shifts (e.g. payment status enums) automatically trigger a safety brake prohibiting auto-repair.
                  </p>
                </div>

                <div style={{ backgroundColor: '#131b2e', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #1e293b' }}>
                  <div style={{ color: '#60a5fa', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                    4. Preserved Baseline Integrity
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    Later probes never overwrite saved known-good baselines without explicit developer baseline promotion.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
