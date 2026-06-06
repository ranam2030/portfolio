'use client';

import { useState, useCallback, type ReactNode, type MouseEvent } from 'react';

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleProps {
  children: ReactNode;
  className?: string;
  color?: string;
  duration?: number;
}

/**
 * Material-style ripple. Wrap any button/link; a circle expands from the click
 * point and fades. GPU-friendly (transform + opacity only) and reduced-motion
 * aware — when motion is reduced, no ripple is spawned.
 */
export function Ripple({
  children,
  className = '',
  color = 'rgba(255,255,255,0.4)',
  duration = 600,
}: RippleProps) {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      if (
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const id = Date.now() + Math.random();

      setRipples((prev) => [...prev, { id, x, y, size }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, duration);
    },
    [duration]
  );

  return (
    <span
      onClick={handleClick}
      className={`relative inline-flex overflow-hidden ${className}`}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            background: color,
            animation: `ripple-expand ${duration}ms ease-out forwards`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
