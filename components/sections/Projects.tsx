'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { projects } from '@/data/portfolio';

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="projects"
      className={`py-32 px-6 transition-colors ${isDark ? 'bg-surface' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Case Studies</span>
          <h2 className={`section-heading ${isDark ? '' : '!text-gray-900'}`}>
            Featured Projects
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className={`${
                project.featured ? 'lg:col-span-7' : 'lg:col-span-5'
              } group flex flex-col rounded-lg overflow-hidden transition-all duration-300 ${
                isDark
                  ? 'bg-surface-container hover:bg-surface-container-high'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200/60'
              }`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Visual panel */}
              <div className={`relative overflow-hidden ${
                project.featured ? 'aspect-video' : 'aspect-[4/3] lg:aspect-square'
              } ${isDark ? 'bg-surface-container-lowest' : 'bg-gray-200'}`}>
                {/* Code visualization */}
                <div className="absolute inset-0 p-6 overflow-hidden">
                  <div className="flex flex-col gap-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    {(project.featured
                      ? [
                          'import { Browser, Page } from "@playwright/test";',
                          '',
                          'export class HybridFramework {',
                          '  private wdio: WebdriverIO.Browser;',
                          '  private appium: AppiumDriver;',
                          '',
                          '  async runSuite(platform: "web" | "mobile") {',
                          '    return await this.execute(platform);',
                          '  }',
                          '}',
                        ]
                      : [
                          'import { test, expect } from "@playwright/test";',
                          '',
                          'test.describe("E2E Suite", () => {',
                          '  test("user flow", async ({ page }) => {',
                          '    await page.goto("/");',
                          '    // ✓ 847 assertions',
                          '  });',
                          '});',
                        ]
                    ).map((line, j) => (
                      <div key={j} className={`font-mono text-xs whitespace-pre ${
                        line.includes('✓') ? 'text-primary' :
                        isDark ? 'text-on-surface-variant' : 'text-gray-600'
                      }`}>
                        {line || ' '}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className={`absolute inset-0 ${
                  isDark
                    ? 'bg-gradient-to-t from-surface-container via-transparent to-transparent'
                    : 'bg-gradient-to-t from-gray-50 via-transparent to-transparent'
                }`} />

                {/* Floating badge */}
                {project.metrics && (
                  <div className={`absolute top-4 left-4 px-3 py-1.5 rounded border border-outline-variant/20 ${
                    isDark ? 'glass-panel' : 'glass-panel-light'
                  }`}>
                    <span className="text-[10px] font-mono text-primary uppercase tracking-wider">
                      {project.metrics}
                    </span>
                  </div>
                )}

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border border-primary/20 ${
                    isDark ? 'bg-primary/10' : 'bg-blue-50'
                  }`}>
                    <span className="material-symbols-outlined text-primary text-2xl">
                      {project.featured ? 'device_hub' : 'play_circle'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-start gap-4">
                  <h3 className={`text-xl font-bold font-headline leading-tight ${
                    isDark ? 'text-on-surface' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-on-primary-container transition-colors flex-shrink-0 p-1 hover:bg-primary/10 rounded"
                    aria-label="View on GitHub"
                  >
                    <span className="material-symbols-outlined text-xl">open_in_new</span>
                  </a>
                </div>

                <p className={`text-sm leading-relaxed font-body ${
                  isDark ? 'text-on-surface-variant' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                <p className={`text-xs leading-relaxed font-body ${
                  isDark ? 'text-on-surface-variant/60' : 'text-gray-500'
                }`}>
                  {project.longDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 text-xs rounded font-mono ${
                        isDark
                          ? 'bg-surface-container-high text-on-surface-variant'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a
            href="https://github.com/ranam2030"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-medium font-body transition-colors ${
              isDark ? 'text-on-surface-variant hover:text-primary' : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            View all repositories on GitHub
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
