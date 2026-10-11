import React from 'react';
import { EyeOff, SearchSlash, AlertOctagon, CheckCircle2 } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: <EyeOff size={22} style={{ color: 'var(--color-danger)' }} />,
      tag: 'INCIDENT_CLASS: 01_UNDETECTED_SCHEMA_DRIFT',
      title: 'Breaking changes go unnoticed',
      description: 'Upstream API providers rename response fields, alter pagination contracts, or change data types without advance deprecation notices. A response stays valid JSON, but silent errors crash downstream flows.',
      solutionTag: 'GUARDIAN PROTOCOL',
      solutionTitle: 'Preserved Baselines & Active Probes',
      solutionDescription: 'Captures normalized known-good responses in an immutable SQLite store. Runs deterministic probes to surface schema mutations before users report broken workflows.'
    },
    {
      icon: <SearchSlash size={22} style={{ color: 'var(--color-warning)' }} />,
      tag: 'INCIDENT_CLASS: 02_UNTRACEABLE_IMPACT_SURFACE',
      title: 'Debugging consumes engineering hours',
      description: 'When an endpoint breaks, engineers waste hours opening raw network logs, diffing payloads manually, grepping across repositories, and guessing which features depend on changed fields.',
      solutionTag: 'GUARDIAN PROTOCOL',
      solutionTitle: 'Configured Workflow Impact Mapping',
      solutionDescription: 'Correlates observed payload mutations directly to declared workflows, source files, and unit test files. See exactly which file line is vulnerable in seconds.'
    },
    {
      icon: <AlertOctagon size={22} style={{ color: 'var(--color-brand-primary)' }} />,
      tag: 'INCIDENT_CLASS: 03_UNVALIDATED_HOTFIX_RISK',
      title: 'Fixes need evidence and validation',
      description: 'Quick-fix patches often introduce regressions or make faulty assumptions about semantic equivalence. Blindly applying AI-generated code without verified test runs introduces severe production risk.',
      solutionTag: 'GUARDIAN PROTOCOL',
      solutionTitle: 'Pre-Apply Sandbox Validation & Safety Brakes',
      solutionDescription: 'Generates focused compatibility adapters with explicit assumptions, runs test suites with timeouts, halts on semantic ambiguity, and requires explicit developer sign-off.'
    }
  ];

  return (
    <section className="section-wrapper section-subtle-bg" id="problem-statement">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
            <span>FAILURE MODE ANALYSIS</span>
          </div>
          <h2 className="section-title">Small API changes. Expensive engineering surprises.</h2>
          <p className="section-description">
            External services evolve on their own schedule. When contracts shift silently, engineering teams pay the price in firefighting and broken workflows.
          </p>
        </div>

        {/* 3-Column Problem Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {problems.map((item, idx) => (
            <div
              key={idx}
              className="feature-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                {/* Icon & Problem Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-surface-muted)',
                      border: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--color-text-muted)'
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Problem Title & Body */}
                <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                  {item.description}
                </p>
              </div>

              {/* Solution Mapping Subcard */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.125rem',
                  border: '1px solid var(--color-border-subtle)',
                  marginTop: 'auto'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-primary)', letterSpacing: '0.04em' }}>
                    {item.solutionTag}
                  </span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                  {item.solutionTitle}
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {item.solutionDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
