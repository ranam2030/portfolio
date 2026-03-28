'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { projects, type Project } from '@/data/portfolio';

/* ─── Code snippet lines per project ─── */
const codeSnippets: Record<string, string[]> = {
  'Hybrid Automation Framework': [
    "import { browser } from '@wdio/globals';",
    '',
    "describe('Checkout Flow', () => {",
    "  it('completes mobile payment', async () => {",
    "    await $('~pay-btn').click();",
    "    await expect($('~confirm')).toBeDisplayed();",
    '    // ✓ 1247 assertions passed',
    '  });',
    '});',
  ],
  'Playwright E2E Framework': [
    "import { test, expect } from '@playwright/test';",
    '',
    "test.describe('Auth Suite', () => {",
    "  test('login flow', async ({ page }) => {",
    "    await page.goto('/login');",
    "    await page.fill('#email', user.email);",
    '    // ✓ 3 environments · all green',
    '  });',
    '});',
  ],
  'API Performance Test Suite': [
    'import http from "k6/http";',
    'import { check, sleep } from "k6";',
    '',
    'export const options = {',
    '  vus: 10000,',
    "  thresholds: { 'http_req_duration': ['p(95)<200'] },",
    '};',
    '// ✓ p95: 142ms — gate passed',
  ],
  'CI/CD Quality Gate Pipeline': [
    '# GitHub Actions quality gate',
    'jobs:',
    '  quality-gate:',
    '    steps:',
    '      - run: npm run test:coverage',
    '      - run: npx coverage-check --min 94',
    '      - run: bash notify-slack.sh',
    '      # ✓ Pipeline: 7m 43s',
  ],
};

/* ─────────────────────────────────────────────
   Syntax-colour a line of pseudocode
───────────────────────────────────────────── */
function lineColor(line: string): string {
  if (line.includes('✓')) return '#4ade80';
  if (line.startsWith('import') || line.startsWith('describe') ||
      line.startsWith('test') || line.startsWith('export') ||
      line.includes('jobs:') || line.includes('steps:') ||
      line.includes('quality-gate:'))
    return '#60a5fa';
  if (line.trimStart().startsWith('//') || line.trimStart().startsWith('#'))
    return '#6b7280';
  if (line.includes("'") || line.includes('"'))
    return '#fbbf24';
  return '#d1d5db';
}

/* ─── Featured card (full-width) ─── */
function FeaturedCard({ project, inView, isDark }: {
  project: Project; inView: boolean; isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const lines = codeSnippets[project.title] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative col-span-full rounded-2xl overflow-hidden transition-all duration-500 ${
        isDark
          ? 'bg-surface-container border border-outline-variant/10 hover:border-outline-variant/30'
          : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg'
      }`}
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${project.accentColor} 50%, transparent 100%)` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: code pane */}
        <div className="relative min-h-[280px] lg:min-h-[360px] overflow-hidden flex flex-col bg-gray-950">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-800">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-3 text-[11px] font-mono text-gray-500">framework.spec.ts</span>
          </div>

          {/* Line numbers + code */}
          <div className="flex-1 p-5 overflow-hidden">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.055, duration: 0.4 }}
                className="flex gap-4"
              >
                <span className="select-none text-[11px] font-mono text-gray-700 w-4 text-right flex-shrink-0 leading-6">
                  {line ? i + 1 : ''}
                </span>
                <span
                  className="font-mono text-[12px] leading-6 whitespace-pre"
                  style={{ color: lineColor(line) }}
                >
                  {line || ' '}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />

          {/* Floating stat */}
          <div className="absolute bottom-5 right-5 px-4 py-3 rounded-xl bg-gray-900/90 border border-gray-700/60 backdrop-blur-sm">
            <p className="text-xl font-bold font-headline leading-none" style={{ color: project.accentColor }}>
              {project.stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono mt-1">
              {project.stat.label}
            </p>
          </div>
        </div>

        {/* Right: info pane */}
        <div className="p-8 lg:p-10 flex flex-col gap-5">
          {/* Featured badge */}
          <span
            className="self-start text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
            style={{
              color: project.accentColor,
              border: `1px solid ${project.accentColor}40`,
              background: `${project.accentColor}12`,
            }}
          >
            ★&nbsp;&nbsp;Featured Project
          </span>

          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}35` }}
              >
                <span className="material-symbols-outlined text-[22px]" style={{ color: project.accentColor }}>
                  {project.icon}
                </span>
              </div>
              <h3 className={`text-2xl font-bold font-headline leading-tight ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
                {project.title}
              </h3>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-on-surface-variant hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
              aria-label="View on GitHub"
            >
              <span className="material-symbols-outlined text-[20px]">open_in_new</span>
            </a>
          </div>

          <p className={`text-base leading-relaxed font-body ${isDark ? 'text-on-surface-variant' : 'text-gray-600'}`}>
            {project.description}
          </p>
          <p className={`text-sm leading-relaxed font-body ${isDark ? 'text-on-surface-variant/60' : 'text-gray-500'}`}>
            {project.longDescription}
          </p>

          {/* Metrics chip */}
          {project.metrics && (
            <div className={`inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-lg ${
              isDark ? 'bg-surface-container-high' : 'bg-gray-50 border border-gray-200'
            }`}>
              <span className="material-symbols-outlined text-[14px]" style={{ color: project.accentColor }}>analytics</span>
              <span className={`text-xs font-mono ${isDark ? 'text-on-surface-variant' : 'text-gray-600'}`}>
                {project.metrics}
              </span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className={`px-2.5 py-1 text-xs rounded font-mono transition-colors ${
                  isDark
                    ? 'bg-surface-container-highest text-on-surface-variant hover:text-primary hover:bg-primary/10'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Small card (3-column grid) ─── */
function ProjectCard({ project, index, inView, isDark }: {
  project: Project; index: number; inView: boolean; isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const lines = codeSnippets[project.title] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.18 + index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
        isDark
          ? 'bg-surface-container border border-outline-variant/10 hover:bg-surface-container-high hover:border-outline-variant/25'
          : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{ background: `linear-gradient(90deg, transparent 10%, ${project.accentColor} 50%, transparent 90%)` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Mini code pane */}
      <div className="relative h-[152px] overflow-hidden bg-gray-950 px-5 pt-4 pb-3">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        {lines.slice(0, 5).map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="select-none text-[10px] font-mono text-gray-700 w-3 text-right flex-shrink-0 leading-5">
              {line ? i + 1 : ''}
            </span>
            <span
              className="font-mono text-[10px] leading-5 whitespace-pre truncate"
              style={{ color: lineColor(line) }}
            >
              {line || ' '}
            </span>
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />

        {/* Stat chip */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg text-center"
          style={{ background: `${project.accentColor}22`, border: `1px solid ${project.accentColor}38` }}
        >
          <span className="text-[13px] font-bold font-headline block leading-none" style={{ color: project.accentColor }}>
            {project.stat.value}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-gray-400 font-mono">
            {project.stat.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3.5 p-6 flex-1">
        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${project.accentColor}15`, border: `1px solid ${project.accentColor}30` }}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ color: project.accentColor }}>
                {project.icon}
              </span>
            </div>
            <h3 className={`text-sm font-bold font-headline leading-snug ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
              {project.title}
            </h3>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
              isDark
                ? 'text-on-surface-variant/40 hover:text-primary hover:bg-primary/10'
                : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
          </a>
        </div>

        <p className={`text-sm leading-relaxed font-body flex-1 ${isDark ? 'text-on-surface-variant' : 'text-gray-600'}`}>
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <div className={`text-[11px] font-mono px-3 py-2 rounded-lg ${
            isDark
              ? 'bg-surface-container-highest text-on-surface-variant/60'
              : 'bg-gray-50 text-gray-500 border border-gray-100'
          }`}>
            {project.metrics}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className={`px-2 py-1 text-[11px] rounded font-mono ${
                isDark
                  ? 'bg-surface-container-highest text-on-surface-variant/70'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className={`text-[11px] font-mono ${isDark ? 'text-on-surface-variant/30' : 'text-gray-400'}`}>
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Export ─── */
export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const featured = projects.find(p => p.featured)!;
  const rest = projects.filter(p => !p.featured);

  return (
    <section
      id="projects"
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
            <span className="section-label">Case Studies</span>
            <h2 className={`section-heading ${isDark ? '' : '!text-gray-900'}`}>
              Featured Projects
            </h2>
            <p className={`mt-3 text-base font-light max-w-xl font-body ${
              isDark ? 'text-on-surface-variant' : 'text-gray-500'
            }`}>
              Real frameworks and pipelines built in production — not toy projects.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
              {projects.length} projects
            </span>
            <a
              href="https://github.com/ranam2030"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg border transition-all font-body ${
                isDark
                  ? 'border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/30 hover:bg-primary/5'
                  : 'border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Grid: featured full-width, then 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeaturedCard project={featured} inView={inView} isDark={isDark} />
          {rest.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              inView={inView}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          className={`mt-12 pt-10 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDark ? 'border-outline-variant/15' : 'border-gray-100'
          }`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className={`text-sm font-body ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
            More repositories available on GitHub, including internal tooling and experiment branches.
          </p>
          <a
            href="https://github.com/ranam2030"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-semibold font-body transition-colors flex-shrink-0 ${
              isDark ? 'text-primary hover:text-on-primary-container' : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            All repositories
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
