'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { skillCategories, type SkillCategory } from '@/data/portfolio';

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
  Expert: 95, Advanced: 75, Proficient: 52, Learning: 25,
};

const LEVEL_CONFIG: Record<Level, {
  pill: string; dot: string; bar: string; text: string; badge: string;
}> = {
  Expert:     { pill: 'bg-primary/10 border-primary/25 text-primary',          dot: 'bg-primary',   bar: 'from-primary to-primary/70',        text: 'text-primary',    badge: 'bg-primary/15 text-primary' },
  Advanced:   { pill: 'bg-green-500/10 border-green-500/25 text-green-500',    dot: 'bg-green-500', bar: 'from-green-500 to-green-400/70',     text: 'text-green-500',  badge: 'bg-green-500/15 text-green-500' },
  Proficient: { pill: 'bg-amber-500/10 border-amber-500/25 text-amber-500',    dot: 'bg-amber-500', bar: 'from-amber-500 to-amber-400/70',     text: 'text-amber-500',  badge: 'bg-amber-500/15 text-amber-500' },
  Learning:   { pill: 'bg-gray-500/10 border-gray-400/20 text-gray-400',       dot: 'bg-gray-400',  bar: 'from-gray-400 to-gray-400/50',       text: 'text-gray-400',   badge: 'bg-gray-400/15 text-gray-400' },
};

function SkillRow({
  skill, isDark, inView, index,
}: {
  skill: string; isDark: boolean; inView: boolean; index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const meta = SKILL_META[skill];
  const cfg = LEVEL_CONFIG[meta?.level ?? 'Proficient'];
  const pct = LEVEL_VALUE[meta?.level ?? 'Proficient'];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
          <span
            className={`text-xs font-medium font-body ${
              isDark ? 'text-on-surface-variant group-hover:text-on-surface' : 'text-gray-600 group-hover:text-gray-900'
            } transition-colors duration-200`}
          >
            {skill}
          </span>
        </div>
        <AnimatePresence>
          {hovered && meta && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8, x: 4 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 4 }}
              transition={{ duration: 0.15 }}
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${cfg.badge}`}
            >
              {meta.level} · {meta.yrs}yr{meta.yrs !== 1 ? 's' : ''}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div
        className={`h-1 rounded-full overflow-hidden ${
          isDark ? 'bg-outline-variant/15' : 'bg-gray-100'
        }`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ delay: 0.2 + index * 0.04, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${cfg.bar}`}
        />
      </div>
    </motion.div>
  );
}

function SkillCard({
  category, index, inView, isDark,
}: {
  category: SkillCategory; index: number; inView: boolean; isDark: boolean;
}) {
  const avgLevel = Math.round(
    category.skills.reduce(
      (sum, s) => sum + (LEVEL_VALUE[SKILL_META[s]?.level ?? 'Proficient']),
      0
    ) / category.skills.length
  );
  const dominantLevel: Level =
    avgLevel >= 87 ? 'Expert' : avgLevel >= 62 ? 'Advanced' : avgLevel >= 40 ? 'Proficient' : 'Learning';
  const barCfg = LEVEL_CONFIG[dominantLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.06 + index * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${
        isDark
          ? 'bg-surface-container border-outline-variant/10 hover:border-primary/25 hover:bg-surface-container-high'
          : 'bg-white border-gray-200/80 hover:border-blue-200 hover:shadow-lg'
      }`}
    >
      {/* Subtle glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-primary/8" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            className={`p-2.5 rounded-xl transition-colors ${
              isDark
                ? 'bg-surface-container-high group-hover:bg-primary/12'
                : 'bg-gray-50 group-hover:bg-blue-50 border border-gray-100'
            }`}
          >
            <span className="material-symbols-outlined text-primary text-2xl">
              {category.icon}
            </span>
          </motion.div>
          <div>
            <h3
              className={`text-sm font-bold font-headline leading-tight ${
                isDark ? 'text-on-surface' : 'text-gray-900'
              }`}
            >
              {category.title}
            </h3>
            <span className={`text-[11px] font-body ${barCfg.text}`}>{dominantLevel}</span>
          </div>
        </div>
        <span
          className={`text-[10px] font-mono mt-0.5 px-2 py-0.5 rounded shrink-0 ${
            isDark ? 'bg-surface-container-highest text-on-surface-variant/50' : 'bg-gray-50 text-gray-400 border border-gray-100'
          }`}
        >
          {category.skills.length} skills
        </span>
      </div>

      {/* Overall proficiency bar */}
      <div
        className={`h-1.5 rounded-full mb-5 overflow-hidden ${
          isDark ? 'bg-outline-variant/20' : 'bg-gray-100'
        }`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${avgLevel}%` } : {}}
          transition={{ delay: 0.3 + index * 0.09, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${barCfg.bar}`}
        />
      </div>

      {/* Individual skill rows */}
      <div className="space-y-3">
        {category.skills.map((skill, i) => (
          <SkillRow
            key={skill}
            skill={skill}
            isDark={isDark}
            inView={inView}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

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
            <p className={`mt-3 text-sm font-body max-w-lg ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
              6+ years across automation, performance, and DevOps — hover any skill to see proficiency details.
            </p>
          </div>
          <p className={`text-sm font-mono shrink-0 ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
            / SKILLS_MAP.JSON
          </p>
        </motion.div>

        {/* Proficiency legend */}
        <motion.div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10"
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
          <span className={`hidden sm:block text-xs font-body italic ml-2 ${isDark ? 'text-on-surface-variant/35' : 'text-gray-400'}`}>
            — hover any skill row for details
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <div className={`h-[1px] w-12 ${isDark ? 'bg-outline-variant/30' : 'bg-gray-200'}`} />
          <p className={`text-xs font-body text-center ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
            Continuously learning · Currently exploring AI-assisted testing &amp; observability tooling
          </p>
          <div className={`h-[1px] w-12 ${isDark ? 'bg-outline-variant/30' : 'bg-gray-200'}`} />
        </motion.div>

      </div>
    </section>
  );
}
