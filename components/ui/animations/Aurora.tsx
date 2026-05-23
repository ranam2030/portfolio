'use client';

import { type CSSProperties } from 'react';

interface AuroraProps {
  className?: string;
  colorStops?: [string, string, string];
  speed?: number;
  amplitude?: number;
}

/**
 * CSS-only aurora ribbon — three soft horizontal bands that drift and breathe.
 * Cheap (no canvas, no JS animation loop) and tasteful behind content.
 */
export function Aurora({
  className = '',
  colorStops = ['#98cbff', '#bdc2ff', '#5dcaa5'],
  speed = 14,
  amplitude = 0.55,
}: AuroraProps) {
  const [a, b, c] = colorStops;

  const style: CSSProperties = {
    ['--aurora-a' as never]: a,
    ['--aurora-b' as never]: b,
    ['--aurora-c' as never]: c,
    ['--aurora-duration' as never]: `${speed}s`,
    ['--aurora-amplitude' as never]: amplitude,
  };

  return (
    <div
      aria-hidden
      className={`pointer-events-none overflow-hidden ${className}`}
      style={style}
    >
      <div className="aurora-band aurora-band-1" />
      <div className="aurora-band aurora-band-2" />
      <div className="aurora-band aurora-band-3" />

      <style jsx>{`
        .aurora-band {
          position: absolute;
          inset: -25% -10% -25% -10%;
          filter: blur(72px);
          opacity: var(--aurora-amplitude);
          mix-blend-mode: screen;
          will-change: transform, opacity;
        }
        .aurora-band-1 {
          background: radial-gradient(
            ellipse 60% 35% at 30% 40%,
            var(--aurora-a) 0%,
            transparent 70%
          );
          animation: aurora-drift-1 var(--aurora-duration) ease-in-out infinite alternate;
        }
        .aurora-band-2 {
          background: radial-gradient(
            ellipse 55% 30% at 70% 60%,
            var(--aurora-b) 0%,
            transparent 70%
          );
          animation: aurora-drift-2 calc(var(--aurora-duration) * 1.3) ease-in-out infinite alternate;
        }
        .aurora-band-3 {
          background: radial-gradient(
            ellipse 50% 28% at 50% 30%,
            var(--aurora-c) 0%,
            transparent 70%
          );
          animation: aurora-drift-3 calc(var(--aurora-duration) * 1.6) ease-in-out infinite alternate;
        }
        @keyframes aurora-drift-1 {
          0%   { transform: translate3d(-8%, -4%, 0) rotate(-2deg); }
          100% { transform: translate3d(10%, 6%, 0) rotate(3deg); }
        }
        @keyframes aurora-drift-2 {
          0%   { transform: translate3d(6%, 4%, 0) rotate(2deg); }
          100% { transform: translate3d(-10%, -6%, 0) rotate(-3deg); }
        }
        @keyframes aurora-drift-3 {
          0%   { transform: translate3d(0, 8%, 0) scale(1); }
          100% { transform: translate3d(2%, -6%, 0) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
