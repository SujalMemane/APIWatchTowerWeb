import React, { useEffect, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [smoothPos, setSmoothPos] = useState({ x: -300, y: -300 });
  const [isVisible, setIsVisible] = useState(false);
  const [cardGlowStyle, setCardGlowStyle] = useState<React.CSSProperties | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = -300;
    let targetY = -300;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Detect if hovering over a card or interactive component
      const target = e.target as HTMLElement | null;
      const card = target?.closest('.feature-card, .telemetry-card, .workflow-detail-grid, button, a.btn, .btn, pre, .terminal-window');
      
      if (card) {
        const rect = card.getBoundingClientRect();
        setCardGlowStyle({
          left: `${rect.left + rect.width / 2}px`,
          top: `${rect.top + rect.height / 2}px`,
          width: `${rect.width + 36}px`,
          height: `${rect.height + 36}px`,
          opacity: 1
        });
      } else {
        setCardGlowStyle(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCardGlowStyle(null);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lerp loop for the ambient spotlight
    const loop = () => {
      setSmoothPos((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.16,
        y: prev.y + (targetY - prev.y) * 0.16
      }));
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

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
        zIndex: 1, // Rendered below #main-content (zIndex: 2) so text and cards stay crisp and un-obscured
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {/* 1. Global Ambient Dark Purple Spotlight Glow behind content */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `
            radial-gradient(380px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(124, 58, 237, 0.20), rgba(99, 102, 241, 0.12) 40%, transparent 70%),
            radial-gradient(780px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(109, 40, 217, 0.10), rgba(139, 92, 246, 0.05) 55%, transparent 70%)
          `,
          pointerEvents: 'none',
          transition: 'opacity 300ms ease'
        }}
      />

      {/* 2. Interactive Underglow Shadow: Cast directly below hovered cards and components */}
      {cardGlowStyle && (
        <div
          style={{
            position: 'fixed',
            transform: 'translate(-50%, -50%)',
            borderRadius: 'var(--radius-xl, 24px)',
            background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.35) 0%, rgba(99, 102, 241, 0.20) 50%, transparent 75%)',
            filter: 'blur(22px)',
            pointerEvents: 'none',
            transition: 'all 180ms ease-out',
            ...cardGlowStyle
          }}
        />
      )}
    </div>
  );
};
