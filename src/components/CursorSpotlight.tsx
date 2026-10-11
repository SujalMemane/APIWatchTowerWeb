import React, { useEffect, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('button, a, input, [role="button"], .feature-card, .interactive-card');
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lerp animation loop for the trailing halo
    const loop = () => {
      setSmoothPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
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
        zIndex: 9999,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {/* 1. Global Ambient Spotlight Glow behind content */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `
            radial-gradient(700px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(79, 70, 229, 0.06), transparent 50%),
            radial-gradient(350px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(56, 189, 248, 0.04), transparent 45%)
          `,
          zIndex: 1,
          pointerEvents: 'none',
          transition: 'opacity 300ms ease'
        }}
      />

      {/* 2. Sleek Trailing Halo */}
      <div
        style={{
          position: 'fixed',
          left: `${smoothPos.x}px`,
          top: `${smoothPos.y}px`,
          width: isHovered ? '44px' : '28px',
          height: isHovered ? '44px' : '28px',
          borderRadius: '50%',
          border: `1.5px solid ${isHovered ? 'rgba(79, 70, 229, 0.6)' : 'rgba(99, 102, 241, 0.3)'}`,
          backgroundColor: isHovered ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          transition: 'width 200ms cubic-bezier(0.16, 1, 0.3, 1), height 200ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, background-color 200ms ease',
          zIndex: 9999,
          pointerEvents: 'none',
          boxShadow: isHovered ? '0 0 16px rgba(79, 70, 229, 0.25)' : 'none'
        }}
      />

      {/* 3. Precise Center Pointer Dot */}
      <div
        style={{
          position: 'fixed',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '6px' : '5px',
          height: isHovered ? '6px' : '5px',
          borderRadius: '50%',
          backgroundColor: isHovered ? '#4f46e5' : '#6366f1',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
          pointerEvents: 'none',
          transition: 'background-color 150ms ease, width 150ms ease, height 150ms ease',
          boxShadow: '0 0 6px rgba(79, 70, 229, 0.5)'
        }}
      />
    </div>
  );
};
