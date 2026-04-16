'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { skillCategories, type SkillCategory } from '@/data/portfolio';

// ─── Proficiency metadata ──────────────────────────────────────────────────
type Level = 'Expert' | 'Advanced' | 'Proficient' | 'Learning';

const SKILL_META: Record<string, { level: Level; yrs: number }> = {
  Playwright:        { level: 'Expert',     yrs: 3 },
  Selenium:          { level: 'Expert',     yrs: 5 },
  WebdriverIO:       { level: 'Advanced',   yrs: 2 },
  Appium:            { level: 'Proficient', yrs: 2 },
  Cypress:           { level: 'Advanced',   yrs: 2 },
  Python:            { level: 'Expert',     yrs: 5 },
  Java:              { level: 'Advanced',   yrs: 4 },
  JavaScript:        { level: 'Advanced',   yrs: 4 },
  TypeScript:        { level: 'Expert',     yrs: 3 },
  SQL:               { level: 'Advanced',   yrs: 4 },
  Bash:              { level: 'Proficient', yrs: 3 },
  Postman:           { level: 'Expert',     yrs: 4 },
  'REST Assured':    { level: 'Advanced',   yrs: 3 },
  'GraphQL Testing': { level: 'Proficient', yrs: 2 },
  Swagger:           { level: 'Advanced',   yrs: 3 },
  k6:                { level: 'Advanced',   yrs: 2 },
  JMeter:            { level: 'Advanced',   yrs: 3 },
  Gatling:           { level: 'Proficient', yrs: 1 },
  Lighthouse:        { level: 'Proficient', yrs: 2 },
  Docker:            { level: 'Advanced',   yrs: 3 },
  'GitHub Actions':  { level: 'Expert',     yrs: 3 },
  Jenkins:           { level: 'Advanced',   yrs: 3 },
  'GitLab CI':       { level: 'Proficient', yrs: 2 },
  Jira:              { level: 'Expert',     yrs: 5 },
  TestRail:          { level: 'Advanced',   yrs: 3 },
  BrowserStack:      { level: 'Advanced',   yrs: 3 },
  'Allure Reports':  { level: 'Expert',     yrs: 3 },
  Git:               { level: 'Expert',     yrs: 5 },
};

const LEVEL_VALUE: Record<Level, number> = {
  Expert: 95, Advanced: 75, Proficient: 50, Learning: 25,
};

const LEVEL_CONFIG: Record<Level, { pill: string; dot: string; bar: string; text: string }> = {
  Expert:     { pill: 'bg-primary/10 border-primary/25 text-primary',           dot: 'bg-primary',    bar: 'from-primary to-primary/60',        text: 'text-primary' },
  Advanced:   { pill: 'bg-green-500/10 border-green-500/25 text-green-500',     dot: 'bg-green-500',  bar: 'from-green-500 to-green-400/60',     text: 'text-green-500' },
  Proficient: { pill: 'bg-amber-500/10 border-amber-500/25 text-amber-500',     dot: 'bg-amber-500',  bar: 'from-amber-500 to-amber-400/60',     text: 'text-amber-500' },
  Learning:   { pill: 'bg-gray-500/10 border-gray-400/20 text-gray-400',        dot: 'bg-gray-400',   bar: 'from-gray-400 to-gray-400/50',       text: 'text-gray-400' },
};

// ─── Skill pill with tooltip ───────────────────────────────────────────────
function SkillPill({
  skill, isDark, cardInView, pillIndex,
}: {
  skill: string; isDark: boolean; cardInView: boolean; pillIndex: number;
}) {
  const [hovered, setHovered] = useState(false);
  const meta = SKILL_META[skill];
  const cfg = LEVEL_CONFIG[meta?.level ?? 'Proficient'];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={cardInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.15 + pillIndex * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && meta && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.14 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
          >
            <div className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border shadow-lg ${
              isDark
                ? 'bg-surface-container-highest border-outline-variant/40 text-on-surface'
                : 'bg-white border-gray-200 text-gray-900'
            }`}>
              <span className={cfg.text}>{meta.level}</span>
              <span className={isDark ? ' text-on-surface-variant/60' : ' text-gray-400'}>
                {' '}· {meta.yrs} yr{meta.yrs !== 1 ? 's' : ''}
              </span>
            </div>
            {/* Caret */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent ${
              isDark ? 'border-t-surface-container-highest' : 'border-t-white'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill */}
      <motion.span
        whileHover={{ scale: 1.08, y: -1 }}
        transition={{ duration: 0.15 }}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border font-body tracking-wide cursor-default select-none ${cfg.pill}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
        {skill}
      </motion.span>
    </motion.div>
  );
}

// ─── Skill card ────────────────────────────────────────────────────────────
function SkillCard({
  category, index, inView, isDark,
}: {
  category: SkillCategory; index: number; inView: boolean; isDark: boolean;
}) {
  const avgLevel = Math.round(
    category.skills.reduce((sum, s) => sum + (LEVEL_VALUE[SKILL_META[s]?.level ?? 'Proficient']), 0) /
    category.skills.length
  );
  const dominantLevel: Level =
    avgLevel >= 87 ? 'Expert' : avgLevel >= 62 ? 'Advanced' : avgLevel >= 40 ? 'Proficient' : 'Learning';
  const barCfg = LEVEL_CONFIG[dominantLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.08 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className={`group p-7 rounded-xl transition-colors duration-300 border ${
        isDark
          ? 'bg-surface-container border-outline-variant/10 hover:border-primary/20 hover:bg-surface-container-high'
          : 'bg-gray-50 border-gray-200/60 hover:border-blue-200 hover:bg-white hover:shadow-md'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg transition-colors ${
            isDark ? 'bg-surface-container-high group-hover:bg-primary/10' : 'bg-white group-hover:bg-blue-50'
          }`}>
            <span className="material-symbols-outlined text-primary text-2xl">
              {category.icon}
            </span>
          </div>
          <div>
            <h3 className={`text-base font-bold font-headline leading-tight ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
              {category.title}
            </h3>
            <span className={`text-[11px] font-body ${barCfg.text}`}>{dominantLevel}</span>
          </div>
        </div>
        <span className={`text-[11px] font-mono mt-1 shrink-0 ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
          {category.skills.length} skills
        </span>
      </div>

      {/* Proficiency bar */}
      <div className={`h-1 rounded-full mb-5 overflow-hidden ${isDark ? 'bg-outline-variant/20' : 'bg-gray-200'}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${avgLevel}%` } : {}}
          transition={{ delay: 0.3 + index * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${barCfg.bar}`}
        />
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <SkillPill
            key={skill}
            skill={skill}
            isDark={isDark}
            cardInView={inView}
            pillIndex={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────
export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="skills"
      className={`py-32 px-6 transition-colors ${isDark ? 'bg-surface' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="section-label">Tech Stack</span>
            <h2 className={`section-heading ${isDark ? '' : '!text-gray-900'}`}>
              Expertise &amp; Tools
            </h2>
          </div>
          <p className={`text-sm font-mono ${isDark ? 'text-on-surface-variant/50' : 'text-gray-400'}`}>
            / SKILLS_MAP.JSON
          </p>
        </motion.div>

        {/* Proficiency legend */}
        <motion.div
          className="flex flex-wrap gap-x-5 gap-y-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {(Object.entries(LEVEL_CONFIG) as [Level, typeof LEVEL_CONFIG[Level]][]).map(([level, cfg]) => (
            <span key={level} className="flex items-center gap-1.5 text-xs font-body">
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              <span className={isDark ? 'text-on-surface-variant/60' : 'text-gray-500'}>{level}</span>
            </span>
          ))}
          <span className={`text-xs font-body ${isDark ? 'text-on-surface-variant/30' : 'text-gray-300'}`}>—</span>
          <span className={`text-xs font-body italic ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
            hover any skill for details
          </span>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, i) => (
            <SkillCard
              key={category.title}
              category={category}
              index={i}
              inView={inView}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className={`mt-12 text-sm font-body text-center ${
            isDark ? 'text-on-surface-variant/40' : 'text-gray-400'
          }`}
        >
          Continuously learning · Currently exploring AI-assisted testing &amp; observability tooling
        </motion.p>
      </div>
    </section>
  );
}
