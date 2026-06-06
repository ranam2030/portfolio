'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';
import { useInView } from 'framer-motion';

interface ScrambledTextProps {
  text: string;
  className?: string;
  duration?: number;
  scrambleChars?: string;
  delay?: number;
  as?: ElementType;
  once?: boolean;
}

/**
 * Text that arrives scrambled (random monospace chars) and "decrypts" itself
 * into the real text — on-theme for a QA/automation portfolio.
 */
export function ScrambledText({
  text,
  className = '',
  duration = 900,
  scrambleChars = '!@#$%^&*<>?/_+=-01',
  delay = 0,
  as: Tag = 'span',
  once = true,
}: ScrambledTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: '-40px' });
  // Initialize to the real text so server and first client render match
  // (random chars in the initializer would cause a hydration mismatch).
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView) return;

    // Respect prefers-reduced-motion — reveal the final text without scrambling.
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setOutput(text);
      return;
    }

    // Seed a fully-scrambled string (client-only) before animating to the text.
    setOutput(
      text
        .split('')
        .map((c) => (c === ' ' ? ' ' : randomChar(scrambleChars)))
        .join('')
    );

    let frame = 0;
    const totalFrames = Math.max(8, Math.round(duration / 60));
    const startAt = performance.now() + delay;
    let rafId = 0;

    const tick = (now: number) => {
      if (now < startAt) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(1, frame / totalFrames);
      const revealCount = Math.floor(progress * text.length);

      const next = text
        .split('')
        .map((c, i) => {
          if (i < revealCount || c === ' ') return c;
          return randomChar(scrambleChars);
        })
        .join('');

      setOutput(next);
      frame++;

      if (frame <= totalFrames) {
        rafId = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, text, duration, scrambleChars, delay]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{output}</span>
    </Tag>
  );
}

function randomChar(pool: string): string {
  return pool.charAt(Math.floor(Math.random() * pool.length));
}
