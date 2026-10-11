import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenQuickstart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuickstart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'API Diff', href: '#interactive-demo' },
    { label: 'VS Code', href: '#extension-showcase' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Docs', href: '#developer-docs' },
    { label: 'FAQ', href: '#faq' }
  ];

  // Scroll listener for sticky elevation, reading progress bar, and active section scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Calculate total page scroll progress (0% - 100%)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / docHeight) * 100));
        setScrollProgress(progress);
      }

      // Determine active section using section offsets
      const sectionIds = ['how-it-works', 'capabilities', 'interactive-demo', 'extension-showcase', 'architecture', 'developer-docs', 'faq'];
      const scrollPosition = currentScrollY + 120; // 120px offset for sticky navbar + breathing room

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(`#${sectionIds[i]}`);
            return;
          }
        }
      }
      if (currentScrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Smooth scroll handler with precise sticky navbar offset calculation
  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#' || href === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 76;
      const elementPosition = (target as HTMLElement).getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderBottom: `1px solid ${scrolled ? 'rgba(226, 232, 240, 0.95)' : 'rgba(241, 245, 249, 0.8)'}`,
          boxShadow: scrolled ? '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)' : 'none',
          transition: 'all 220ms cubic-bezier(0.4, 0, 0.2, 1)',
          height: scrolled ? '62px' : 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: '1rem'
          }}
        >
          {/* Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#');
            }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'opacity var(--transition-fast)'
            }} 
            aria-label="Dependency Guardian Home"
          >
            <Logo size={28} />
          </a>

          {/* Desktop Navigation Links with Active Scroll-Spy Pills */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
            className="desktop-nav-links"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  style={{
                    fontSize: '0.84375rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
                    backgroundColor: isActive ? 'var(--color-brand-surface)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--color-brand-border)' : 'transparent'}`,
                    padding: '0.375rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    transition: 'all var(--transition-fast)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-brand-primary)';
                      e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
            className="desktop-nav-actions"
          >
            <a
              href="#developer-docs"
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                if (onOpenQuickstart) {
                  e.preventDefault();
                  onOpenQuickstart();
                } else {
                  e.preventDefault();
                  handleLinkClick('#developer-docs');
                }
              }}
              style={{ whiteSpace: 'nowrap', fontWeight: 600 }}
            >
              <Terminal size={14} /> Quickstart
            </a>

            <a
              href="#extension-showcase"
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#extension-showcase');
              }}
              style={{ whiteSpace: 'nowrap', fontWeight: 600 }}
            >
              Get Extension <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              padding: '0.5rem',
              color: 'var(--color-text-primary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 'var(--radius-md)',
              transition: 'background-color var(--transition-fast)'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Micro-Thin Interactive Reading Progress Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #06b6d4)',
            boxShadow: '0 0 8px rgba(99, 102, 241, 0.4)',
            transition: 'width 80ms ease-out',
            pointerEvents: 'none'
          }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile Drawer Overlay & Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 'var(--nav-height)',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.45)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 44,
              animation: 'navFadeIn 200ms ease-out'
            }}
            aria-hidden="true"
          />

          {/* Slide-Down Drawer Container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            style={{
              position: 'fixed',
              top: 'var(--nav-height)',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              padding: '1.75rem 1.5rem',
              borderBottom: '1px solid var(--color-border-default)',
              boxShadow: '0 20px 30px -10px rgba(15, 23, 42, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              zIndex: 45,
              maxHeight: 'calc(100vh - var(--nav-height))',
              overflowY: 'auto',
              animation: 'navDrawerSlide 220ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    style={{
                      fontSize: '1rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-primary)',
                      backgroundColor: isActive ? 'var(--color-brand-surface)' : 'transparent',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-brand-primary)'
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border-subtle)' }}>
              <a
                href="#developer-docs"
                className="btn btn-secondary btn-lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuickstart) {
                    onOpenQuickstart();
                  } else {
                    handleLinkClick('#developer-docs');
                  }
                }}
                style={{ justifyContent: 'center' }}
              >
                <Terminal size={16} /> Quickstart & Config
              </a>
              <a
                href="#extension-showcase"
                className="btn btn-primary btn-lg"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#extension-showcase');
                }}
                style={{ justifyContent: 'center' }}
              >
                Get VS Code Extension <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes navDrawerSlide {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes navFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 1120px) {
          .desktop-nav-links {
            display: none !important;
          }
          .desktop-nav-actions {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
