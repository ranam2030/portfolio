'use client';

import { type CSSProperties } from 'react';

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
  baseColor?: string;
  shineColor?: string;
  intensity?: number;
}

/**
 * A metallic shimmer that sweeps across gradient text.
 * Replaces static `.text-gradient` for hero / hero-like word treatments.
 */
export function ShinyText({
  text,
  className = '',
  speed = 4,
  baseColor = '#98cbff',
  shineColor = '#ffffff',
  intensity = 0.55,
}: ShinyTextProps) {
  const style: CSSProperties = {
    backgroundImage: `linear-gradient(110deg, ${baseColor} 0%, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`,
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    animation: `shiny-text-sweep ${speed}s linear infinite`,
    // intensity is used to control how visible the shine highlight is — exposed as CSS var
    ['--shine-opacity' as never]: intensity,
  };

  return (
    <>
      <span className={`inline-block ${className}`} style={style}>
        {text}
      </span>
      <style jsx>{`
        @keyframes shiny-text-sweep {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </>
  );
}
