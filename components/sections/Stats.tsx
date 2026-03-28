'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { stats } from '@/data/portfolio';

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState('0');
  const numericPart = value.replace(/[^0-9.]/g, '');
  const suffix = value.replace(/[0-9.]/g, '');
  const numeric = parseFloat(numericPart);

  useEffect(() => {
    if (!inView || isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const steps = 40;
    const increment = numeric / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, numeric);
      const formatted = Number.isInteger(numeric)
        ? Math.round(current).toString()
        : current.toFixed(1);
      setDisplay(formatted + suffix);
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value, numeric, suffix]);

  return <>{display}</>;
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 px-6 transition-colors ${isDark ? 'bg-surface' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`p-8 md:p-12 rounded-lg border border-outline-variant/10 relative overflow-hidden ${
            isDark ? 'bg-surface-container-lowest' : 'bg-gray-50 border-gray-200'
          }`}
        >
          {/* Decorative version tag */}
          <div className="absolute top-4 right-4 font-mono text-[10px] text-primary/20 select-none pointer-events-none">
            SYSTEM_LOG_v4.0.2
          </div>

          {/* Glow */}
          <div className="absolute top-0 left-1/4 w-64 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              >
                <span className="text-4xl md:text-5xl font-bold text-primary font-headline">
                  <AnimatedNumber value={stat.value} inView={inView} />
                </span>
                <span className={`text-xs uppercase tracking-widest font-body ${
                  isDark ? 'text-on-surface-variant' : 'text-gray-500'
                }`}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
