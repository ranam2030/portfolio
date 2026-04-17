'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { aboutContent, personalInfo } from '@/data/portfolio';

const CARD_META = [
  { metric: '3 CI platforms',     span: 'md:col-span-2', hue: 'primary' },
  { metric: '70% regression ↓',   span: 'md:col-span-1', hue: 'green'   },
  { metric: '100% tx accuracy',   span: 'md:col-span-1', hue: 'amber'   },
  { metric: 'k6 · JMeter · Load', span: 'md:col-span-2', hue: 'violet'  },
] as const;

type Hue = typeof CARD_META[number]['hue'];

const HUE: Record<Hue, { iconBg: string; iconColor: string; metric: string; border: string; accent: string; glow: string }> = {
  primary: { iconBg: 'bg-primary/15',      iconColor: 'text-primary',    metric: 'text-primary',    border: 'border-primary/20 hover:border-primary/40',    accent: 'bg-primary',      glow: 'from-primary/15 to-transparent'    },
  green:   { iconBg: 'bg-green-500/15',    iconColor: 'text-green-500',  metric: 'text-green-500',  border: 'border-green-500/20 hover:border-green-500/40', accent: 'bg-green-500',    glow: 'from-green-500/15 to-transparent'  },
  amber:   { iconBg: 'bg-amber-500/15',    iconColor: 'text-amber-500',  metric: 'text-amber-500',  border: 'border-amber-500/20 hover:border-amber-500/40', accent: 'bg-amber-500',    glow: 'from-amber-500/15 to-transparent'  },
  violet:  { iconBg: 'bg-violet-500/15',   iconColor: 'text-violet-500', metric: 'text-violet-500', border: 'border-violet-500/20 hover:border-violet-500/40',accent: 'bg-violet-500',   glow: 'from-violet-500/15 to-transparent' },
};

const QUICK_FACTS = [
  { icon: 'location_on',  label: 'Dhaka, Bangladesh'      },
  { icon: 'work',         label: '6+ Years in QA & Automation' },
  { icon: 'hub',          label: 'Playwright · Selenium · k6' },
  { icon: 'folder_open',  label: '46 GitHub Repositories'  },
];

const CAREER_ARC = [
  { year: '2025', role: 'Sr. QA Engineer',    company: 'Grameenphone', active: true  },
  { year: '2023', role: 'QA Automation Eng.', company: 'Texada Software', active: false },
  { year: '2020', role: 'QA Engineer',         company: 'Brotecs Technologies', active: false },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [, ...bodyParas] = aboutContent.paragraphs;

  return (
    <section
      id="about"
      className={`py-32 px-6 transition-colors ${isDark ? 'bg-surface-container-low' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">{aboutContent.label}</span>
          <h2 className={`section-heading ${isDark ? '' : '!text-gray-900'}`}>
            {aboutContent.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── Left: Profile sidebar ── */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:sticky lg:top-32 space-y-4">

              {/* Profile card */}
              <div
                className={`p-6 rounded-2xl border transition-colors ${
                  isDark
                    ? 'bg-surface-container border-outline-variant/15'
                    : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-xl font-bold font-headline text-white shadow-lg">
                      MR
                    </div>
                    <div
                      className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isDark ? 'bg-green-500 border-surface-container' : 'bg-green-500 border-white'
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                  <div>
                    <h3
                      className={`font-bold font-headline leading-tight ${
                        isDark ? 'text-on-surface' : 'text-gray-900'
                      }`}
                    >
                      Masud Rana
                    </h3>
                    <p className="text-xs text-primary font-mono mt-0.5">Sr. QA Automation Engineer</p>
                    <p
                      className={`text-[11px] font-body mt-0.5 ${
                        isDark ? 'text-on-surface-variant/60' : 'text-gray-400'
                      }`}
                    >
                      Grameenphone · Dhaka
                    </p>
                  </div>
                </div>

                {/* Quick facts */}
                <div className="space-y-2.5">
                  {QUICK_FACTS.map((fact) => (
                    <div key={fact.label} className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isDark ? 'bg-surface-container-high' : 'bg-gray-50 border border-gray-100'
                        }`}
                      >
                        <span className="material-symbols-outlined text-primary text-[14px]">
                          {fact.icon}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-body ${
                          isDark ? 'text-on-surface-variant' : 'text-gray-600'
                        }`}
                      >
                        {fact.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="mt-5 flex gap-2">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium font-body transition-all duration-200 border ${
                      isDark
                        ? 'bg-surface-container-high border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/30 hover:bg-primary/5'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">terminal</span>
                    GitHub
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium font-body transition-all duration-200 border ${
                      isDark
                        ? 'bg-surface-container-high border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/30 hover:bg-primary/5'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">link</span>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Career arc mini-timeline */}
              <div
                className={`p-5 rounded-2xl border transition-colors ${
                  isDark
                    ? 'bg-surface-container border-outline-variant/15'
                    : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                <p
                  className={`text-[10px] font-mono uppercase tracking-widest mb-5 ${
                    isDark ? 'text-primary/50' : 'text-primary/60'
                  }`}
                >
                  Career Arc
                </p>
                <div className="relative pl-5">
                  <div
                    className={`absolute left-1.5 top-0 bottom-0 w-[1px] ${
                      isDark ? 'bg-outline-variant/30' : 'bg-gray-200'
                    }`}
                  />
                  {CAREER_ARC.map((item, i) => (
                    <motion.div
                      key={item.year}
                      className="relative mb-5 last:mb-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    >
                      <div
                        className={`absolute -left-5 top-2 w-2.5 h-2.5 rounded-full ring-2 transition-colors ${
                          item.active
                            ? isDark
                              ? 'bg-primary ring-surface-container'
                              : 'bg-blue-600 ring-white'
                            : isDark
                            ? 'bg-outline-variant ring-surface-container'
                            : 'bg-gray-300 ring-white'
                        }`}
                      />
                      <p
                        className={`text-[10px] font-mono leading-none mb-0.5 ${
                          item.active ? 'text-primary' : isDark ? 'text-on-surface-variant/40' : 'text-gray-400'
                        }`}
                      >
                        {item.year}
                        {item.active && (
                          <span className="ml-1.5 text-green-400">· now</span>
                        )}
                      </p>
                      <p
                        className={`text-xs font-semibold font-headline ${
                          isDark ? 'text-on-surface' : 'text-gray-800'
                        }`}
                      >
                        {item.role}
                      </p>
                      <p
                        className={`text-[11px] font-body ${
                          isDark ? 'text-on-surface-variant/60' : 'text-gray-500'
                        }`}
                      >
                        {item.company}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

          {/* ── Right: Content ── */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pull-quote */}
            <div className="relative pl-5 mb-10 border-l-2 border-primary/50">
              <span
                aria-hidden
                className="absolute -top-4 -left-1 text-6xl leading-none font-serif text-primary/15 select-none"
              >
                "
              </span>
              <p
                className={`text-lg md:text-xl font-light leading-relaxed font-body ${
                  isDark ? 'text-on-surface-variant' : 'text-gray-600'
                }`}
              >
                With over{' '}
                <span className={`font-semibold ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
                  6+ years of dedicated experience
                </span>{' '}
                in the QA ecosystem — architecting automation frameworks that go beyond script execution, becoming
                living quality gates embedded into every delivery pipeline.
              </p>
            </div>

            {/* Numbered body paragraphs */}
            <div className="space-y-5 mb-12">
              {bodyParas.map((para, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: 14 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className={`text-[11px] font-mono mt-1.5 w-5 shrink-0 ${
                      isDark ? 'text-primary/30' : 'text-primary/40'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <p
                    className={`text-base font-light leading-relaxed font-body ${
                      isDark ? 'text-on-surface-variant' : 'text-gray-600'
                    }`}
                  >
                    {para}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bento highlight grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {aboutContent.highlights.map((item, i) => {
                const meta = CARD_META[i];
                const hue = HUE[meta.hue];

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className={`group ${meta.span} relative p-6 rounded-2xl border transition-all duration-300 cursor-default overflow-hidden ${
                      isDark
                        ? `bg-surface-container ${hue.border}`
                        : `bg-white shadow-sm hover:shadow-md ${hue.border}`
                    }`}
                  >
                    {/* Hover background glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${hue.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      {/* Icon + metric */}
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${hue.iconBg}`}
                        >
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

                      <h3
                        className={`text-sm font-bold font-headline mb-1.5 ${
                          isDark ? 'text-on-surface' : 'text-gray-900'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed font-body ${
                          isDark ? 'text-on-surface-variant' : 'text-gray-500'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Currently exploring banner */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.5 }}
              className={`mt-6 flex items-center gap-3 px-5 py-3.5 rounded-xl border ${
                isDark
                  ? 'bg-primary/5 border-primary/15 text-on-surface-variant'
                  : 'bg-blue-50/80 border-blue-100 text-gray-600'
              }`}
            >
              <span className="material-symbols-outlined text-primary text-[18px]">explore</span>
              <span className="text-xs font-body">
                Currently exploring{' '}
                <span className={`font-semibold ${isDark ? 'text-on-surface' : 'text-gray-800'}`}>
                  AI-assisted QA tooling &amp; observability integration
                </span>
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
