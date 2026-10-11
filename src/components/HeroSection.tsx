import React from 'react';
import { ArrowRight, Terminal, Cpu, ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="section-wrapper subtle-grid-bg" style={{ paddingTop: '4.5rem', paddingBottom: '3.5rem' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        {/* Technical Eyebrow Specification */}
        <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          <div className="section-eyebrow" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
            <span className="status-dot pulsing" style={{ color: 'var(--color-brand-primary)' }}></span>
            <span>RFC-9110 HTTP/JSON RUNTIME COMPATIBILITY MONITORING</span>
          </div>
        </div>

        {/* Main Headline with Production Gradient */}
        <h1
          style={{
            maxWidth: '960px',
            margin: '0 auto 1.6rem auto',
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
            maxWidth: '740px',
            margin: '0 auto 2.75rem auto',
            fontSize: '1.25rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
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
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}
        >
          <a
            href="#extension-showcase"
            className="btn btn-primary btn-lg"
            id="hero-primary-cta"
          >
            Explore the Extension <ArrowRight size={18} />
          </a>

          <a
            href="#how-it-works"
            className="btn btn-secondary btn-lg"
            id="hero-secondary-cta"
          >
            See How It Works <ArrowDown size={16} />
          </a>

          <a
            href="#architecture"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--color-brand-primary)',
              padding: '0.5rem 0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
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
            padding: '0.65rem 1.25rem',
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xs)',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-secondary)'
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }} />
            <span>ENV: LOCALHOST_LOOPBACK (127.0.0.1)</span>
          </span>
          <span style={{ color: 'var(--color-border-hover)' }}>|</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Cpu size={13} style={{ color: 'var(--color-brand-primary)' }} />
            <span>DETECTION: DETERMINISTIC_DIFFS</span>
          </span>
          <span style={{ color: 'var(--color-border-hover)' }}>|</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Terminal size={13} style={{ color: 'var(--color-text-secondary)' }} />
            <span>SAFETY: PYTEST_GATED_APPROVAL</span>
          </span>
        </div>
      </div>
    </section>
  );
};
