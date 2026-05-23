'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ElementType } from 'react';

type Direction = 'top' | 'bottom';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  direction?: Direction;
  as?: ElementType;
  splitBy?: 'word' | 'char';
  once?: boolean;
}

export function BlurText({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.04,
  direction = 'bottom',
  as: Tag = 'span',
  splitBy = 'word',
  once = true,
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  const items =
    splitBy === 'word'
      ? text.split(/(\s+)/)
      : text.split('');

  const yOffset = direction === 'bottom' ? 14 : -14;

  return (
    <Tag ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {items.map((item, i) => {
        const isWhitespace = /^\s+$/.test(item);
        if (isWhitespace) return <span key={i}>{item}</span>;

        return (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block will-change-[filter,transform,opacity]"
            initial={{ opacity: 0, filter: 'blur(10px)', y: yOffset }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            transition={{
              delay: delay + i * stagger,
              duration,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item}
          </motion.span>
        );
      })}
    </Tag>
  );
}
