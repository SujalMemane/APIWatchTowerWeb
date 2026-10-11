import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  phase: number;
  type: 'node' | 'cross' | 'ring';
}

export const AntigravityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with easing
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Particle density calculation
    const particleCount = Math.min(Math.floor((width * height) / 28000), 55);
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const types: ('node' | 'cross' | 'ring')[] = ['node', 'node', 'ring', 'cross'];
        const type = types[Math.floor(Math.random() * types.length)];
        const baseAlpha = 0.15 + Math.random() * 0.25;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Upward anti-gravity drift (negative vy)
          vx: (Math.random() - 0.5) * 0.35,
          vy: -(0.25 + Math.random() * 0.45),
          size: type === 'cross' ? 4 : type === 'ring' ? 2.5 : 1.5 + Math.random() * 1.5,
          alpha: baseAlpha,
          baseAlpha,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          phase: Math.random() * Math.PI * 2,
          type
        });
      }
    };

    initParticles();

    // Max distance to draw graph connector edges between floating nodes
    const maxDistance = 140;

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections (dependency graph edges)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const edgeAlpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${edgeAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & render individual anti-gravity floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Anti-gravity upward ascension + horizontal micro-oscillation
        p.y += p.vy;
        p.x += p.vx + Math.sin(time + p.phase) * 0.2;

        // Anti-gravity cursor deflection (repulsion field)
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const repelRadius = 130;

          if (mdist < repelRadius && mdist > 0) {
            const force = (1 - mdist / repelRadius) * 2;
            p.x += (mdx / mdist) * force;
            p.y += (mdy / mdist) * force;
          }
        }

        // Wrap around seamlessly when drifting off screen
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Pulsing opacity
        const currentAlpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 10 + p.phase) * 0.08;

        ctx.save();
        ctx.fillStyle = `rgba(79, 70, 229, ${Math.max(0.05, currentAlpha)})`;
        ctx.strokeStyle = `rgba(99, 102, 241, ${Math.max(0.08, currentAlpha)})`;

        if (p.type === 'ring') {
          // Hollow ring node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.type === 'cross') {
          // Precise coordinate crosshair (+)
          ctx.beginPath();
          ctx.lineWidth = 0.9;
          ctx.moveTo(p.x - p.size, p.y);
          ctx.lineTo(p.x + p.size, p.y);
          ctx.moveTo(p.x, p.y - p.size);
          ctx.lineTo(p.x, p.y + p.size);
          ctx.stroke();
        } else {
          // Solid graph vertex
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85
      }}
      aria-hidden="true"
    />
  );
};
