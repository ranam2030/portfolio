'use client';

import { useRef, useCallback, type ReactNode, type MouseEvent } from 'react';

interface ClickSparkProps {
  children: ReactNode;
  className?: string;
  sparkColor?: string;
  sparkCount?: number;
  sparkSize?: number;
  sparkRadius?: number;
  duration?: number;
}

/**
 * Wraps children. On any click inside, emits a quick radial burst of small
 * sparks from the click point. No state — uses raw DOM + canvas-less SVG bits
 * removed after the animation so re-renders don't fire.
 */
export function ClickSpark({
  children,
  className = '',
  sparkColor = '#98cbff',
  sparkCount = 8,
  sparkSize = 4,
  sparkRadius = 22,
  duration = 480,
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < sparkCount; i++) {
        const angle = (i / sparkCount) * Math.PI * 2;
        const dx = Math.cos(angle) * sparkRadius;
        const dy = Math.sin(angle) * sparkRadius;

        const spark = document.createElement('span');
        spark.setAttribute('aria-hidden', 'true');
        spark.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: ${sparkSize}px;
          height: ${sparkSize}px;
          background: ${sparkColor};
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          opacity: 1;
          transition: transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration}ms ease-out;
          will-change: transform, opacity;
          z-index: 9999;
        `;
        el.appendChild(spark);

        // Force reflow so transition fires
        spark.getBoundingClientRect();

        spark.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
        spark.style.opacity = '0';

        setTimeout(() => spark.remove(), duration + 50);
      }
    },
    [sparkColor, sparkCount, sparkSize, sparkRadius, duration]
  );

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative ${className}`}
    >
      {children}
    </div>
  );
}
