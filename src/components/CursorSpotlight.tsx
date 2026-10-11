import React, { useEffect, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
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
      {/* Global Ambient Spotlight Glow behind content */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `
            radial-gradient(650px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(99, 102, 241, 0.07), transparent 50%),
            radial-gradient(320px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(56, 189, 248, 0.05), transparent 45%)
          `,
          zIndex: 1,
          pointerEvents: 'none',
          transition: 'opacity 300ms ease'
        }}
      />
    </div>
  );
};

