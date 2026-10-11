import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 28, showText = true, className = '' }) => {
  return (
    <div
      className={`brand-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.625rem',
        flexShrink: 0,
        whiteSpace: 'nowrap'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brandShield" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
          <linearGradient id="brandNode" x1="10" y1="8" x2="22" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        {/* Shield Contour */}
        <path
          d="M16 3L6 7V14C6 21 10.5 27 16 29C21.5 27 26 21 26 14V7L16 3Z"
          fill="url(#brandShield)"
        />
        {/* Subtle Inner Border */}
        <path
          d="M16 4.5L7.5 8V14C7.5 19.8 11.2 25 16 27.2C20.8 25 24.5 19.8 24.5 14V8L16 4.5Z"
          stroke="#818CF8"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        {/* Dependency Nodes */}
        <circle cx="16" cy="10" r="2.2" fill="#FFFFFF" />
        <circle cx="11.5" cy="19" r="2" fill="url(#brandNode)" />
        <circle cx="20.5" cy="19" r="2" fill="url(#brandNode)" />
        {/* Graph Edges */}
        <line x1="16" y1="10" x2="11.5" y2="19" stroke="#E0E7FF" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="16" y1="10" x2="20.5" y2="19" stroke="#E0E7FF" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="11.5" y1="19" x2="20.5" y2="19" stroke="#93C5FD" strokeWidth="1.4" strokeDasharray="2 1.5" strokeLinecap="round" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ fontWeight: 800, fontSize: '1.0625rem', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
              Dependency Guardian
            </span>
            <span
              style={{
                fontSize: '0.625rem',
                fontWeight: 700,
                color: 'var(--color-brand-primary)',
                backgroundColor: 'var(--color-brand-surface)',
                padding: '0.125rem 0.375rem',
                borderRadius: 'var(--radius-xs)',
                letterSpacing: '0.04em',
                border: '1px solid var(--color-brand-border)'
              }}
            >
              HACKWAVE
            </span>
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500, letterSpacing: '0.01em' }}>
            API Change Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
