'use client';

import { useEffect, useRef } from 'react';

interface SquaresProps {
  className?: string;
  lineColor?: string;
  size?: number;
  speed?: number;
  direction?: 'diagonal' | 'up' | 'right';
  hoverFillColor?: string;
}

/**
 * A slowly-scrolling grid of square outlines, optionally filling the cell under
 * the cursor. Sits as a section background — silently atmospheric.
 */
export function Squares({
  className = '',
  lineColor = 'rgba(152,203,255,0.06)',
  size = 44,
  speed = 0.3,
  direction = 'diagonal',
  hoverFillColor = 'rgba(152,203,255,0.08)',
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
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

      const ox = offsetRef.current.x % size;
      const oy = offsetRef.current.y % size;

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Hovered cell fill
      if (hoverRef.current.active) {
        const cx = Math.floor((hoverRef.current.x - ox) / size) * size + ox;
        const cy = Math.floor((hoverRef.current.y - oy) / size) * size + oy;
        ctx.fillStyle = hoverFillColor;
        ctx.fillRect(cx, cy, size, size);
      }

      // Vertical lines
      for (let x = ox; x < rect.width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }
      // Horizontal lines
      for (let y = oy; y < rect.height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      // Advance offset
      if (direction === 'diagonal') {
        offsetRef.current.x -= speed;
        offsetRef.current.y -= speed;
      } else if (direction === 'right') {
        offsetRef.current.x -= speed;
      } else if (direction === 'up') {
        offsetRef.current.y += speed;
      }

      rafId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      hoverRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onMouseLeave = () => {
      hoverRef.current.active = false;
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
    };
  }, [direction, hoverFillColor, lineColor, size, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
