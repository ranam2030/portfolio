'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { aboutContent } from '@/data/portfolio';

// ─── Bento card metadata (parallel to aboutContent.highlights) ────────────
const CARD_META = [
  { metric: '3 CI platforms',     span: 'md:col-span-2', hue: 'primary'  },
  { metric: '70% regression ↓',   span: 'md:col-span-1', hue: 'green'   },
  { metric: '100% tx accuracy',   span: 'md:col-span-1', hue: 'amber'   },
  { metric: 'k6 · JMeter · Load', span: 'md:col-span-2', hue: 'violet'  },
] as const;

type Hue = typeof CARD_META[number]['hue'];

const HUE: Record<Hue, { iconBg: string; iconColor: string; metric: string; border: string; accent: string }> = {
  primary: { iconBg: 'bg-primary/10',       iconColor: 'text-primary',    metric: 'text-primary',    border: 'border-primary/15 hover:border-primary/35',    accent: 'bg-primary'      },
  green:   { iconBg: 'bg-green-500/10',     iconColor: 'text-green-500',  metric: 'text-green-500',  border: 'border-green-500/15 hover:border-green-500/35',  accent: 'bg-green-500'    },
  amber:   { iconBg: 'bg-amber-500/10',     iconColor: 'text-amber-500',  metric: 'text-amber-500',  border: 'border-amber-500/15 hover:border-amber-500/35',  accent: 'bg-amber-500'    },
  violet:  { iconBg: 'bg-violet-500/10',    iconColor: 'text-violet-500', metric: 'text-violet-500', border: 'border-violet-500/15 hover:border-violet-500/35', accent: 'bg-violet-500'   },
};

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [firstPara, ...bodyParas] = aboutContent.paragraphs;

  return (
    <section
      id="about"
      className={`py-32 px-6 transition-colors ${isDark ? 'bg-surface-container-low' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Sticky sidebar (unchanged) ─────────────────────────── */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:sticky lg:top-32">
              <span className="section-label">{aboutContent.label}</span>
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight font-headline leading-tight ${
                isDark ? 'text-on-surface' : 'text-gray-900'
              }`}>
                {aboutContent.heading}
              </h2>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-primary" />
                <span className="text-xs font-mono text-primary uppercase tracking-widest">
                  QA · 5+ YRS
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Content (redesigned) ───────────────────────────────── */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 1 ── Pull-quote block */}
            <div className={`relative pl-5 mb-10 border-l-2 border-primary/50`}>
              <span
                aria-hidden
                className="absolute -top-4 -left-1 text-6xl leading-none font-serif text-primary/15 select-none"
              >
                "
              </span>
              <p className={`text-lg md:text-xl font-light leading-relaxed font-body ${
                isDark ? 'text-on-surface-variant' : 'text-gray-600'
              }`}>
                With over{' '}
                <span className={`font-semibold ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
                  5+ years of dedicated experience
                </span>{' '}
                in the QA ecosystem,{firstPara.slice(firstPara.indexOf('I '))}
              </p>
            </div>

            {/* 2 ── Numbered body paragraphs */}
            <div className="space-y-5 mb-12">
              {bodyParas.map((para, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className={`text-[11px] font-mono mt-1.5 w-5 shrink-0 ${
                    isDark ? 'text-primary/30' : 'text-primary/40'
                  }`}>
                    0{i + 1}
                  </span>
                  <p className={`text-base font-light leading-relaxed font-body ${
                    isDark ? 'text-on-surface-variant' : 'text-gray-600'
                  }`}>
                    {para}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 3 ── Bento highlight grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {aboutContent.highlights.map((item, i) => {
                const meta = CARD_META[i];
                const hue = HUE[meta.hue];

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3 }}
                    className={`group ${meta.span} p-6 rounded-2xl border transition-all duration-300 cursor-default ${
                      isDark
                        ? `bg-surface-container ${hue.border}`
                        : `bg-white shadow-sm hover:shadow-md ${hue.border}`
                    }`}
                  >
                    {/* Icon + metric row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${hue.iconBg}`}>
                        <span className={`material-symbols-outlined text-2xl ${hue.iconColor}`}>
                          {item.icon}
                        </span>
                      </div>
                      <span className={`text-[11px] font-mono font-medium ${hue.metric}`}>
                        {meta.metric}
                      </span>
                    </div>

                    {/* Animated accent line */}
                    <div
                      className={`h-[2px] rounded-full mb-4 transition-all duration-500 group-hover:w-14 w-8 ${hue.accent}`}
                    />

                    {/* Text */}
                    <h3 className={`text-sm font-bold font-headline mb-1.5 ${
                      isDark ? 'text-on-surface' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed font-body ${
                      isDark ? 'text-on-surface-variant' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
