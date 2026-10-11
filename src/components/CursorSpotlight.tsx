import React, { useEffect, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable/interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, select, textarea, [role="button"], .interactive, .btn, .feature-card, .telemetry-card');
        setIsHovering(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lerp animation loop for trailing ring and ambient spotlight
    const loop = () => {
      setSmoothPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18
        };
      });
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="cursor-spotlight-layer"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 99990,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {/* 1. Dark Ambient Vignette / Spotlight Glow across the entire website */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `
            radial-gradient(160px circle at ${pos.x}px ${pos.y}px, rgba(15, 23, 42, 0.20), transparent 75%),
            radial-gradient(380px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(15, 23, 42, 0.18), rgba(79, 70, 229, 0.14) 40%, transparent 70%),
            radial-gradient(750px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(30, 27, 75, 0.12), rgba(99, 102, 241, 0.08) 50%, transparent 68%)
          `,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
          zIndex: 99991,
          transition: 'opacity 250ms ease'
        }}
      />

      {/* 2. Prominent Dark Trailing Outer Ring */}
      <div
        style={{
          position: 'fixed',
          top: smoothPos.y,
          left: smoothPos.x,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.45 : 1})`,
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: '2px solid rgba(15, 23, 42, 0.75)', // High-contrast dark border
          backgroundColor: isHovering ? 'rgba(79, 70, 229, 0.20)' : 'rgba(15, 23, 42, 0.08)',
          boxShadow: '0 0 16px rgba(15, 23, 42, 0.28), inset 0 0 8px rgba(79, 70, 229, 0.20)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'transform 180ms cubic-bezier(0.2, 0.9, 0.3, 1), background-color 150ms ease, border-color 150ms ease, width 150ms ease, height 150ms ease'
        }}
      />

      {/* 3. High-Contrast Deep Dark Center Cursor Point */}
      <div
        style={{
          position: 'fixed',
          top: pos.y,
          left: pos.x,
          transform: `translate(-50%, -50%) scale(${isHovering ? 0.75 : 1})`,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#0f172a', // Deep dark obsidian
          border: '2px solid #ffffff', // Clean white perimeter for instant visibility on any surface
          boxShadow: '0 0 10px rgba(15, 23, 42, 0.9), 0 2px 6px rgba(0, 0, 0, 0.45)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 100ms ease'
        }}
      />
    </div>
  );
};

