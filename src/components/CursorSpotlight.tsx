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
      {/* 1. Dark Purple Ambient Spotlight Glow across the entire website */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `
            radial-gradient(240px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(109, 40, 217, 0.16), rgba(91, 33, 182, 0.12) 45%, transparent 70%),
            radial-gradient(520px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(124, 58, 237, 0.10), rgba(79, 70, 229, 0.07) 50%, transparent 68%),
            radial-gradient(800px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(139, 92, 246, 0.05), transparent 65%)
          `,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
          zIndex: 99991,
          transition: 'opacity 250ms ease'
        }}
      />

      {/* 2. Sleek Dark Purple Trailing Cursor Ring (No inner black circle) */}
      <div
        style={{
          position: 'fixed',
          top: smoothPos.y,
          left: smoothPos.x,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.4 : 1})`,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid rgba(109, 40, 217, 0.8)', // Elegant Dark Purple
          backgroundColor: isHovering ? 'rgba(124, 58, 237, 0.22)' : 'rgba(109, 40, 217, 0.09)',
          boxShadow: '0 0 16px rgba(124, 58, 237, 0.35), inset 0 0 8px rgba(139, 92, 246, 0.22)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'transform 180ms cubic-bezier(0.2, 0.9, 0.3, 1), background-color 150ms ease, border-color 150ms ease, width 150ms ease, height 150ms ease'
        }}
      />
    </div>
  );
};

