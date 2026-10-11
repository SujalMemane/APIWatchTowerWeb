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
          <div style={{ maxWidth: '320px' }}>
            <div style={{ marginBottom: '1rem' }}>
              <Logo size={28} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              A developer-focused dependency compatibility monitoring and assisted repair tool for external APIs and services.
            </p>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
              Developer Infrastructure • Local-First Architecture
            </div>
          </div>

          {/* Column 1: Product Navigation */}
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-primary)', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Product
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <a href="#how-it-works" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#capabilities" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                  Product Capabilities
                </a>
              </li>
              <li>
                <a href="#interactive-demo" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                  Interactive API Comparison
                </a>
              </li>
              <li>
                <a href="#extension-showcase" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                  VS Code Extension
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Architecture & Docs */}
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-primary)', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Architecture & Docs
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <a href="#architecture" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                  System Architecture
                </a>
              </li>
              <li>
                <a href="#developer-docs" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                  Configuration YAML Contract
                </a>
              </li>
              <li>
                <a href="#developer-docs" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                  Local Backend API Endpoints
                </a>
              </li>
              <li>
                <a href="#faq" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Safety & Environment */}
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-primary)', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Environment & Safety
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ color: 'var(--color-text-muted)' }}>
                FastAPI Local Host: <code>127.0.0.1:8765</code>
              </li>
              <li style={{ color: 'var(--color-text-muted)' }}>
                Persistence: Local SQLite DB
              </li>
              <li style={{ color: 'var(--color-text-muted)' }}>
                Zero External Telemetry by Default
              </li>
              <li style={{ color: 'var(--color-text-muted)' }}>
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
            &copy; {currentYear} Dependency Guardian. All rights reserved.
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
