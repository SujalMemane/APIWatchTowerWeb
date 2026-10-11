import React from 'react';
import { Clock, ShieldCheck, Eye, Check } from 'lucide-react';

export const BusinessValue: React.FC = () => {
  const pillars = [
    {
      icon: <Clock size={22} style={{ color: 'var(--color-brand-primary)' }} />,
      title: 'Faster Investigation',
      target: 'Reduced triage overhead',
      summary: 'Replace days of digging through network logs with immediate structural diffs that highlight exactly what changed upstream.',
      bulletPoints: [
        'Deterministic diffs highlight added, removed, and type-mutated properties',
        'Direct link to configured application workflows and files',
        'Zero time spent guessing whether an outage is internal or upstream'
      ]
    },
    {
      icon: <ShieldCheck size={22} style={{ color: 'var(--color-success)' }} />,
      title: 'More Informed Repairs',
      target: 'High-confidence fixes',
      summary: 'Review proposed compatibility adapters with stated assumptions and pre-application test validation runs.',
      bulletPoints: [
        'Scoped adapters for field renames and cursor pagination',
        'Pre-application sandbox test execution gates disk writes',
        'Semantic uncertainty brakes block hazardous automated guesses'
      ]
    },
    {
      icon: <Eye size={22} style={{ color: 'var(--color-info)' }} />,
      title: 'Better Engineering Visibility',
      target: 'Organized dependency risk',
      summary: 'Keep track of all third-party and internal API contracts directly within developer workspaces.',
      bulletPoints: [
        'Structured service health and probe statuses in VS Code',
        'Immutable SQLite audit log of baselines, scans, and repairs',
        'Instant 1-click rollback guarantees complete operational reversibility'
      ]
    }
  ];

  return (
    <section className="section-wrapper" id="business-value">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Engineering Leadership & Team Value</span>
          </div>
          <h2 className="section-title">Give engineering teams more context, earlier.</h2>
          <p className="section-description">
            Dependency Guardian bridges the gap between third-party service unpredictability and internal software reliability through structured, disciplined verification.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="feature-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-surface-muted)',
                      border: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--color-text-secondary)',
                      backgroundColor: 'rgba(15, 23, 42, 0.05)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--color-border-default)'
                    }}
                  >
                    {pillar.target}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.85rem', color: 'var(--color-text-primary)', letterSpacing: '-0.025em' }}>
                  {pillar.title}
                </h3>

                <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  {pillar.summary}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {pillar.bulletPoints.map((bp, bidx) => (
                    <li key={bidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      <Check size={16} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '3px' }} />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Distinction Banner: 4 Distinct Stages */}
        <div
          style={{
            backgroundColor: 'rgba(238, 242, 255, 0.55)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            border: '1px solid rgba(129, 140, 248, 0.35)',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 2rem auto' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.65rem', letterSpacing: '-0.02em' }}>
              Disciplined Separation of Concerns
            </h4>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
              Dependency Guardian deliberately separates each phase of incident lifecycle to eliminate dangerous assumptions:
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              textAlign: 'center'
            }}
          >
            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontWeight: 800, fontSize: '0.975rem', color: 'var(--color-brand-primary)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                1. Detect Change
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                Identifies observed difference from baseline
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontWeight: 800, fontSize: '0.975rem', color: 'var(--color-brand-primary)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                2. Map Impact
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                Traces declared workflows, files, and tests
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontWeight: 800, fontSize: '0.975rem', color: 'var(--color-brand-primary)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                3. Propose Fix
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                Presents adapter diff with explicit assumptions
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '1.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontWeight: 800, fontSize: '0.975rem', color: 'var(--color-brand-primary)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                4. Validate & Approve
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                Sandboxed tests must pass before developer signs off
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
