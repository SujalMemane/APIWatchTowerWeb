import React from 'react';
import { Logo } from './Logo';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--color-border-default)',
        paddingTop: '4rem',
        paddingBottom: '3rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)'
      }}
    >
      <div className="container">
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <Logo size={30} />
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              A developer-focused dependency compatibility monitoring and assisted repair tool for external APIs and services.
            </p>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
              Built for HACKWAVE • Local-First Architecture
            </div>
          </div>

          {/* Column 1: Product Navigation */}
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-primary)', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
              Product
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9375rem' }}>
              <li>
                <a href="#how-it-works" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#capabilities" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                  Product Capabilities
                </a>
              </li>
              <li>
                <a href="#interactive-demo" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                  Interactive API Comparison
                </a>
              </li>
              <li>
                <a href="#extension-showcase" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                  VS Code Extension
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Architecture & Docs */}
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-primary)', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
              Architecture & Docs
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9375rem' }}>
              <li>
                <a href="#architecture" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                  System Architecture
                </a>
              </li>
              <li>
                <a href="#developer-docs" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                  Configuration YAML Contract
                </a>
              </li>
              <li>
                <a href="#developer-docs" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                  Local Backend API Endpoints
                </a>
              </li>
              <li>
                <a href="#faq" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Safety & Environment */}
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-primary)', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
              Environment & Safety
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.875rem' }}>
              <li style={{ color: 'var(--color-text-secondary)' }}>
                FastAPI Local Host: <code style={{ backgroundColor: 'var(--color-surface-muted)', padding: '0.15rem 0.4rem', borderRadius: '4px', border: '1px solid var(--color-border-subtle)' }}>127.0.0.1:8765</code>
              </li>
              <li style={{ color: 'var(--color-text-secondary)' }}>
                Persistence: Local SQLite DB
              </li>
              <li style={{ color: 'var(--color-text-secondary)' }}>
                Zero External Telemetry by Default
              </li>
              <li style={{ color: 'var(--color-text-secondary)' }}>
                Reversible Rollback Storage
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: 'var(--color-text-muted)'
          }}
        >
          <div>
            &copy; {currentYear} HACKWAVE Dependency Guardian. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--color-text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
