'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'low' | 'lowest' | 'none';
}

export function SectionWrapper({
  id,
  children,
  className = '',
  variant = 'default',
}: SectionWrapperProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bgMap = {
    default: isDark ? 'bg-surface' : 'bg-white',
    low: isDark ? 'bg-surface-container-low' : 'bg-gray-50',
    lowest: isDark ? 'bg-surface-container-lowest' : 'bg-gray-100',
    none: '',
  };

  return (
    <section id={id} className={`${bgMap[variant]} ${className}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
