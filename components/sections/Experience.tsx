'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { experiences } from '@/data/portfolio';

const IMPACT_COLORS = ['text-primary', 'text-green-500', 'text-amber-500'];

const COMPANY_META: Record<string, {
  initials: string;
  fullName: string;
  tagline: string;
  bg: string;
  border: string;
  text: string;
  dot: string;
  icon: string;
}> = {
  'Grameenphone (via MIAKI)': {
    initials: 'GP',
    fullName: 'Grameenphone',
    tagline: 'via MIAKI · Telecom',
    bg: 'bg-emerald-500/12',
    border: 'border-emerald-500/25',
    text: 'text-emerald-500',
    dot: 'bg-emerald-500',
    icon: 'cell_tower',
  },
  'Texada Software': {
    initials: 'TX',
    fullName: 'Texada Software',
    tagline: 'SaaS · Equipment Mgmt',
    bg: 'bg-sky-500/12',
    border: 'border-sky-500/25',
    text: 'text-sky-400',
    dot: 'bg-sky-400',
    icon: 'computer',
  },
  'Brotecs Technologies': {
    initials: 'BT',
    fullName: 'Brotecs Technologies',
    tagline: 'VoIP · Healthcare',
    bg: 'bg-violet-500/12',
    border: 'border-violet-500/25',
    text: 'text-violet-400',
    dot: 'bg-violet-400',
    icon: 'router',
  },
};

function CompanyLogo({ company, active, isDark }: { company: string; active: boolean; isDark: boolean }) {
  const meta = COMPANY_META[company] ?? {
    initials: company.slice(0, 2).toUpperCase(),
    fullName: company,
    tagline: '',
    bg: 'bg-primary/12',
    border: 'border-primary/25',
    text: 'text-primary',
    dot: 'bg-primary',
    icon: 'business',
  };

  return (
    <div className="flex items-center gap-3">
      {/* Logo badge */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 shadow-sm ${meta.bg} ${meta.border}`}
      >
        <span className={`text-lg font-black font-headline tracking-tight ${meta.text}`}>
          {meta.initials}
        </span>
      </div>

      {/* Company name + tagline */}
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`text-base font-bold font-headline leading-tight ${
              isDark ? 'text-on-surface' : 'text-gray-900'
            }`}
          >
            {meta.fullName}
          </span>
          {active && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border ${meta.bg} ${meta.border} ${meta.text}`}
            >
              <span className={`w-1 h-1 rounded-full animate-pulse ${meta.dot}`} />
              Now
            </span>
          )}
        </div>
        <p className={`text-[11px] font-body mt-0.5 ${isDark ? 'text-on-surface-variant/55' : 'text-gray-400'}`}>
          {meta.tagline}
        </p>
      </div>
    </div>
  );
}

function highlightMetrics(text: string, colorClass: string) {
  const metricRegex = /(\d+[%+kKmM]*\+?|\d+,\d+\+?)/g;
  const parts = text.split(metricRegex);
  return parts.map((part, i) =>
    metricRegex.test(part) ? (
      <span key={i} className={`font-semibold ${colorClass}`}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="experience"
      className={`py-32 px-6 transition-colors ${
        isDark ? 'bg-surface-container-lowest' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="section-label">Professional Path</span>
            <h2 className={`section-heading ${isDark ? '' : '!text-gray-900'}`}>
              Career Evolution
            </h2>
            <p className={`mt-3 text-sm font-body max-w-lg ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
              6+ years building quality systems — from manual testing to architecting full automation pipelines.
            </p>
          </div>
          <p className={`text-sm font-mono shrink-0 ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
            / LOG_FILE_EXPERIENCE.EXE
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className={`absolute left-6 top-0 bottom-0 w-[1px] ${
              isDark ? 'bg-outline-variant/25' : 'bg-gray-200'
            }`}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                className="relative pl-16"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.18, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute left-[17px] top-6 w-4 h-4 rounded-full ring-4 z-10 ${
                    exp.active
                      ? isDark
                        ? 'bg-primary ring-surface-container-lowest'
                        : 'bg-blue-600 ring-gray-50'
                      : isDark
                      ? 'bg-outline-variant ring-surface-container-lowest'
                      : 'bg-gray-300 ring-gray-50'
                  }`}
                >
                  {exp.active && (
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-primary"
                    />
                  )}
                </motion.div>

                {/* Glass card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25 }}
                  className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
                    exp.active
                      ? isDark
                        ? 'bg-surface-container border-primary/20 hover:border-primary/35 shadow-[0_0_30px_rgba(152,203,255,0.05)]'
                        : 'bg-white border-blue-200 hover:border-blue-300 shadow-md hover:shadow-lg'
                      : isDark
                      ? 'bg-surface-container border-outline-variant/10 hover:border-outline-variant/25'
                      : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Active glow stripe */}
                  {exp.active && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}

                  <div className="p-7 grid grid-cols-1 lg:grid-cols-12 gap-7">
                    {/* Left: meta */}
                    <div className="lg:col-span-4">
                      {/* Company logo */}
                      <div className="mb-5">
                        <CompanyLogo company={exp.company} active={exp.active} isDark={isDark} />
                      </div>

                      {/* Divider */}
                      <div className={`w-8 h-[1px] mb-4 ${isDark ? 'bg-outline-variant/30' : 'bg-gray-200'}`} />

                      <h3
                        className={`text-lg font-bold font-headline leading-tight ${
                          isDark ? 'text-on-surface' : 'text-gray-900'
                        }`}
                      >
                        {exp.role}
                      </h3>

                      <p
                        className={`text-xs font-mono mt-2 ${
                          isDark ? 'text-on-surface-variant/60' : 'text-gray-400'
                        }`}
                      >
                        {exp.period}
                      </p>

                      {exp.active && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1.5 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-wider rounded-lg border border-primary/15"
                        >
                          <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-green-400"
                          />
                          Current Role
                        </motion.span>
                      )}
                    </div>

                    {/* Right: achievements */}
                    <div className="lg:col-span-8">
                      <ul className="space-y-3.5">
                        {exp.achievements.map((achievement, j) => (
                          <motion.li
                            key={j}
                            className="flex gap-3 items-start"
                            initial={{ opacity: 0, y: 8 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.45 + i * 0.18 + j * 0.06, duration: 0.45 }}
                          >
                            <span
                              className={`material-symbols-outlined text-[16px] mt-0.5 flex-shrink-0 ${
                                exp.active ? 'text-primary' : isDark ? 'text-outline-variant' : 'text-gray-300'
                              }`}
                            >
                              check_circle
                            </span>
                            <span
                              className={`text-sm leading-relaxed font-body ${
                                isDark ? 'text-on-surface-variant' : 'text-gray-600'
                              }`}
                            >
                              {highlightMetrics(achievement, IMPACT_COLORS[i] ?? 'text-primary')}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className={`mt-16 flex items-center gap-4 ${
            isDark ? 'text-on-surface-variant/30' : 'text-gray-300'
          }`}
        >
          <div className={`h-[1px] flex-1 ${isDark ? 'bg-outline-variant/20' : 'bg-gray-200'}`} />
          <span className="text-xs font-mono shrink-0">
            6+ years · 3 companies · Dhaka, Bangladesh
          </span>
          <div className={`h-[1px] flex-1 ${isDark ? 'bg-outline-variant/20' : 'bg-gray-200'}`} />
        </motion.div>

      </div>
    </section>
  );
}
