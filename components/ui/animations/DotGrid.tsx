'use client';

import { useEffect, useRef } from 'react';

interface DotGridProps {
  className?: string;
  dotColor?: string;
  activeColor?: string;
  spacing?: number;
  dotSize?: number;
  proximity?: number;
}

/**
 * Canvas-rendered dot grid that brightens dots near the cursor. Cheap to render
 * — only draws once per requestAnimationFrame and only animates dots inside the
 * mouse's `proximity` radius. Pointer-events disabled so it never blocks UI.
 */
export function DotGrid({
  className = '',
  dotColor = 'rgba(152,203,255,0.08)',
  activeColor = 'rgba(152,203,255,0.55)',
  spacing = 32,
  dotSize = 1.4,
  proximity = 120,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const { x: mx, y: my, active } = mouseRef.current;

      for (let x = spacing / 2; x < rect.width; x += spacing) {
        for (let y = spacing / 2; y < rect.height; y += spacing) {
          let color = dotColor;
          let size = dotSize;

          if (active) {
            const dx = x - mx;
            const dy = y - my;
            const dist = Math.hypot(dx, dy);
            if (dist < proximity) {
              const t = 1 - dist / proximity;
              // Interpolate alpha and size toward active state
              color = activeColor;
              size = dotSize + t * 1.6;
              ctx.globalAlpha = 0.3 + t * 0.7;
            } else {
              ctx.globalAlpha = 1;
            }
          } else {
            ctx.globalAlpha = 1;
          }

          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      rafId = requestAnimationFrame(loop);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    loop();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
    };
  }, [activeColor, dotColor, dotSize, proximity, spacing]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
