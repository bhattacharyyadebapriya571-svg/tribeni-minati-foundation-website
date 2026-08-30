import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export const AmbientCanvas3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    let handleResize: (() => void) | null = null;

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = (canvas.width = window.innerWidth || 1000);
      let height = (canvas.height = window.innerHeight || 800);

      handleResize = () => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth || 1000;
        height = canvas.height = window.innerHeight || 800;
      };
      window.addEventListener('resize', handleResize);

      const particles: Particle[] = Array.from({ length: 30 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: 1.5 + Math.random() * 2,
        color: Math.random() > 0.5 ? '37, 99, 235' : '217, 119, 6',
        alpha: 0.08 + Math.random() * 0.12,
      }));

      const render = () => {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.fill();
        });

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    } catch (_) {}

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (handleResize) window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-80" />;
};
