import React, { useState } from 'react';
import { 
  Binary, 
  ShieldAlert, 
  GitBranch, 
  Wrench, 
  CheckCircle2, 
  OctagonAlert, 
  Layout, 
  History,
  Check
} from 'lucide-react';
import { PRODUCT_CAPABILITIES } from '../data/mockData';

export const CapabilitiesGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Detection', 'Analysis', 'Context', 'Repairs', 'Verification', 'Safety', 'Workflow'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary': return <Binary size={22} style={{ color: 'var(--color-brand-primary)' }} />;
      case 'ShieldAlert': return <ShieldAlert size={22} style={{ color: 'var(--color-danger)' }} />;
      case 'GitBranch': return <GitBranch size={22} style={{ color: 'var(--color-brand-primary)' }} />;
      case 'Wrench': return <Wrench size={22} style={{ color: 'var(--color-brand-primary)' }} />;
      case 'CheckCircle2': return <CheckCircle2 size={22} style={{ color: 'var(--color-success)' }} />;
      case 'OctagonAlert': return <OctagonAlert size={22} style={{ color: 'var(--color-warning)' }} />;
      case 'Layout': return <Layout size={22} style={{ color: 'var(--color-brand-primary)' }} />;
      case 'History': return <History size={22} style={{ color: 'var(--color-brand-primary)' }} />;
      default: return <Binary size={22} />;
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--card-mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--card-mouse-y', `${y}px`);
  };

  const filteredCapabilities = activeFilter === 'All' 
    ? PRODUCT_CAPABILITIES 
    : PRODUCT_CAPABILITIES.filter(c => c.category === activeFilter);

  return (
    <section className="section-wrapper section-subtle-bg" id="capabilities">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Verified System Capabilities</span>
          </div>
          <h2 className="section-title">Engineered for accuracy, built for developer trust.</h2>
          <p className="section-description">
            Every capability in Dependency Guardian is grounded in deterministic comparison, explicit configuration, and rigorous validation gates.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: activeFilter === cat ? 'var(--color-brand-primary)' : 'var(--color-surface-card)',
                color: activeFilter === cat ? '#ffffff' : 'var(--color-text-secondary)',
                border: `1px solid ${activeFilter === cat ? 'var(--color-brand-primary)' : 'var(--color-border-default)'}`,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Feature Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredCapabilities.map((cap) => (
            <div
              key={cap.id}
              className="feature-card interactive-card"
              onMouseMove={handleCardMouseMove}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                position: 'relative'
              }}
            >
              {/* Dynamic Mouse Spotlight Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(320px circle at var(--card-mouse-x, -500px) var(--card-mouse-y, -500px), rgba(79, 70, 229, 0.08), transparent 70%)',
                  pointerEvents: 'none',
                  borderRadius: 'inherit',
                  transition: 'opacity 150ms ease'
                }}
              />
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Top Badge & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-surface-muted)',
                      border: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getIcon(cap.iconName)}
                  </div>

                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      backgroundColor: 'var(--color-brand-surface)',
                      color: 'var(--color-brand-primary)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px',
                      border: '1px solid var(--color-brand-border)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {cap.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--color-text-primary)' }}>
                  {cap.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
                  {cap.description}
                </p>
              </div>

              {/* Metric / Evidence Footer */}
              <div
                style={{
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)'
                }}
              >
                <Check size={13} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span>{cap.metricOrEvidence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
