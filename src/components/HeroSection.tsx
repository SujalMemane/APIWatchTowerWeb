import React from 'react';
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

export const HeroSection: React.FC = () => {
  return (
    <section className="section-wrapper subtle-grid-bg" style={{ paddingTop: '3.75rem', paddingBottom: '2.5rem', overflow: 'hidden' }}>
      {/* Radiant Aurora Mesh Backdrop */}
      <div className="hero-aurora-mesh" aria-hidden="true" />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Sleek Technical Eyebrow */}
        <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          <div className="section-eyebrow">
            <span className="status-dot pulsing" style={{ color: 'var(--color-brand-primary)' }}></span>
            <span>API Contract & Runtime Intelligence</span>
          </div>
        </div>

        {/* Main Headline with Production Gradient */}
        <h1
          style={{
            maxWidth: '980px',
            margin: '0 auto 1.75rem auto',
            letterSpacing: '-0.04em',
            lineHeight: 1.12
          }}
        >
          Catch breaking API changes{' '}
          <span className="text-gradient-hero">before they break your code.</span>
        </h1>

        {/* Supporting Subhead */}
        <p
          style={{
            maxWidth: '780px',
            margin: '0 auto 2.25rem auto',
            fontSize: '1.25rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.75,
            letterSpacing: '-0.01em'
          }}
        >
          Dependency Guardian detects unexpected API changes, shows which parts of your code may be affected, and helps your team investigate and validate repairs — directly in the developer workflow.
        </p>

        {/* CTA Button Group */}
        <div
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

        {/* Engineering System Invariants Strip */}
        <div
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
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }} />
            <span>Upstream Dependency Probes</span>
          </span>
          <span style={{ color: 'var(--color-border-hover)' }}>|</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600 }}>
            <Cpu size={14} style={{ color: 'var(--color-brand-primary)' }} />
            <span>Deterministic Structural Diffs</span>
          </span>
          <span style={{ color: 'var(--color-border-hover)' }}>|</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600 }}>
            <Terminal size={14} style={{ color: 'var(--color-text-secondary)' }} />
            <span>Pytest-Gated Approval</span>
          </span>
        </div>

        {/* Live Engineering Telemetry Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
