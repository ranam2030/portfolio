'use client';

import { useEffect, useRef, useState, type ElementType, type CSSProperties } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  /** Final numeric value to count up to. */
  to: number;
  /** Starting value (defaults to 0). */
  from?: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Decimal places (auto-detected if `to` is float). */
  decimals?: number;
  /** Optional prefix (e.g. "$") and suffix (e.g. "%", "+"). */
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  once?: boolean;
}

/**
 * Counts a number up when scrolled into view. Uses cubic-out easing.
 * Pair with prefix/suffix for things like "70%", "3 CI platforms", "$1.2k".
 */
export function CountUp({
  to,
  from = 0,
  duration = 1400,
  decimals,
  prefix = '',
  suffix = '',
  className,
  style,
  as: Tag = 'span',
  once = true,
}: CountUpProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: '-40px' });
  const [value, setValue] = useState(from);
  const decimalPlaces = decimals ?? (Number.isInteger(to) ? 0 : 1);

  useEffect(() => {
    if (!inView) return;
    let rafId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (to - from) * eased);
      if (p < 1) rafId = requestAnimationFrame(tick);
      else setValue(to);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, to, from, duration]);

  const display =
    decimalPlaces > 0 ? value.toFixed(decimalPlaces) : Math.round(value).toString();

  return (
    <Tag ref={ref} className={className} style={style}>
      {prefix}
      {display}
      {suffix}
    </Tag>
  );
}
