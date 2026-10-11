import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-what', 'faq-auto-modify']);

  const toggleAccordion = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(item => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <section className="section-wrapper" id="faq">
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>FAQ</span>
          </div>
          <h2 className="section-title">Common questions & engineering guarantees.</h2>
          <p className="section-description">
            Everything you need to know about detection boundaries, safety mechanisms, and the local MVP architecture.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: `1px solid ${isOpen ? 'var(--color-brand-border)' : 'var(--color-border-default)'}`,
                  boxShadow: isOpen ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
                  transition: 'all var(--transition-fast)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-question-${faq.id}`}
                  style={{
                    width: '100%',
                    padding: '1.4rem 1.75rem',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.25rem',
                    backgroundColor: isOpen ? 'var(--color-surface-subtle)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'background-color var(--transition-fast)'
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: '1.0875rem',
                      color: isOpen ? 'var(--color-brand-primary)' : 'var(--color-text-primary)',
                      lineHeight: 1.45,
                      letterSpacing: '-0.015em'
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{
                      color: isOpen ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-normal)',
                      flexShrink: 0
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                    style={{
                      padding: '1.4rem 1.75rem 1.75rem 1.75rem',
                      fontSize: '1rem',
                      lineHeight: 1.75,
                      color: 'var(--color-text-secondary)',
                      borderTop: '1px solid var(--color-border-subtle)',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
