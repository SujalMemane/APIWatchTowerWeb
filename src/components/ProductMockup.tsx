import React, { useState } from 'react';
import { 
  CheckCircle2, 
  FileCode2, 
  Terminal, 
  ArrowRight, 
  ShieldAlert, 
  GitCommit, 
  Clock, 
  Check, 
  RotateCcw,
  Activity
} from 'lucide-react';
import { API_SCENARIOS } from '../data/mockData';

export const ProductMockup: React.FC = () => {
  const scenario = API_SCENARIOS[0]; // Users API field rename scenario
  const [activeStep, setActiveStep] = useState<number>(5); // default at validated stage
  const [approved, setApproved] = useState<boolean>(false);

  const timelineSteps = [
    { num: 1, title: 'Probe Captured', time: '12:00:01Z' },
    { num: 2, title: 'Baseline Compared', time: '12:00:02Z' },
    { num: 3, title: 'Diff Detected', time: '12:00:02Z' },
    { num: 4, title: 'Impact Mapped', time: '12:00:03Z' },
    { num: 5, title: 'Validated', time: '12:00:04Z' }
  ];

  return (
    <section className="container" style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 3 }}>
      {/* Container Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-default)',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(79, 70, 229, 0.12), 0 0 50px -12px rgba(99, 102, 241, 0.15)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Top Window Bar */}
        <div
          style={{
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            borderBottom: '1px solid #1e293b'
          }}
        >
          {/* Window dots & title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#94a3b8' }}>
              dependency-guardian://incidents/inc_prod_auth0_0942
            </span>
          </div>

          {/* Illustrative data disclaimer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.6875rem',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 600
              }}
            >
              Production Monitored Service • Live Contract Incident
            </span>
            <span
              style={{
                fontSize: '0.6875rem',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                color: '#c7d2fe',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              provider: auth.enterprise-cloud.io
            </span>
          </div>
        </div>

        {/* Activity Timeline Navigation */}
        <div
          style={{
            backgroundColor: '#1e293b',
            borderBottom: '1px solid #334155',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflowX: 'auto',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <Clock size={14} style={{ color: '#94a3b8' }} />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Lifecycle:
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'nowrap' }}>
            {timelineSteps.map((step, idx) => {
              const isPast = step.num <= activeStep;
              const isCurrent = step.num === activeStep;
              return (
                <React.Fragment key={step.num}>
                  <button
                    onClick={() => setActiveStep(step.num)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? '#ffffff' : isPast ? '#a5b4fc' : '#64748b',
                      backgroundColor: isCurrent ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px',
                      border: isCurrent ? '1px solid #818cf8' : '1px solid transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <span
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: isCurrent ? '#4f46e5' : isPast ? '#312e81' : '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.625rem',
                        color: '#ffffff'
                      }}
                    >
                      {isPast ? <Check size={10} /> : step.num}
                    </span>
                    {step.title}
                  </button>
                  {idx < timelineSteps.length - 1 && (
                    <ArrowRight size={12} style={{ color: '#475569', flexShrink: 0 }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 3-Panel Main Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            backgroundColor: '#ffffff'
          }}
        >
          {/* Panel A: Detected API Change */}
          <div
            style={{
              padding: '1.5rem',
              borderRight: '1px solid var(--color-border-subtle)',
              borderBottom: '1px solid var(--color-border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={16} style={{ color: 'var(--color-danger)' }} />
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>1. Detected API Change</h4>
              </div>
              <span className="status-pill danger">
                <span className="status-dot"></span> High Risk
              </span>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-surface-muted)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                border: '1px solid var(--color-border-subtle)',
                marginBottom: '1rem',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Endpoint:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>GET /api/v2/users/usr_98a72</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Provider:</span>
                <span style={{ color: 'var(--color-brand-primary)', fontWeight: 600 }}>Customer Identity API (Auth0 / REST)</span>
              </div>
            </div>

            {/* Field Diff Inspection */}
            <div
              style={{
                backgroundColor: '#090d16',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
                color: '#e2e8f0',
                border: '1px solid #1e293b',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Animated Radar Scanning Line */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.8), rgba(56, 189, 248, 0.9), transparent)',
                  boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)',
                  animation: 'radar-scan 3.5s infinite ease-in-out',
                  pointerEvents: 'none'
                }}
              />
              <div style={{ color: '#64748b', marginBottom: '0.4rem', fontSize: '0.6875rem' }}>// JSON Schema Mutation (Deterministic Rule Match)</div>
              <div style={{ color: '#94a3b8' }}>&#123;</div>
              <div style={{ paddingLeft: '1rem', color: '#94a3b8' }}>"id": "u_123",</div>
              <div
                style={{
                  paddingLeft: '1rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  color: '#fca5a5',
                  borderLeft: '3px solid #ef4444',
                  margin: '2px 0'
                }}
              >
                - "name": "Alice Henderson", <span style={{ color: '#ef4444', fontSize: '0.6875rem' }}>// REMOVED</span>
              </div>
              <div
                style={{
                  paddingLeft: '1rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  color: '#86efac',
                  borderLeft: '3px solid #10b981',
                  margin: '2px 0'
                }}
              >
                + "display_name": "Alice Henderson", <span style={{ color: '#10b981', fontSize: '0.6875rem' }}>// ADDED</span>
              </div>
              <div style={{ paddingLeft: '1rem', color: '#94a3b8' }}>"email": "alice@example.com"</div>
              <div style={{ color: '#94a3b8' }}>&#125;</div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.75rem', lineHeight: 1.5 }}>
              Deterministic rule matched scalar value and string type. Classified as candidate field rename.
            </p>
          </div>

          {/* Panel B: Impacted Code */}
          <div
            style={{
              padding: '1.5rem',
              borderRight: '1px solid var(--color-border-subtle)',
              borderBottom: '1px solid var(--color-border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCode2 size={16} style={{ color: 'var(--color-brand-primary)' }} />
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>2. Impacted Code Workflow</h4>
              </div>
              <span className="status-pill warning">
                <span className="status-dot"></span> Configured Workflow
              </span>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-surface-muted)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                border: '1px solid var(--color-border-subtle)',
                marginBottom: '1rem',
                fontSize: '0.8125rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Service Workflow:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Customer Account Profile Sync</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>File:</span>
                <span style={{ color: 'var(--color-text-secondary)' }}>src/services/identity/user_service.py:42</span>
              </div>
            </div>

            {/* Code Snippet */}
            <div
              style={{
                backgroundColor: '#090d16',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
                color: '#e2e8f0',
                border: '1px solid #1e293b'
              }}
            >
              <div style={{ color: '#64748b', marginBottom: '0.4rem', fontSize: '0.6875rem' }}>// user_service.py line 40-44</div>
              <div style={{ color: '#c084fc' }}>def <span style={{ color: '#60a5fa' }}>get_user_profile</span>(user_id):</div>
              <div style={{ paddingLeft: '1rem', color: '#94a3b8' }}>payload = fetch_user(user_id)</div>
              <div style={{ paddingLeft: '1rem', color: '#c084fc' }}>return &#123;</div>
              <div
                style={{
                  paddingLeft: '2rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  color: '#fca5a5',
                  borderLeft: '3px solid #ef4444'
                }}
              >
                "name": payload[<span style={{ color: '#f87171' }}>"name"</span>], <span style={{ color: '#f87171' }}># KeyError!</span>
              </div>
              <div style={{ paddingLeft: '2rem', color: '#94a3b8' }}>"email": payload["email"]</div>
              <div style={{ paddingLeft: '1rem', color: '#c084fc' }}>&#125;</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              <GitCommit size={14} style={{ color: 'var(--color-brand-primary)' }} />
              <span>Associated Test: <code>tests/integration/test_user_profile.py</code></span>
            </div>
          </div>

          {/* Panel C: Repair Proposal & Validation */}
          <div
            style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--color-border-subtle)',
              backgroundColor: '#fafbfd'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>3. Repair Preview & Validation</h4>
              </div>
              <span className={`status-pill ${approved ? 'neutral' : 'success'}`}>
                <span className="status-dot"></span> {approved ? 'Patch Applied' : 'Validation Passed'}
              </span>
            </div>

            {/* Diff Preview */}
            <div
              style={{
                backgroundColor: '#090d16',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                lineHeight: 1.6,
                color: '#e2e8f0',
                border: '1px solid #1e293b',
                marginBottom: '0.85rem'
              }}
            >
              <div style={{ color: '#64748b', marginBottom: '0.4rem', fontSize: '0.6875rem' }}>// Proposed Compatibility Adapter</div>
              <div style={{ color: '#64748b' }}>@@ -42,1 +42,2 @@</div>
              <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '0 0.25rem' }}>
                - "name": payload["name"],
              </div>
              <div style={{ color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '0 0.25rem' }}>
                + "name": payload.get("display_name", payload.get("name")),
              </div>
            </div>

            {/* Validation Runner Console */}
            <div
              style={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: 'var(--radius-md)',
                padding: '0.65rem 0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#94a3b8',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', marginBottom: '0.2rem' }}>
                <Terminal size={12} style={{ color: '#10b981' }} />
                <span>$ {scenario.validation.command} <span style={{ animation: 'blink-cursor 1s infinite', color: '#10b981', fontWeight: 700 }}>_</span></span>
              </div>
              <div style={{ color: '#10b981' }}>{scenario.validation.output}</div>
              <div style={{ color: '#64748b', fontSize: '0.6875rem' }}>Execution time: 142ms • Exit status: 0</div>
            </div>

            {/* Actions: Approve / Rollback */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {!approved ? (
                <button
                  onClick={() => setApproved(true)}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Check size={14} /> Explicitly Approve & Apply Patch
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: 'var(--color-success-surface)',
                      color: 'var(--color-success-text)',
                      border: '1px solid var(--color-success-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.45rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Check size={13} /> Patch Applied Safely
                  </div>
                  <button
                    onClick={() => setApproved(false)}
                    className="btn btn-secondary btn-sm"
                    title="Roll back applied patch"
                  >
                    <RotateCcw size={13} /> Roll Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer status notice */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '0.75rem 1.25rem',
            borderTop: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={13} style={{ color: 'var(--color-brand-primary)' }} />
            <span>Interactive Incident Inspector: Click lifecycle steps or test the approval button above.</span>
          </div>
          <div>
            <span>Rollback safety: Target file original hash preserved in SQLite.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
