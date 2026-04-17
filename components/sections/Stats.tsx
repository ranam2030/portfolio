'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { stats } from '@/data/portfolio';

const STAT_META = [
  { icon: 'trending_down',    color: '#98cbff', arc: 0.70, label: 'of manual regression eliminated' },
  { icon: 'checklist',        color: '#5dcaa5', arc: 0.60, label: 'test cases running in CI daily'  },
  { icon: 'workspace_premium',color: '#f9a825', arc: 0.55, label: 'years in QA automation'          },
  { icon: 'shield_check',     color: '#bdc2ff', arc: 1.00, label: 'critical bugs in production'      },
];

function AnimatedNumber({
  value, inView, style, className,
}: {
  value: string; inView: boolean; style?: React.CSSProperties; className?: string;
}) {
  const [display, setDisplay] = useState('0');
  const numericPart = value.replace(/[^0-9.]/g, '');
  const suffix = value.replace(/[0-9.]/g, '');
  const numeric = parseFloat(numericPart);

  useEffect(() => {
    if (!inView || isNaN(numeric)) { setDisplay(value); return; }
    const duration = 1400;
    const steps = 50;
    const increment = numeric / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, numeric);
      const formatted = Number.isInteger(numeric) ? Math.round(current).toString() : current.toFixed(1);
      setDisplay(formatted + suffix);
      if (step >= steps) { setDisplay(value); clearInterval(timer); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value, numeric, suffix]);

  return <span className={className} style={style}>{display}</span>;
}

function StatCard({ stat, meta, index, inView, isDark }: {
  stat: { value: string; label: string };
  meta: typeof STAT_META[number];
  index: number;
  inView: boolean;
  isDark: boolean;
}) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - meta.arc);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.13, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative p-7 rounded-2xl border overflow-hidden transition-all duration-300 ${
        isDark
          ? 'bg-surface-container border-outline-variant/12 hover:border-outline-variant/28'
          : 'bg-white border-gray-200 shadow-sm hover:shadow-lg'
      }`}
    >
      {/* Colored top stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: meta.color }}
      />

      {/* Background glow blob */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 right-2 w-28 h-28 rounded-full blur-[40px] pointer-events-none"
        style={{ background: meta.color }}
      />

      <div className="flex items-start justify-between gap-4 relative z-10">
        {/* Text side */}
        <div className="flex flex-col gap-2 min-w-0">
          <AnimatedNumber
            value={stat.value}
            inView={inView}
            style={{ color: meta.color }}
            className="text-5xl md:text-6xl font-bold font-headline leading-none"
          />
          <p
            className={`text-[11px] uppercase tracking-widest font-body font-semibold leading-tight ${
              isDark ? 'text-on-surface-variant' : 'text-gray-500'
            }`}
          >
            {stat.label}
          </p>
          <p
            className={`text-xs font-body mt-1 ${
              isDark ? 'text-on-surface-variant/40' : 'text-gray-400'
            }`}
          >
            {meta.label}
          </p>
        </div>

        {/* SVG arc progress */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="-rotate-90 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r={radius} fill="none" strokeWidth="7"
              className={isDark ? 'stroke-outline-variant/20' : 'stroke-gray-100'}
            />
            <motion.circle
              cx="50" cy="50" r={radius} fill="none"
              stroke={meta.color} strokeWidth="7" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={inView ? { strokeDashoffset: offset } : {}}
              transition={{ delay: 0.4 + index * 0.13, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.13, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="material-symbols-outlined text-[26px]"
              style={{ color: meta.color }}
            >
              {meta.icon}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={`py-24 px-6 transition-colors ${isDark ? 'bg-surface' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Section label */}
        <motion.div
          className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="section-label">Impact Numbers</span>
            <h2 className={`text-3xl font-bold font-headline tracking-tight ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
              By The Numbers
            </h2>
          </div>
          <span
            className={`text-[10px] font-mono px-3 py-1.5 rounded-lg border select-none ${
              isDark
                ? 'border-outline-variant/20 bg-surface-container text-primary/40'
                : 'border-gray-200 bg-gray-50 text-gray-400'
            }`}
          >
            SYSTEM_LOG_v4.0.2
          </span>
        </motion.div>

        {/* KPI cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              meta={STAT_META[i]}
              index={i}
              inView={inView}
              isDark={isDark}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
