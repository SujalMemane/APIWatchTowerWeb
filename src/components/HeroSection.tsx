import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  ArrowDown, 
  Activity, 
  Zap, 
  ShieldCheck, 
  GitBranch 
} from 'lucide-react';

const ROTATING_PUNCHLINES = [
  'before they break your code.',
  'before they crash production.',
  'before users hit regressions.',
  'before checkout flows fail.',
  'before tests fail silently.'
];

export const HeroSection: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [animState, setAnimState] = useState<'idle' | 'exiting' | 'entering'>('idle');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimState('exiting');
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % ROTATING_PUNCHLINES.length);
        setAnimState('entering');
        setTimeout(() => {
          setAnimState('idle');
        }, 50);
      }, 320);
    }, 3400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-wrapper subtle-grid-bg" style={{ paddingTop: '3.75rem', paddingBottom: '2.5rem', overflow: 'hidden' }}>
      {/* Radiant Aurora Mesh Backdrop */}
      <div className="hero-aurora-mesh" aria-hidden="true" />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Sleek Technical Eyebrow with Radar Beacon Animation */}
        <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          <div className="section-eyebrow">
            <span className="radar-beacon">
              <span className="radar-beacon-dot" />
              <span className="radar-beacon-wave" />
            </span>
            <span>API Contract & Runtime Intelligence</span>
          </div>
        </div>

        {/* Main Headline with Dynamic Rotating Text Animation & Shimmer Gradient */}
        <h1
          style={{
            maxWidth: '1020px',
            margin: '0 auto 1.75rem auto',
            letterSpacing: '-0.04em',
            lineHeight: 1.15
          }}
        >
          Catch breaking API changes{' '}
          <span className="hero-rotating-wrapper">
            <span
              className={`text-gradient-hero-animated hero-rotating-text ${
                animState === 'exiting' ? 'is-exiting' : animState === 'entering' ? 'is-entering' : ''
              }`}
            >
              {ROTATING_PUNCHLINES[phraseIndex]}
            </span>
            <span className="hero-typing-cursor">|</span>
            <svg
              className="hero-underline-svg"
              viewBox="0 0 320 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              key={phraseIndex}
            >
              <path
                className="hero-underline-path"
                d="M2 9C80 3 240 3 318 7"
                stroke="url(#hero-underline-grad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="hero-underline-grad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="0.5" stopColor="#a855f7" />
                  <stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* Supporting Subhead with Attention-Grabbing Highlighted Points */}
        <p className="hero-subhead">
          Dependency Guardian detects{' '}
          <span className="hero-highlight-point highlight-warn" title="Contract & Schema Mutation Detection">
            <span className="highlight-ping warn" />
            <span>unexpected API changes</span>
          </span>
          , shows which parts of your code{' '}
          <span className="hero-highlight-point highlight-brand" title="AST Workflow Impact Tracing">
            <span className="highlight-ping brand" />
            <span>may be affected</span>
          </span>
          , and helps your team{' '}
          <span className="hero-highlight-point highlight-success" title="Pre-apply Pytest Sandbox Verification">
            <span className="highlight-ping success" />
            <span>investigate and validate repairs</span>
          </span>{' '}
          — directly in the developer workflow.
        </p>

        {/* Attention Highlight Chips */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.25rem'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.28)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#92400e',
              boxShadow: '0 1px 3px rgba(245, 158, 11, 0.06)'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            <span>Zero Undetected Schema Drifts</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.28)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#4338ca',
              boxShadow: '0 1px 3px rgba(99, 102, 241, 0.06)'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
            <span>AST Code & Test Impact Tracing</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.28)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#065f46',
              boxShadow: '0 1px 3px rgba(16, 185, 129, 0.06)'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span>Pytest-Gated Fix Verification</span>
          </div>
        </div>

        {/* CTA Button Group */}
        <div
          className="hero-cta-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          <a
            href="#extension-showcase"
            className="btn btn-primary btn-lg"
            id="hero-primary-cta"
            style={{ fontSize: '1.0625rem', padding: '0.95rem 1.85rem' }}
          >
            Explore the Extension <ArrowRight size={18} />
          </a>

          <a
            href="#how-it-works"
            className="btn btn-secondary btn-lg"
            id="hero-secondary-cta"
            style={{ fontSize: '1.0625rem', padding: '0.95rem 1.85rem' }}
          >
            See How It Works <ArrowDown size={16} />
          </a>

          <a
            href="#architecture"
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--color-brand-primary)',
              padding: '0.6rem 0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'none'
            }}
            id="hero-tertiary-link"
          >
            Explore Architecture &rarr;
          </a>
        </div>

        {/* Engineering System Invariants Strip with Live Micro-Animations */}
        <div
          className="invariants-strip"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '0.625rem 1.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xs)',
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)'
          }}
        >
          <span className="invariants-badge" style={{ color: 'var(--color-text-primary)' }}>
            <span className="invariants-dot-live" />
            <span>Upstream Dependency Probes</span>
          </span>
          <span className="invariants-sep" style={{ color: 'var(--color-border-hover)' }}>|</span>
          <span className="invariants-badge">
            <Cpu size={14} className="invariants-icon-spin" />
            <span>Deterministic Structural Diffs</span>
          </span>
          <span className="invariants-sep" style={{ color: 'var(--color-border-hover)' }}>|</span>
          <span className="invariants-badge">
            <Terminal size={14} style={{ color: 'var(--color-text-secondary)' }} />
            <span>Pytest-Gated Approval <span className="invariants-prompt-cursor">_</span></span>
          </span>
        </div>

        {/* Live Engineering Telemetry Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '1.25rem',
            maxWidth: '1100px',
            margin: '2.25rem auto 0 auto',
            width: '100%'
          }}
        >
          <div className="telemetry-card">
            <div className="telemetry-header">
              <span className="telemetry-tag">ENGINE ACCURACY</span>
              <Activity size={16} style={{ color: 'var(--color-brand-primary)' }} />
            </div>
            <div className="telemetry-value">100% Deterministic</div>
            <p className="telemetry-desc">
              AST & RFC-9110 structural diffing without generative hallucinations.
            </p>
          </div>

          <div className="telemetry-card">
            <div className="telemetry-header">
              <span className="telemetry-tag">CAPTURE LATENCY</span>
              <Zap size={16} style={{ color: '#0284c7' }} />
            </div>
            <div className="telemetry-value">&lt;1.2s Detection</div>
            <p className="telemetry-desc">
              Zero-overhead probe capture across staging and production endpoints.
            </p>
          </div>

          <div className="telemetry-card">
            <div className="telemetry-header">
              <span className="telemetry-tag">MUTATION CONTROL</span>
              <ShieldCheck size={16} style={{ color: 'var(--color-success)' }} />
            </div>
            <div className="telemetry-value">Zero Silent Writes</div>
            <p className="telemetry-desc">
              Explicit developer approval + Pytest verification before any code commit.
            </p>
          </div>

          <div className="telemetry-card">
            <div className="telemetry-header">
              <span className="telemetry-tag">STATE RESILIENCE</span>
              <GitBranch size={16} style={{ color: '#8b5cf6' }} />
            </div>
            <div className="telemetry-value">1-Click Rollback</div>
            <p className="telemetry-desc">
              Immutable snapshot lineage with instant revert guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
