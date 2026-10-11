import React from 'react';
import { ArrowRight, Terminal, ShieldCheck, Cpu, ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="section-wrapper subtle-grid-bg" style={{ paddingTop: '4.5rem', paddingBottom: '3.5rem' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        {/* Eyebrow */}
        <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          <div className="section-eyebrow">
            <span className="status-dot pulsing" style={{ color: 'var(--color-brand-primary)' }}></span>
            <span>API CHANGE INTELLIGENCE FOR DEVELOPERS</span>
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

        {/* Truthful Trust & Principles Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '0.75rem 1.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-xs)',
            fontSize: '0.8125rem',
            color: 'var(--color-text-muted)'
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            <ShieldCheck size={15} style={{ color: 'var(--color-success)' }} /> Built for developers who depend on APIs
          </span>
          <span style={{ color: 'var(--color-border-hover)' }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            <Cpu size={14} style={{ color: 'var(--color-brand-primary)' }} /> Deterministic rule engine
          </span>
          <span style={{ color: 'var(--color-border-hover)' }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            <Terminal size={14} style={{ color: 'var(--color-text-secondary)' }} /> Zero silent writes
          </span>
        </div>
      </div>
    </section>
  );
};
