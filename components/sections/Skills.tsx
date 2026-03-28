'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { skillCategories, type SkillCategory } from '@/data/portfolio';

function SkillCard({ category, index, inView, isDark }: {
  category: SkillCategory;
  index: number;
  inView: boolean;
  isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group p-8 rounded-lg transition-all duration-300 ${
        isDark
          ? 'bg-surface-container hover:bg-surface-container-high'
          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200/60'
      }`}
    >
      <div className="flex items-center gap-4 mb-7">
        <div className={`p-2.5 rounded-lg transition-colors ${
          isDark ? 'bg-surface-container-high group-hover:bg-primary/10' : 'bg-white group-hover:bg-blue-50'
        }`}>
          <span className="material-symbols-outlined text-primary text-2xl">
            {category.icon}
          </span>
        </div>
        <h3 className={`text-lg font-bold font-headline ${
          isDark ? 'text-on-surface' : 'text-gray-900'
        }`}>
          {category.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map(skill => (
          <span
            key={skill}
            className={`px-3 py-1.5 text-xs font-medium rounded font-body tracking-wide transition-all duration-200 cursor-default hover:scale-105 ${
              isDark
                ? 'bg-secondary-container text-on-secondary-container hover:bg-surface-container-highest'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {skill}
          </span>
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
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
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

        {/* Proficiency note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`mt-12 text-sm font-body text-center ${
            isDark ? 'text-on-surface-variant/40' : 'text-gray-400'
          }`}
        >
          Continuously learning • Currently exploring AI-assisted testing & observability tooling
        </motion.p>
      </div>
    </section>
  );
}
