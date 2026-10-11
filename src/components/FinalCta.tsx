import React, { useState } from 'react';
import { ArrowRight, Terminal, Check, Copy, BookOpen } from 'lucide-react';

export const FinalCta: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('code --install-extension dependency-guardian.vsix');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section-wrapper" style={{ paddingBottom: '7rem' }}>
      <div className="container">
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid #1e293b',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          {/* Subtle Background Glow Accent */}
          <div
            style={{
              position: 'absolute',
              top: '-150px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '500px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(79, 70, 229, 0.35) 0%, rgba(15, 23, 42, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#a5b4fc',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                border: '1px solid rgba(129, 140, 248, 0.3)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                marginBottom: '1.5rem'
              }}
            >
              Get Started with the MVP
            </div>

            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '1.25rem',
                letterSpacing: '-0.03em'
              }}
            >
              Know what changed before your application pays the price.
            </h2>

            <p
              style={{
                fontSize: '1.125rem',
                color: '#94a3b8',
                lineHeight: 1.6,
                marginBottom: '2.5rem'
              }}
            >
              Explore Dependency Guardian and see how API change intelligence can fit into your development workflow.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem'
              }}
            >
              <a
                href="#extension-showcase"
                className="btn btn-primary btn-lg"
                style={{
                  backgroundColor: 'var(--color-brand-primary)',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)'
                }}
              >
                Explore Dependency Guardian <ArrowRight size={18} />
              </a>

              <a
                href="#developer-docs"
                className="btn btn-secondary btn-lg"
                style={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  color: '#ffffff'
                }}
              >
                <BookOpen size={16} /> Read the Documentation
              </a>
            </div>

            {/* Inline Quick Install Snippet */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#05070d',
                border: '1px solid #1e293b',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 1rem',
                gap: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                maxWidth: '100%',
                overflowX: 'auto'
              }}
            >
              <Terminal size={14} style={{ color: '#818cf8', flexShrink: 0 }} />
              <span style={{ color: '#cbd5e1' }}>code --install-extension dependency-guardian.vsix</span>
              <button
                onClick={copyCommand}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: copied ? '#4ade80' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginLeft: '0.5rem'
                }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
