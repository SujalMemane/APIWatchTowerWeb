import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenQuickstart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuickstart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'API Diff Demo', href: '#interactive-demo' },
    { label: 'VS Code Extension', href: '#extension-showcase' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Developer Docs', href: '#developer-docs' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.94)' : 'var(--color-canvas)',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--color-border-default)' : 'transparent'}`,
        transition: 'all 200ms ease',
        height: 'var(--nav-height)',
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
          width: '100%'
        }}
      >
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="Dependency Guardian Home">
          <Logo size={28} />
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem'
          }}
          className="desktop-nav-links"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                transition: 'color var(--transition-fast)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
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
              }
            }}
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
            cursor: 'pointer'
          }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#ffffff',
            padding: '1.5rem',
            borderTop: '1px solid var(--color-border-default)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            zIndex: 45,
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  padding: '0.625rem 0',
                  borderBottom: '1px solid var(--color-border-subtle)',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <a
              href="#developer-docs"
              className="btn btn-secondary btn-lg"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenQuickstart) onOpenQuickstart();
              }}
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
            >
              Get VS Code Extension <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
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
    </header>
  );
};
