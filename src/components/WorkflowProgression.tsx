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
          <div className="section-eyebrow">
            <span>Verified 5-Stage Lifecycle</span>
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
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1fr) minmax(340px, 1.2fr)'
          }}
          className="workflow-detail-grid"
        >
          {/* Left Side: Step Narrative */}
          <div
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '1px solid var(--color-border-subtle)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-brand-surface)',
                    color: 'var(--color-brand-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {stepIcons[selectedStepIndex]}
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-primary)', letterSpacing: '0.05em' }}>
                    Step {currentStep.stepNumber} of 5
                  </span>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{currentStep.subtitle}</div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
                {currentStep.title}
              </h3>

              <p style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--color-text-secondary)', marginBottom: '1.75rem' }}>
                {currentStep.description}
              </p>

              {/* Status Badge */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="status-pill success" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8125rem' }}>
                  <span className="status-dot"></span> State: {currentStep.statusBadge}
                </span>
              </div>
            </div>

            {/* Safety Guarantee Callout */}
            <div
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.625rem'
              }}
            >
              <Shield size={16} style={{ color: 'var(--color-brand-primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-primary)', letterSpacing: '0.04em' }}>
                  Safety Guarantee
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                  {currentStep.safetyNote}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Technical Artifact Preview */}
          <div
            style={{
              backgroundColor: '#090d16',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#e2e8f0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                <Code2 size={14} style={{ color: '#818cf8' }} />
                <span>{currentStep.technicalArtifact.label}</span>
              </div>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: '#1e293b',
                  color: '#94a3b8',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px'
                }}
              >
                {currentStep.technicalArtifact.type.toUpperCase()}
              </span>
            </div>

            <pre
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                lineHeight: 1.55,
                backgroundColor: '#05070d',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #1e293b',
                overflowX: 'auto',
                color: '#cbd5e1'
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
