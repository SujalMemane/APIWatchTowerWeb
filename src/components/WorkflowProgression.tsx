import React, { useState } from 'react';
import { 
  Database, 
  Binary, 
  GitBranch, 
  Wrench, 
  CheckCircle2, 
  Shield, 
  Code2
} from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/mockData';

export const WorkflowProgression: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const currentStep = WORKFLOW_STEPS[selectedStepIndex];

  const stepIcons = [
    <Database size={18} key="1" />,
    <Binary size={18} key="2" />,
    <GitBranch size={18} key="3" />,
    <Wrench size={18} key="4" />,
    <CheckCircle2 size={18} key="5" />
  ];

  return (
    <section className="section-wrapper" id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
            <span>RUNTIME VERIFICATION PIPELINE</span>
          </div>
          <h2 className="section-title">From API change to actionable repair.</h2>
          <p className="section-description">
            A deterministic, developer-first pipeline designed to shorten investigation while guaranteeing that no unverified code is ever committed.
          </p>
        </div>

        {/* Step Navigation Pill Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}
        >
          {WORKFLOW_STEPS.map((step, idx) => {
            const isSelected = idx === selectedStepIndex;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setSelectedStepIndex(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.65rem 1.125rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'var(--color-surface-subtle)',
                  color: isSelected ? '#ffffff' : 'var(--color-text-secondary)',
                  border: `1px solid ${isSelected ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isSelected ? '0 4px 12px var(--color-brand-glow)' : 'var(--shadow-xs)'
                }}
              >
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'var(--color-surface-raised)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  {step.stepNumber}
                </span>
                <span>{step.title.split(' ')[0]} {step.title.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Main Step Detail Display */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-default)',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 1fr) minmax(360px, 1.25fr)'
          }}
          className="workflow-detail-grid"
        >
          {/* Left Side: Step Narrative */}
          <div
            style={{
              padding: '2.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '1px solid var(--color-border-subtle)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-brand-surface)',
                    color: 'var(--color-brand-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(79, 70, 229, 0.12)'
                  }}
                >
                  {stepIcons[selectedStepIndex]}
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-primary)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
                    Step {currentStep.stepNumber} of 5
                  </span>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{currentStep.subtitle}</div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--color-text-primary)', letterSpacing: '-0.03em', lineHeight: 1.25 }}>
                {currentStep.title}
              </h3>

              <p style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                {currentStep.description}
              </p>

              {/* Status Badge */}
              <div style={{ marginBottom: '1.75rem' }}>
                <span className="status-pill success" style={{ padding: '0.45rem 0.95rem', fontSize: '0.875rem' }}>
                  <span className="status-dot"></span> State: {currentStep.statusBadge}
                </span>
              </div>
            </div>

            {/* Safety Guarantee Callout */}
            <div
              style={{
                backgroundColor: 'rgba(238, 242, 255, 0.55)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid rgba(129, 140, 248, 0.35)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}
            >
              <Shield size={18} style={{ color: 'var(--color-brand-primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-primary)', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
                  Safety Guarantee
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.55, marginTop: '0.2rem' }}>
                  {currentStep.safetyNote}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Technical Artifact Preview */}
          <div
            style={{
              backgroundColor: '#090d16',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#e2e8f0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#cbd5e1', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                <Code2 size={16} style={{ color: '#818cf8' }} />
                <span>{currentStep.technicalArtifact.label}</span>
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  backgroundColor: '#1e293b',
                  color: '#93c5fd',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  border: '1px solid #334155'
                }}
              >
                {currentStep.technicalArtifact.type.toUpperCase()}
              </span>
            </div>

            <pre
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                lineHeight: 1.65,
                backgroundColor: '#05070d',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #1e293b',
                overflowX: 'auto',
                color: '#e2e8f0'
              }}
            >
              <code>{currentStep.technicalArtifact.snippet}</code>
            </pre>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .workflow-detail-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
