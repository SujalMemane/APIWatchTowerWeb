import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Terminal, 
  FileCode2, 
  Play, 
  Check, 
  Copy, 
  Search, 
  FolderTree,
  Activity,
  Server,
  Network,
  AlertTriangle,
  Lock,
  Beaker,
  Layers,
  GitBranch,
  RefreshCw,
  Bookmark,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export const ExtensionShowcase: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  // Main Webview Tabs from NexMind guardianPanel.ts
  const [activeMainTab, setActiveMainTab] = useState<'drifts' | 'graph'>('drifts');
  // Scenario switcher
  const [selectedScenario, setSelectedScenario] = useState<'users_v2' | 'search_v2' | 'payments_v2'>('users_v2');
  // Graph Outage Simulation
  const [simulatedFailure, setSimulatedFailure] = useState<'users-api' | 'payments-api' | 'search-api' | 'none'>('users-api');
  // Sandbox validation & apply states
  const [validationRun, setValidationRun] = useState<boolean>(true);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  // Sidebar accordion states
  const [expandedSection, setExpandedSection] = useState<'services' | 'changes' | 'workflows' | 'repairs'>('changes');

  const copyInstallCommand = () => {
    navigator.clipboard.writeText('code --install-extension dependency-guardian.vsix');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section-wrapper section-subtle-bg" id="extension-showcase">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>VS Code Extension UI (NexMind Reference)</span>
          </div>
          <h2 className="section-title">Dependency intelligence, right where you code.</h2>
          <p className="section-description">
            Directly modeled on the production <code>dependency-guardian</code> extension in NexMind. Features 4 native tree views, the interactive Dashboard Webview, and NetworkX blast radius topology.
          </p>
        </div>

        {/* VS Code IDE Window Mockup */}
        <div
          style={{
            backgroundColor: '#09090b',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #27272a',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            overflow: 'hidden',
            marginBottom: '2.5rem'
          }}
        >
          {/* Top Window Title Bar */}
          <div
            style={{
              backgroundColor: '#111113',
              padding: '0.6rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #27272a',
              fontSize: '0.75rem',
              color: '#94a3b8'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              </div>
              <span style={{ marginLeft: '0.5rem', color: '#f4f4f5', fontWeight: 600 }}>
                NexMind Workspace — Visual Studio Code
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.12)',
                  color: '#4ade80',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                Backend: 127.0.0.1:8765 [Online]
              </span>
            </div>
          </div>

          {/* IDE Layout: Activity Bar + Sidebar + Main Webview Editor */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '50px 260px 1fr',
              minHeight: '620px'
            }}
            className="vscode-ide-grid"
          >
            {/* 1. Activity Bar (from contributes.viewsContainers.activitybar) */}
            <div
              style={{
                backgroundColor: '#09090b',
                borderRight: '1px solid #27272a',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '0.85rem',
                gap: '1.4rem',
                color: '#71717a'
              }}
            >
              {/* Active Extension Icon (shield.svg from NexMind) */}
              <div
                title="Dependency Guardian (Active)"
                style={{
                  color: '#3b82f6',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(59, 130, 246, 0.15)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                {/* Active blue indicator pill */}
                <span
                  style={{
                    position: 'absolute',
                    left: '-7px',
                    width: '3px',
                    height: '22px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '0 2px 2px 0'
                  }}
                />
              </div>

              <span title="Explorer" style={{ display: 'inline-flex' }}>
                <FolderTree size={19} style={{ cursor: 'pointer', opacity: 0.65 }} />
              </span>
              <span title="Search" style={{ display: 'inline-flex' }}>
                <Search size={19} style={{ cursor: 'pointer', opacity: 0.65 }} />
              </span>
              <span title="Source Control" style={{ display: 'inline-flex' }}>
                <GitBranch size={19} style={{ cursor: 'pointer', opacity: 0.65 }} />
              </span>
              <span title="Run & Debug" style={{ display: 'inline-flex' }}>
                <Activity size={19} style={{ cursor: 'pointer', opacity: 0.65 }} />
              </span>
            </div>

            {/* 2. Sidebar: 4 Native Tree Views (from contributes.views in NexMind) */}
            <div
              style={{
                backgroundColor: '#111113',
                borderRight: '1px solid #27272a',
                display: 'flex',
                flexDirection: 'column',
                fontSize: '0.75rem',
                color: '#f4f4f5',
                overflowY: 'auto'
              }}
              className="vscode-sidebar"
            >
              {/* Sidebar Header */}
              <div
                style={{
                  padding: '0.75rem 1rem 0.5rem',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#a1a1aa',
                  borderBottom: '1px solid #1f1f23',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>DEPENDENCY GUARDIAN</span>
                <span style={{ fontSize: '0.65rem', color: '#71717a' }}>v1.1.0</span>
              </div>

              {/* View 1: Configured Dependencies */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'services' ? 'changes' : 'services')}
                style={{
                  padding: '0.55rem 0.85rem',
                  backgroundColor: '#18181b',
                  color: '#94a3b8',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #27272a'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {expandedSection === 'services' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>CONFIGURED DEPENDENCIES (3)</span>
                </div>
                <span title="Create Baseline" style={{ display: 'inline-flex' }}>
                  <Bookmark size={12} style={{ color: '#71717a' }} />
                </span>
              </div>

              {expandedSection === 'services' && (
                <div style={{ padding: '0.4rem 0', borderBottom: '1px solid #1f1f23' }}>
                  <div style={{ padding: '0.35rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#cbd5e1' }}>
                    <Server size={13} style={{ color: '#3b82f6' }} />
                    <span>users-api</span>
                    <span style={{ color: '#71717a', fontSize: '0.6875rem' }}>:8001</span>
                  </div>
                  <div style={{ padding: '0.2rem 1.65rem', color: '#71717a', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)' }}>
                    ↳ GET /api/v2/users [customer_profile]
                  </div>

                  <div style={{ padding: '0.35rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#cbd5e1' }}>
                    <Server size={13} style={{ color: '#3b82f6' }} />
                    <span>payments-api</span>
                    <span style={{ color: '#71717a', fontSize: '0.6875rem' }}>:8002</span>
                  </div>
                  <div style={{ padding: '0.2rem 1.65rem', color: '#71717a', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)' }}>
                    ↳ GET /v1/charges [charge_record]
                  </div>

                  <div style={{ padding: '0.35rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#cbd5e1' }}>
                    <Server size={13} style={{ color: '#3b82f6' }} />
                    <span>search-api</span>
                    <span style={{ color: '#71717a', fontSize: '0.6875rem' }}>:8003</span>
                  </div>
                </div>
              )}

              {/* View 2: Detected Changes (from changesTree.ts) */}
              <div
                onClick={() => setExpandedSection('changes')}
                style={{
                  padding: '0.55rem 0.85rem',
                  backgroundColor: '#18181b',
                  color: '#94a3b8',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #27272a'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {expandedSection === 'changes' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>DETECTED CHANGES (3)</span>
                </div>
                <span title="Scan Dependencies" style={{ display: 'inline-flex' }}>
                  <RefreshCw size={12} style={{ color: '#71717a' }} />
                </span>
              </div>

              {expandedSection === 'changes' && (
                <div style={{ borderBottom: '1px solid #1f1f23' }}>
                  {/* Users Change */}
                  <div
                    onClick={() => {
                      setSelectedScenario('users_v2');
                      setActiveMainTab('drifts');
                    }}
                    style={{
                      padding: '0.45rem 1rem',
                      cursor: 'pointer',
                      backgroundColor: selectedScenario === 'users_v2' && activeMainTab === 'drifts' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      borderLeft: selectedScenario === 'users_v2' && activeMainTab === 'drifts' ? '3px solid #3b82f6' : '3px solid transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.15rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f4f4f5' }}>
                      <AlertTriangle size={13} style={{ color: '#ef4444' }} />
                      <span style={{ fontWeight: 600 }}>users-api: field_renamed</span>
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#f87171', paddingLeft: '1.25rem' }}>
                      [HIGH RISK] name &rarr; display_name
                    </div>
                  </div>

                  {/* Payments Change */}
                  <div
                    onClick={() => {
                      setSelectedScenario('payments_v2');
                      setActiveMainTab('drifts');
                    }}
                    style={{
                      padding: '0.45rem 1rem',
                      cursor: 'pointer',
                      backgroundColor: selectedScenario === 'payments_v2' && activeMainTab === 'drifts' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      borderLeft: selectedScenario === 'payments_v2' && activeMainTab === 'drifts' ? '3px solid #3b82f6' : '3px solid transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.15rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f4f4f5' }}>
                      <Lock size={13} style={{ color: '#c084fc' }} />
                      <span style={{ fontWeight: 600 }}>payments-api: status_mutation</span>
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#c084fc', paddingLeft: '1.25rem' }}>
                      [BLOCKED UNCERTAIN] status &quot;paid&quot;
                    </div>
                  </div>

                  {/* Search Change */}
                  <div
                    onClick={() => {
                      setSelectedScenario('search_v2');
                      setActiveMainTab('drifts');
                    }}
                    style={{
                      padding: '0.45rem 1rem',
                      cursor: 'pointer',
                      backgroundColor: selectedScenario === 'search_v2' && activeMainTab === 'drifts' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      borderLeft: selectedScenario === 'search_v2' && activeMainTab === 'drifts' ? '3px solid #3b82f6' : '3px solid transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.15rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f4f4f5' }}>
                      <Activity size={13} style={{ color: '#eab308' }} />
                      <span style={{ fontWeight: 600 }}>search-api: pagination</span>
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#fde047', paddingLeft: '1.25rem' }}>
                      [MEDIUM] offset &rarr; cursor
                    </div>
                  </div>
                </div>
              )}

              {/* View 3: Affected Workflows (from workflowsTree.ts) */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'workflows' ? 'changes' : 'workflows')}
                style={{
                  padding: '0.55rem 0.85rem',
                  backgroundColor: '#18181b',
                  color: '#94a3b8',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #27272a'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {expandedSection === 'workflows' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>AFFECTED WORKFLOWS</span>
                </div>
              </div>

              {expandedSection === 'workflows' && (
                <div style={{ padding: '0.4rem 0', borderBottom: '1px solid #1f1f23' }}>
                  <div style={{ padding: '0.35rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#f4f4f5', fontWeight: 600 }}>
                    <Layers size={13} style={{ color: '#818cf8' }} />
                    <span>Customer Account Profile</span>
                  </div>
                  <div style={{ padding: '0.2rem 1.65rem', color: '#93c5fd', fontSize: '0.6875rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <FileCode2 size={11} />
                    <span>src/services/identity/user_service.py:42</span>
                  </div>
                  <div style={{ padding: '0.2rem 1.65rem', color: '#86efac', fontSize: '0.6875rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Beaker size={11} />
                    <span>tests/integration/test_user_profile.py</span>
                  </div>
                </div>
              )}

              {/* View 4: Repair Proposals (from repairsTree.ts) */}
              <div
                onClick={() => setExpandedSection(expandedSection === 'repairs' ? 'changes' : 'repairs')}
                style={{
                  padding: '0.55rem 0.85rem',
                  backgroundColor: '#18181b',
                  color: '#94a3b8',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #27272a'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {expandedSection === 'repairs' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>REPAIR PROPOSALS (2)</span>
                </div>
              </div>

              {expandedSection === 'repairs' && (
                <div style={{ padding: '0.4rem 0' }}>
                  <div style={{ padding: '0.35rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#4ade80' }}>
                    <CheckCircle2 size={13} />
                    <span>field_rename_adapter [VALIDATED]</span>
                  </div>
                  <div style={{ padding: '0.35rem 1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#c084fc' }}>
                    <Lock size={13} />
                    <span>semantic_safety_lock [BLOCKED]</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Main Editor: Actual Webview Dashboard (GuardianDashboardPanel from guardianPanel.ts) */}
            <div
              style={{
                backgroundColor: '#09090b',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
              }}
            >
              {/* Actual NexMind Webview Header Bar */}
              <div
                style={{
                  backgroundColor: '#111113',
                  padding: '0.85rem 1.25rem',
                  borderBottom: '1px solid #27272a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3b82f6'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#ffffff' }}>
                      Dependency Guardian Dashboard
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#71717a' }}>
                      API Change Intelligence & Runtime Safety Protocol
                    </div>
                  </div>
                </div>

                {/* Dashboard Action Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => setValidationRun(true)}
                    style={{
                      backgroundColor: '#18181b',
                      color: '#f4f4f5',
                      border: '1px solid #27272a',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <RefreshCw size={12} style={{ color: '#3b82f6' }} /> Scan Dependencies
                  </button>
                  <button
                    style={{
                      backgroundColor: '#18181b',
                      color: '#f4f4f5',
                      border: '1px solid #27272a',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Bookmark size={12} style={{ color: '#10b981' }} /> Capture Baseline
                  </button>
                </div>
              </div>

              {/* The Two Main Navigation Tabs from guardianPanel.ts */}
              <div
                style={{
                  backgroundColor: '#111113',
                  borderBottom: '1px solid #27272a',
                  padding: '0 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <button
                  onClick={() => setActiveMainTab('drifts')}
                  style={{
                    padding: '0.65rem 1rem',
                    border: 'none',
                    background: 'none',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: activeMainTab === 'drifts' ? '#ffffff' : '#71717a',
                    borderBottom: activeMainTab === 'drifts' ? '2px solid #3b82f6' : '2px solid transparent'
                  }}
                >
                  <Activity size={14} style={{ color: activeMainTab === 'drifts' ? '#3b82f6' : '#71717a' }} />
                  <span>Detected Changes & Repairs</span>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      color: '#f87171',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '9999px',
                      fontWeight: 700
                    }}
                  >
                    3
                  </span>
                </button>

                <button
                  onClick={() => setActiveMainTab('graph')}
                  style={{
                    padding: '0.65rem 1rem',
                    border: 'none',
                    background: 'none',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: activeMainTab === 'graph' ? '#ffffff' : '#71717a',
                    borderBottom: activeMainTab === 'graph' ? '2px solid #3b82f6' : '2px solid transparent'
                  }}
                >
                  <Network size={14} style={{ color: activeMainTab === 'graph' ? '#3b82f6' : '#71717a' }} />
                  <span>Dependency Blast Radius Graph</span>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      backgroundColor: 'rgba(59, 130, 246, 0.15)',
                      color: '#60a5fa',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    NetworkX
                  </span>
                </button>
              </div>

              {/* ======================================================== */}
              {/* TAB 1 CONTENT: DRIFTS & REPAIR STUDIO                    */}
              {/* ======================================================== */}
              {activeMainTab === 'drifts' && (
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Live Simulation Controls Bar (from guardianPanel.ts) */}
                  <div
                    style={{
                      backgroundColor: '#111113',
                      border: '1px solid #27272a',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.65rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      flexWrap: 'wrap',
                      fontSize: '0.75rem'
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#a1a1aa' }}>Live Simulation Controls:</span>
                    <button
                      onClick={() => setSelectedScenario('users_v2')}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        backgroundColor: selectedScenario === 'users_v2' ? '#3b82f6' : '#18181b',
                        color: selectedScenario === 'users_v2' ? '#ffffff' : '#a1a1aa',
                        border: `1px solid ${selectedScenario === 'users_v2' ? '#3b82f6' : '#27272a'}`
                      }}
                    >
                      Users API: Field Rename (name &rarr; display_name)
                    </button>
                    <button
                      onClick={() => setSelectedScenario('search_v2')}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        backgroundColor: selectedScenario === 'search_v2' ? '#3b82f6' : '#18181b',
                        color: selectedScenario === 'search_v2' ? '#ffffff' : '#a1a1aa',
                        border: `1px solid ${selectedScenario === 'search_v2' ? '#3b82f6' : '#27272a'}`
                      }}
                    >
                      Search API: Cursor Pagination Contract
                    </button>
                    <button
                      onClick={() => setSelectedScenario('payments_v2')}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        backgroundColor: selectedScenario === 'payments_v2' ? '#3b82f6' : '#18181b',
                        color: selectedScenario === 'payments_v2' ? '#ffffff' : '#a1a1aa',
                        border: `1px solid ${selectedScenario === 'payments_v2' ? '#3b82f6' : '#27272a'}`
                      }}
                    >
                      Payments API: Semantic Shift (Blocks Repair)
                    </button>
                  </div>

                  {/* Inspector Card */}
                  <div
                    style={{
                      backgroundColor: '#111113',
                      border: '1px solid #27272a',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}
                  >
                    {/* Incident Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#ffffff' }}>
                            {selectedScenario === 'users_v2' && 'GET /api/v2/users/usr_98a72 — Field Rename'}
                            {selectedScenario === 'search_v2' && 'GET /v1/catalog/search — Cursor Pagination'}
                            {selectedScenario === 'payments_v2' && 'GET /v1/charges/ch_live — Semantic Status Mutation'}
                          </span>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              padding: '0.15rem 0.55rem',
                              borderRadius: '4px',
                              backgroundColor: selectedScenario === 'payments_v2' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                              color: selectedScenario === 'payments_v2' ? '#c084fc' : '#f87171',
                              border: `1px solid ${selectedScenario === 'payments_v2' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                            }}
                          >
                            {selectedScenario === 'payments_v2' ? 'BLOCKED UNCERTAIN' : 'HIGH RISK'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#71717a' }}>
                          Mapped Workflow: <strong>{selectedScenario === 'users_v2' ? 'Customer Account Profile' : selectedScenario === 'search_v2' ? 'Product Catalog Discovery' : 'Order Fulfillment'}</strong> • File: <code>{selectedScenario === 'users_v2' ? 'user_service.py:42' : selectedScenario === 'search_v2' ? 'search_service.py:88' : 'payment_service.py:63'}</code>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => setValidationRun(true)}
                          style={{
                            backgroundColor: '#18181b',
                            color: '#ffffff',
                            border: '1px solid #27272a',
                            padding: '0.4rem 0.85rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          <Play size={12} style={{ color: '#22c55e' }} /> Run Pytest Validation
                        </button>
                        {selectedScenario !== 'payments_v2' ? (
                          <button
                            onClick={() => setIsApplied(!isApplied)}
                            style={{
                              backgroundColor: isApplied ? '#22c55e' : '#ffffff',
                              color: isApplied ? '#ffffff' : '#09090b',
                              border: 'none',
                              padding: '0.4rem 0.85rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                          >
                            {isApplied ? <Check size={12} /> : <FileCode2 size={12} />}
                            {isApplied ? 'Applied (Rollback Ready)' : 'Apply Approved Repair'}
                          </button>
                        ) : (
                          <button
                            disabled
                            style={{
                              backgroundColor: 'rgba(168, 85, 247, 0.15)',
                              color: '#c084fc',
                              border: '1px solid rgba(168, 85, 247, 0.3)',
                              padding: '0.4rem 0.85rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'not-allowed',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                          >
                            <Lock size={12} /> Safety Brake: Repair Blocked
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Diff Preview Box */}
                    <div
                      style={{
                        backgroundColor: '#040406',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid #27272a',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        lineHeight: 1.6,
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#111113',
                          padding: '0.35rem 0.85rem',
                          borderBottom: '1px solid #27272a',
                          display: 'flex',
                          justifyContent: 'space-between',
                          color: '#71717a',
                          fontSize: '0.6875rem'
                        }}
                      >
                        <span>src/services/identity/user_service.py (Compatibility Adapter Unified Diff)</span>
                        <span style={{ color: '#4ade80' }}>+2 / -1 lines</span>
                      </div>
                      <div style={{ padding: '0.85rem' }}>
                        <div style={{ color: '#71717a' }}>@@ -41,3 +41,4 @@ def get_user_profile(user_id):</div>
                        <div style={{ color: '#94a3b8', paddingLeft: '1rem' }}>    id=payload[&quot;id&quot;],</div>
                        <div style={{ color: '#f87171', backgroundColor: 'rgba(239, 68, 68, 0.15)', paddingLeft: '1rem' }}>
                          -   name=payload[&quot;name&quot;],
                        </div>
                        <div style={{ color: '#4ade80', backgroundColor: 'rgba(34, 197, 94, 0.15)', paddingLeft: '1rem' }}>
                          +   # Backward compatible adapter for upstream display_name
                        </div>
                        <div style={{ color: '#4ade80', backgroundColor: 'rgba(34, 197, 94, 0.15)', paddingLeft: '1rem' }}>
                          +   name=payload.get(&quot;display_name&quot;, payload.get(&quot;name&quot;, &quot;&quot;)),
                        </div>
                        <div style={{ color: '#94a3b8', paddingLeft: '1rem' }}>    email=payload[&quot;email&quot;],</div>
                      </div>
                    </div>

                    {/* Integrated Terminal Output (from guardianPanel.ts sandbox runner) */}
                    <div
                      style={{
                        backgroundColor: '#040406',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid #27272a',
                        padding: '0.75rem 1rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#71717a', marginBottom: '0.35rem' }}>
                        <Terminal size={12} style={{ color: '#22c55e' }} />
                        <span>Terminal: Sandbox Pytest Verification Suite</span>
                      </div>
                      <div style={{ color: '#f4f4f5' }}>$ pytest tests/integration/test_user_profile.py -q</div>
                      {validationRun ? (
                        <>
                          <div style={{ color: '#4ade80' }}>.... [100%] 4 passed in 0.14s</div>
                          <div style={{ color: '#71717a', fontSize: '0.6875rem', marginTop: '0.2rem' }}>
                            Exit Code: 0 • Hash verification match • Safe to apply
                          </div>
                        </>
                      ) : (
                        <div style={{ color: '#fcd34d' }}>Executing validation sandbox...</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 2 CONTENT: NETWORKX BLAST RADIUS TOPOLOGY GRAPH     */}
              {/* ======================================================== */}
              {activeMainTab === 'graph' && (
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Simulate API Outage Scenario Bar (from guardianPanel.ts) */}
                  <div
                    style={{
                      backgroundColor: '#111113',
                      border: '1px solid #27272a',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.65rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      flexWrap: 'wrap',
                      fontSize: '0.75rem'
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#a1a1aa' }}>Simulate API Outage:</span>
                    <button
                      onClick={() => setSimulatedFailure('users-api')}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        backgroundColor: simulatedFailure === 'users-api' ? 'rgba(239, 68, 68, 0.25)' : '#18181b',
                        color: simulatedFailure === 'users-api' ? '#fca5a5' : '#a1a1aa',
                        border: `1px solid ${simulatedFailure === 'users-api' ? '#ef4444' : '#27272a'}`
                      }}
                    >
                      💥 Users API Down
                    </button>
                    <button
                      onClick={() => setSimulatedFailure('payments-api')}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        backgroundColor: simulatedFailure === 'payments-api' ? 'rgba(239, 68, 68, 0.25)' : '#18181b',
                        color: simulatedFailure === 'payments-api' ? '#fca5a5' : '#a1a1aa',
                        border: `1px solid ${simulatedFailure === 'payments-api' ? '#ef4444' : '#27272a'}`
                      }}
                    >
                      💥 Payments API Down
                    </button>
                    <button
                      onClick={() => setSimulatedFailure('search-api')}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        backgroundColor: simulatedFailure === 'search-api' ? 'rgba(239, 68, 68, 0.25)' : '#18181b',
                        color: simulatedFailure === 'search-api' ? '#fca5a5' : '#a1a1aa',
                        border: `1px solid ${simulatedFailure === 'search-api' ? '#ef4444' : '#27272a'}`
                      }}
                    >
                      💥 Search API Down
                    </button>
                    <button
                      onClick={() => setSimulatedFailure('none')}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        backgroundColor: simulatedFailure === 'none' ? 'rgba(34, 197, 94, 0.25)' : '#18181b',
                        color: simulatedFailure === 'none' ? '#86efac' : '#a1a1aa',
                        border: `1px solid ${simulatedFailure === 'none' ? '#22c55e' : '#27272a'}`
                      }}
                    >
                      ✓ Restore Network (All Healthy)
                    </button>
                  </div>

                  {/* Live KPI Strip (exact from guardianPanel.ts) */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ backgroundColor: '#111113', border: '1px solid #27272a', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
                      <div style={{ fontSize: '0.6875rem', color: '#71717a', textTransform: 'uppercase', fontWeight: 700 }}>Blast Radius Impact</div>
                      <div style={{ fontSize: '1.45rem', fontWeight: 800, color: simulatedFailure === 'none' ? '#22c55e' : '#ef4444', margin: '0.2rem 0' }}>
                        {simulatedFailure === 'users-api' ? '35%' : simulatedFailure === 'payments-api' ? '45%' : simulatedFailure === 'search-api' ? '25%' : '0%'}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: '#71717a' }}>
                        {simulatedFailure === 'none' ? '0 / 20 components' : '7 / 20 components impacted'}
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#111113', border: '1px solid #27272a', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
                      <div style={{ fontSize: '0.6875rem', color: '#71717a', textTransform: 'uppercase', fontWeight: 700 }}>Outage Risk Severity</div>
                      <div style={{ fontSize: '1.45rem', fontWeight: 800, color: simulatedFailure === 'none' ? '#4ade80' : '#f87171', margin: '0.2rem 0' }}>
                        {simulatedFailure === 'none' ? 'STABLE' : 'CRITICAL CASCADING BLOCK'}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: '#71717a' }}>
                        {simulatedFailure === 'none' ? 'No cascading blocks' : 'Downstream consumers halted'}
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#111113', border: '1px solid #27272a', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
                      <div style={{ fontSize: '0.6875rem', color: '#71717a', textTransform: 'uppercase', fontWeight: 700 }}>Compromised Workflows</div>
                      <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f4f4f5', margin: '0.2rem 0' }}>
                        {simulatedFailure === 'none' ? '0' : '2 of 4'}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: '#71717a' }}>
                        {simulatedFailure === 'none' ? 'All paths green' : 'Account Sync, Checkout Flow'}
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#111113', border: '1px solid #27272a', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
                      <div style={{ fontSize: '0.6875rem', color: '#71717a', textTransform: 'uppercase', fontWeight: 700 }}>Touchpoints Impacted</div>
                      <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f4f4f5', margin: '0.2rem 0' }}>
                        {simulatedFailure === 'none' ? '0' : '3 Surfaces'}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: '#71717a' }}>
                        Web App, Mobile App, Admin Portal
                      </div>
                    </div>
                  </div>

                  {/* Topology Graph Canvas Box */}
                  <div
                    style={{
                      backgroundColor: '#040406',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid #27272a',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '260px',
                      position: 'relative'
                    }}
                  >
                    <svg width="100%" height="220" viewBox="0 0 700 220" style={{ overflow: 'visible' }}>
                      {/* Grid background lines */}
                      <defs>
                        <pattern id="graph-grid-pat" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1" fill="#18181b" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#graph-grid-pat)" />

                      {/* Connections / Edges */}
                      <path d="M 120 70 L 320 70" stroke={simulatedFailure === 'users-api' ? '#ef4444' : '#3f3f46'} strokeWidth="2" strokeDasharray={simulatedFailure === 'users-api' ? '4 4' : 'none'} />
                      <path d="M 120 150 L 320 150" stroke={simulatedFailure === 'payments-api' ? '#ef4444' : '#3f3f46'} strokeWidth="2" strokeDasharray={simulatedFailure === 'payments-api' ? '4 4' : 'none'} />
                      <path d="M 320 70 L 520 110" stroke={simulatedFailure === 'users-api' ? '#ef4444' : '#3f3f46'} strokeWidth="2" />
                      <path d="M 320 150 L 520 110" stroke={simulatedFailure === 'payments-api' ? '#ef4444' : '#3f3f46'} strokeWidth="2" />

                      {/* Node 1: External Users API */}
                      <g transform="translate(120, 70)">
                        <circle r="22" fill={simulatedFailure === 'users-api' ? '#7f1d1d' : '#18181b'} stroke={simulatedFailure === 'users-api' ? '#ef4444' : '#3b82f6'} strokeWidth="2" />
                        <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="10" fontWeight="700">Auth0</text>
                        <text textAnchor="middle" dy="36" fill={simulatedFailure === 'users-api' ? '#ef4444' : '#71717a'} fontSize="11" fontWeight="600">Users API</text>
                      </g>

                      {/* Node 2: External Payments API */}
                      <g transform="translate(120, 150)">
                        <circle r="22" fill={simulatedFailure === 'payments-api' ? '#7f1d1d' : '#18181b'} stroke={simulatedFailure === 'payments-api' ? '#ef4444' : '#3b82f6'} strokeWidth="2" />
                        <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="10" fontWeight="700">Stripe</text>
                        <text textAnchor="middle" dy="36" fill={simulatedFailure === 'payments-api' ? '#ef4444' : '#71717a'} fontSize="11" fontWeight="600">Payments API</text>
                      </g>

                      {/* Node 3: Internal Microservice user_service */}
                      <g transform="translate(320, 70)">
                        <rect x="-45" y="-16" width="90" height="32" rx="6" fill={simulatedFailure === 'users-api' ? '#7f1d1d' : '#18181b'} stroke={simulatedFailure === 'users-api' ? '#ef4444' : '#52525b'} strokeWidth="2" />
                        <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="10" fontWeight="600">user_service.py</text>
                      </g>

                      {/* Node 4: Internal Microservice payment_service */}
                      <g transform="translate(320, 150)">
                        <rect x="-45" y="-16" width="90" height="32" rx="6" fill={simulatedFailure === 'payments-api' ? '#7f1d1d' : '#18181b'} stroke={simulatedFailure === 'payments-api' ? '#ef4444' : '#52525b'} strokeWidth="2" />
                        <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="10" fontWeight="600">payment_svc.py</text>
                      </g>

                      {/* Node 5: Client Touchpoint Surfaces */}
                      <g transform="translate(520, 110)">
                        <rect x="-55" y="-20" width="110" height="40" rx="8" fill={simulatedFailure !== 'none' ? '#450a0a' : '#18181b'} stroke={simulatedFailure !== 'none' ? '#ef4444' : '#22c55e'} strokeWidth="2" />
                        <text textAnchor="middle" dy="-3" fill="#ffffff" fontSize="10" fontWeight="700">Client Web App</text>
                        <text textAnchor="middle" dy="12" fill={simulatedFailure !== 'none' ? '#f87171' : '#4ade80'} fontSize="9">
                          {simulatedFailure !== 'none' ? 'Cascading Failure' : 'All Healthy'}
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* VS Code Bottom Status Bar (from statusBar.ts) */}
          <div
            style={{
              backgroundColor: '#18181b',
              borderTop: '1px solid #27272a',
              padding: '0.35rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.6875rem',
              fontFamily: 'var(--font-mono)',
              color: '#a1a1aa'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  color: '#f87171',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '3px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <AlertTriangle size={11} /> Guardian: 1 Issue Detected
              </span>
              <span>main*</span>
              <span>Pytest Sandbox: Exit 0 (Valid)</span>
            </div>
            <div>
              <span>UTF-8 • TypeScript • LF • Dependency Guardian v1.1.0</span>
            </div>
          </div>
        </div>

        {/* Extension Installation & Command Reference (from package.json in NexMind) */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--color-border-default)',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.65rem', color: 'var(--color-text-primary)', letterSpacing: '-0.025em' }}>
              Install Extension Locally
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              The Dependency Guardian extension connects directly to your local FastAPI backend over loopback (<code>127.0.0.1:8765</code>).
            </p>

            {/* Copyable Install Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1.15rem',
                gap: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <Terminal size={17} style={{ color: 'var(--color-brand-primary)' }} />
              <span style={{ flex: 1, color: 'var(--color-text-primary)', fontWeight: 600 }}>
                code --install-extension dependency-guardian.vsix
              </span>
              <button
                onClick={copyInstallCommand}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: copied ? 'var(--color-success)' : 'var(--color-brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
              Native VS Code Commands (package.json)
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9375rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span><code style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.15rem 0.45rem', backgroundColor: 'var(--color-surface-muted)', border: '1px solid var(--color-border-subtle)', borderRadius: '4px' }}>dependencyGuardian.openDashboard</code> — Open Dashboard Webview Panel</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span><code style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.15rem 0.45rem', backgroundColor: 'var(--color-surface-muted)', border: '1px solid var(--color-border-subtle)', borderRadius: '4px' }}>dependencyGuardian.scanDependencies</code> — Probe and run structural diffs</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span><code style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.15rem 0.45rem', backgroundColor: 'var(--color-surface-muted)', border: '1px solid var(--color-border-subtle)', borderRadius: '4px' }}>dependencyGuardian.createBaseline</code> — Capture & version known-good baseline</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span><code style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.15rem 0.45rem', backgroundColor: 'var(--color-surface-muted)', border: '1px solid var(--color-border-subtle)', borderRadius: '4px' }}>dependencyGuardian.resetDemo</code> — Restore services to baseline v1</span>
              </li>
            </ul>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .vscode-ide-grid {
              grid-template-columns: 1fr !important;
            }
            .vscode-sidebar {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
