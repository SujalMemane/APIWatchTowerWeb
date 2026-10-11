import React, { useState } from 'react';
import { GitCommit, X, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Product Announcement"
      style={{
        backgroundColor: '#090d16',
        color: '#f8fafc',
        borderBottom: '1px solid #1e293b',
        fontSize: '0.8125rem',
        padding: '0.45rem 1rem',
        position: 'relative',
        zIndex: 50,
        transition: 'all 200ms ease'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          textAlign: 'center'
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: 'rgba(99, 102, 241, 0.18)',
            border: '1px solid rgba(129, 140, 248, 0.35)',
            color: '#c7d2fe',
            fontWeight: 700,
            fontSize: '0.6875rem',
            padding: '0.15rem 0.55rem',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <GitCommit size={11} /> PRD v1.1 SPECIFICATION
        </span>

        <span style={{ color: '#cbd5e1', fontWeight: 500, fontSize: '0.8125rem' }}>
          Meet a deterministic way to investigate API contract regressions.
        </span>

        <a
          href="#interactive-demo"
          style={{
            color: '#a5b4fc',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            textDecoration: 'none',
            transition: 'color 150ms ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#a5b4fc')}
        >
          Try the Interactive Comparison <ArrowRight size={12} />
        </a>

        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement bar"
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'color 150ms ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
};
