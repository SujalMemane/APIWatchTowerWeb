import React, { useState } from 'react';
import { 
  Database, 
  Binary, 
  GitBranch, 
  Wrench, 
  CheckCircle2, 
  Shield, 
  Code2,
  ArrowLeft,
  ArrowRight,
  Check
} from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/mockData';

const STEP_SHORT_TITLES = [
  'Establish Baseline',
  'Detect Diffs',
  'Map Impact',
  'Review Adapter',
  'Validate in Sandbox'
];

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

  const handleStepChange = (idx: number) => {
    if (idx >= 0 && idx < WORKFLOW_STEPS.length) {
      setSelectedStepIndex(idx);
    }
  };

  return (
    <section className="section-wrapper" id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>How It Works</span>
          </div>
          <h2 className="section-title">From API change to actionable repair.</h2>
          <p className="section-description">
            A deterministic, developer-first pipeline designed to shorten investigation while guaranteeing that no unverified code is ever committed.
          </p>
        </div>

        {/* Step Navigation Pipeline Bar with Animated Dot-Dot Connectors */}
        <div className="workflow-pipeline-bar">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isSelected = idx === selectedStepIndex;
            const isCompleted = idx < selectedStepIndex;
            const hasNext = idx < WORKFLOW_STEPS.length - 1;
            const isConnectorActive = idx === selectedStepIndex || idx === selectedStepIndex - 1;

            return (
              <React.Fragment key={step.stepNumber}>
                <button
                  onClick={() => handleStepChange(idx)}
                  className={`workflow-step-node ${isSelected ? 'active' : isCompleted ? 'completed' : ''}`}
                  title={step.title}
                  aria-label={`Step ${step.stepNumber}: ${STEP_SHORT_TITLES[idx]}`}
                >
                  <span
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.25)' : isCompleted ? 'var(--color-brand-primary)' : 'var(--color-surface-raised)',
                      color: isSelected ? '#ffffff' : isCompleted ? '#ffffff' : 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    {isCompleted ? <Check size={12} strokeWidth={3} /> : step.stepNumber}
                  </span>
                  <span>{STEP_SHORT_TITLES[idx]}</span>
                </button>

                {/* Animated Connecting Dot-Dot Line between nodes */}
                {hasNext && (
                  <div
                    className={`workflow-connector-line ${
                      isCompleted ? 'completed' : isConnectorActive ? 'active-flow' : ''
                    }`}
                    aria-hidden="true"
                  >
                    {isConnectorActive && <div className="flow-dot-runner" />}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Main Step Detail Display Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-default)',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden'
          }}
        >
          {/* Animated 2-Column Grid */}
          <div
            key={selectedStepIndex}
            className="workflow-detail-grid workflow-card-animated"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(340px, 1fr) minmax(360px, 1.25fr)'
            }}
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

                <p style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text-secondary)', marginBottom: '1.75rem' }}>
                  {currentStep.description}
                </p>

                {/* Status Badge */}
                <div style={{ marginBottom: '1.5rem' }}>
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

          {/* Bottom Step Controller Footer with Next/Back and Animated Dot-Dot Connector Track */}
          <div className="workflow-bottom-nav">
            {/* Back Button */}
            <button
              onClick={() => handleStepChange(selectedStepIndex - 1)}
              disabled={selectedStepIndex === 0}
              className="workflow-nav-btn prev-btn"
              title={selectedStepIndex > 0 ? `Back to Step ${selectedStepIndex}: ${STEP_SHORT_TITLES[selectedStepIndex - 1]}` : 'At First Step'}
            >
              <ArrowLeft size={16} />
              <span>Previous Step</span>
            </button>

            {/* Center Flow Progress & Dot-Dot Connector Track */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                Step <strong style={{ color: 'var(--color-text-primary)' }}>{selectedStepIndex + 1}</strong> of <strong style={{ color: 'var(--color-text-primary)' }}>5</strong>
              </span>

              {/* Dot-dot line connecting track */}
              <div className="workflow-flow-dots-track" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => {
                  const isCurrent = i === selectedStepIndex;
                  const isPast = i < selectedStepIndex;
                  const hasNextDot = i < 4;
                  const isConnectorFlowing = i === selectedStepIndex || i === selectedStepIndex - 1;

                  return (
                    <React.Fragment key={i}>
                      <button
                        onClick={() => handleStepChange(i)}
                        className={`flow-dot-pill ${isCurrent ? 'active' : isPast ? 'completed' : ''}`}
                        title={`Step ${i + 1}: ${STEP_SHORT_TITLES[i]}`}
                      >
                        {isPast ? '✓' : i + 1}
                      </button>

                      {hasNextDot && (
                        <div
                          className={`flow-dot-connector ${
                            isPast ? 'completed' : isConnectorFlowing ? 'active' : ''
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            {selectedStepIndex < 4 ? (
              <button
                onClick={() => handleStepChange(selectedStepIndex + 1)}
                className="workflow-nav-btn next-btn"
                title={`Next Step: ${STEP_SHORT_TITLES[selectedStepIndex + 1]}`}
              >
                <span>Next: {STEP_SHORT_TITLES[selectedStepIndex + 1]}</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <a
                href="#interactive-demo"
                className="workflow-nav-btn finish-btn"
                title="Explore live comparison sandbox"
              >
                <span>Try Sandbox Demo</span>
                <ArrowRight size={16} />
              </a>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .workflow-detail-grid {
              grid-template-columns: 1fr !important;
            }
            .workflow-pipeline-bar {
              justify-content: flex-start !important;
            }
            .workflow-bottom-nav {
              flex-direction: column;
              align-items: stretch;
              gap: 1rem;
            }
            .workflow-bottom-nav > div {
              justify-content: center;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
