'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Pixels of travel across the scroll range. Negative moves up as you scroll down. */
  offset?: number;
  /** 'y' (default) or 'x' axis. */
  axis?: 'x' | 'y';
}

/**
 * Translates its children along an axis as the element scrolls through the
 * viewport, creating depth. GPU-accelerated (transform only) and disabled when
 * the user prefers reduced motion.
 */
export function Parallax({
  children,
  className = '',
  offset = -60,
  axis = 'y',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress (0→1) to a translation range.
  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-offset, offset]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={axis === 'y' ? { y: translate } : { x: translate }}
    >
      {children}
    </motion.div>
  );
}
