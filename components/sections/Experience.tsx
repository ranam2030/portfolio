'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { experiences } from '@/data/portfolio';

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
          </div>
          <p className={`text-sm font-mono ${isDark ? 'text-on-surface-variant/50' : 'text-gray-400'}`}>
            / LOG_FILE_EXPERIENCE.EXE
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className={`absolute left-6 top-0 bottom-0 w-[1px] ${
              isDark ? 'bg-outline-variant/30' : 'bg-gray-200'
            }`}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />

          <div className="space-y-14">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                className="relative pl-16"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-[17px] top-1 w-4 h-4 rounded-full ring-4 transition-colors ${
                    exp.active
                      ? isDark
                        ? 'bg-primary ring-surface-container-lowest'
                        : 'bg-blue-600 ring-gray-50'
                      : isDark
                      ? 'bg-outline ring-surface-container-lowest'
                      : 'bg-gray-400 ring-gray-50'
                  }`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: meta */}
                  <div className="lg:col-span-4">
                    <h3 className={`text-xl font-bold font-headline ${
                      isDark ? 'text-on-surface' : 'text-gray-900'
                    }`}>
                      {exp.role}
                    </h3>
                    <p className="text-primary font-medium font-body mt-1 text-sm">
                      {exp.company}
                    </p>
                    <p className={`text-xs font-mono mt-2 ${
                      isDark ? 'text-on-surface-variant' : 'text-gray-500'
                    }`}>
                      {exp.period}
                    </p>
                    {exp.active && (
                      <span className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-wider rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>

                  {/* Right: achievements */}
                  <div className="lg:col-span-8">
                    <ul className="space-y-3.5">
                      {exp.achievements.map((achievement, j) => (
                        <motion.li
                          key={j}
                          className="flex gap-3 items-start"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.4 + i * 0.15 + j * 0.05 }}
                        >
                          <span className={`material-symbols-outlined text-primary text-sm mt-0.5 flex-shrink-0 ${
                            exp.active ? 'text-primary' : isDark ? 'text-outline' : 'text-gray-400'
                          }`}>
                            check_circle
                          </span>
                          <span className={`text-sm leading-relaxed font-body ${
                            isDark ? 'text-on-surface-variant' : 'text-gray-600'
                          }`}>
                            {achievement}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
