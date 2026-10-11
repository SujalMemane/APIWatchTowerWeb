import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Product Announcement"
      style={{
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        borderBottom: '1px solid #1e293b',
        fontSize: '0.8125rem',
        padding: '0.5rem 1rem',
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
            backgroundColor: 'rgba(99, 102, 241, 0.25)',
            border: '1px solid rgba(129, 140, 248, 0.4)',
            color: '#c7d2fe',
            fontWeight: 700,
            fontSize: '0.6875rem',
            padding: '0.15rem 0.5rem',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          <Sparkles size={11} /> MVP Preview
        </span>

        <span style={{ color: '#e2e8f0', fontWeight: 500 }}>
          Meet a smarter way to investigate API breaking changes.
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
