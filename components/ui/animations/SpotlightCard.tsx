'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  radius?: number;
}

/**
 * A wrapper that paints a soft radial spotlight under the cursor while it's
 * inside the card. Pure CSS variables driven by JS — no re-renders.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(152, 203, 255, 0.12)',
  radius = 280,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
    el.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{
        ['--spotlight-x' as never]: '50%',
        ['--spotlight-y' as never]: '50%',
        ['--spotlight-opacity' as never]: 0,
      }}
    >
      {/* Spotlight overlay — sits above background, below content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(${radius}px circle at var(--spotlight-x) var(--spotlight-y), ${spotlightColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
