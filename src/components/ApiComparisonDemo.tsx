import React, { useState } from 'react';
import { 
  ShieldAlert, 
  FileCode2, 
  CheckCircle2, 
  Lock,
  Copy,
  Check
} from 'lucide-react';
import { API_SCENARIOS } from '../data/mockData';

export const ApiComparisonDemo: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(API_SCENARIOS[0].id);
  const [copiedSide, setCopiedSide] = useState<'baseline' | 'observed' | null>(null);

  const handleCopyJson = (data: any, side: 'baseline' | 'observed') => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedSide(side);
    setTimeout(() => setCopiedSide(null), 2000);
  };

  const currentScenario = API_SCENARIOS.find(s => s.id === selectedScenarioId) || API_SCENARIOS[0];

  return (
    <section className="section-wrapper" id="interactive-demo">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Interactive Diff Sandbox</span>
          </div>
          <h2 className="section-title">See the exact diff. Understand the exact break.</h2>
          <p className="section-description">
            Explore how Dependency Guardian contrasts known-good baselines with incoming API payloads across real-world enterprise production incidents.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {API_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-surface-subtle)',
                  color: isSelected ? '#ffffff' : 'var(--color-text-primary)',
                  border: `1px solid ${isSelected ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isSelected ? '0 4px 12px var(--color-brand-glow)' : 'var(--shadow-xs)'
                }}
              >
                <span>{sc.serviceName}</span>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-surface-raised)',
                    color: isSelected ? '#ffffff' : 'var(--color-text-muted)'
                  }}
                >
                  {sc.id === 'identity-rename' ? 'Auth0 / Okta' : sc.id === 'search-pagination' ? 'Algolia' : 'Stripe'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-default)',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden'
          }}
        >
          {/* Top Bar with Status and Target */}
          <div
            style={{
              backgroundColor: '#0f172a',
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid #1e293b'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  backgroundColor: '#1e293b',
                  color: '#60a5fa',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px'
                }}
              >
                {currentScenario.method}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: '#f8fafc', fontWeight: 600 }}>
                {currentScenario.endpoint}
              </span>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>
                • target: {currentScenario.id === 'identity-rename' ? 'auth.enterprise-cloud.io' : currentScenario.id === 'search-pagination' ? 'search.enterprise-catalog.io' : 'api.stripe.com/v1'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  backgroundColor: currentScenario.severity === 'HIGH' 
                    ? 'rgba(239, 68, 68, 0.2)' 
                    : currentScenario.severity === 'UNCERTAIN'
                    ? 'rgba(245, 158, 11, 0.2)'
                    : 'rgba(59, 130, 246, 0.2)',
                  color: currentScenario.severity === 'HIGH' 
                    ? '#fca5a5' 
                    : currentScenario.severity === 'UNCERTAIN'
                    ? '#fcd34d'
                    : '#93c5fd',
                  border: `1px solid ${
                    currentScenario.severity === 'HIGH' ? '#ef4444' : currentScenario.severity === 'UNCERTAIN' ? '#f59e0b' : '#3b82f6'
                  }`
                }}
              >
                {currentScenario.severity === 'UNCERTAIN' ? 'SEMANTIC UNCERTAINTY' : `${currentScenario.severity} RISK`}
              </span>
              <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                Production contract snapshot
              </span>
            </div>
          </div>

          {/* Side by Side Diff Panels */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              backgroundColor: '#090d16',
              borderBottom: '1px solid #1e293b'
            }}
          >
            {/* Left Panel: Baseline */}
            <div
              style={{
                padding: '1.75rem 2rem',
                borderRight: '1px solid #1e293b'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: '#cbd5e1', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
                  Preserved Baseline (Known-Good V1)
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleCopyJson(currentScenario.baselineResponse, 'baseline')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.75rem',
                      color: copiedSide === 'baseline' ? '#10b981' : '#cbd5e1',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid #334155',
                      borderRadius: '4px',
                      padding: '0.2rem 0.55rem',
                      cursor: 'pointer'
                    }}
                    title="Copy Baseline JSON"
                  >
                    {copiedSide === 'baseline' ? <Check size={12} /> : <Copy size={12} />}
                    {copiedSide === 'baseline' ? 'Copied' : 'Copy'}
                  </button>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#34d399', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.55rem', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    SQLite Snapshot #1
                  </span>
                </div>
              </div>
              <pre
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                  color: '#e2e8f0',
                  overflowX: 'auto',
                  margin: 0
                }}
              >
                <code>{JSON.stringify(currentScenario.baselineResponse, null, 2)}</code>
              </pre>
            </div>

            {/* Right Panel: Observed */}
            <div
              style={{
                padding: '1.75rem 2rem',
                backgroundColor: '#070a12'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: '#fca5a5', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
                  Observed Response (Current Probe V2)
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleCopyJson(currentScenario.observedResponse, 'observed')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.75rem',
                      color: copiedSide === 'observed' ? '#10b981' : '#cbd5e1',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid #334155',
                      borderRadius: '4px',
                      padding: '0.2rem 0.55rem',
                      cursor: 'pointer'
                    }}
                    title="Copy Observed JSON"
                  >
                    {copiedSide === 'observed' ? <Check size={12} /> : <Copy size={12} />}
                    {copiedSide === 'observed' ? 'Copied' : 'Copy'}
                  </button>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#f87171', backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '0.2rem 0.55rem', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    Difference Detected
                  </span>
                </div>
              </div>
              <pre
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                  color: '#e2e8f0',
                  overflowX: 'auto',
                  margin: 0
                }}
              >
                <code>{JSON.stringify(currentScenario.observedResponse, null, 2)}</code>
              </pre>
            </div>
          </div>

          {/* Impact & Safety Engine Analysis Footer */}
          <div
            style={{
              padding: '2.25rem',
              backgroundColor: '#ffffff',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '2rem'
            }}
          >
            {/* Col 1: Diff Explanation */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                <ShieldAlert size={18} style={{ color: 'var(--color-danger)' }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Change Analysis
                </span>
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                {currentScenario.explanation}
              </p>
            </div>

            {/* Col 2: Affected Code */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                <FileCode2 size={18} style={{ color: 'var(--color-brand-primary)' }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Affected Configured Code
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-brand-primary)', backgroundColor: 'var(--color-brand-surface)', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '0.5rem', fontWeight: 600 }}>
                {currentScenario.affectedWorkflow.sourceFile}:{currentScenario.affectedWorkflow.affectedLine}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                Workflow: <strong>{currentScenario.affectedWorkflow.name}</strong> • Test: <code>{currentScenario.affectedWorkflow.testFile}</code>
              </div>
            </div>

            {/* Col 3: Engine Action */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                {currentScenario.proposedRepair.canAutoRepair ? (
                  <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />
                ) : (
                  <Lock size={18} style={{ color: 'var(--color-warning)' }} />
                )}
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {currentScenario.proposedRepair.canAutoRepair ? 'Assisted Repair Available' : 'Safety Lock Engaged'}
                </span>
              </div>
              <div style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                {currentScenario.proposedRepair.canAutoRepair ? (
                  <span>
                    Strategy: <strong>{currentScenario.proposedRepair.strategy}</strong>. Verified against pytest suite ({currentScenario.validation.passCount}/{currentScenario.validation.testCount} tests).
                  </span>
                ) : (
                  <span style={{ color: 'var(--color-warning-text)' }}>
                    {currentScenario.proposedRepair.blockReason}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
