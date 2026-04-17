'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { projects, type Project } from '@/data/portfolio';

/* ─── Category metadata ─────────────────────────────────── */
const CATEGORIES = [
  { id: 'all',         label: 'All Projects', icon: 'apps'           },
  { id: 'e2e',         label: 'E2E Testing',  icon: 'web_stories'    },
  { id: 'performance', label: 'Performance',  icon: 'speed'          },
  { id: 'cicd',        label: 'CI/CD',        icon: 'settings_input_component' },
  { id: 'api',         label: 'API Testing',  icon: 'api'            },
] as const;
type CategoryId = typeof CATEGORIES[number]['id'];

const PROJECT_CATEGORY: Record<string, CategoryId> = {
  'Hybrid Automation Framework': 'e2e',
  'Playwright E2E Framework':    'e2e',
  'API Performance Test Suite':  'performance',
  'CI/CD Quality Gate Pipeline': 'cicd',
};

const CATEGORY_COLOR: Record<CategoryId, string> = {
  all:         '#98cbff',
  e2e:         '#bdc2ff',
  performance: '#5dcaa5',
  cicd:        '#f9a825',
  api:         '#fb923c',
};

/* ─── Code snippets ─────────────────────────────────────── */
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

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3776ab',
  Java: '#ed8b00', Bash: '#4eaa25', YAML: '#cb171e',
};

function lineColor(line: string): string {
  if (line.includes('✓')) return '#4ade80';
  if (line.startsWith('import') || line.startsWith('describe') || line.startsWith('test') ||
      line.startsWith('export') || line.includes('jobs:') || line.includes('steps:') || line.includes('quality-gate:'))
    return '#60a5fa';
  if (line.trimStart().startsWith('//') || line.trimStart().startsWith('#')) return '#6b7280';
  if (line.includes("'") || line.includes('"')) return '#fbbf24';
  return '#d1d5db';
}

/* ─── Tilt card wrapper ─────────────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 400, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  return (
    <motion.div
      className={className}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {/* Dynamic spotlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]: number[]) =>
              `radial-gradient(300px circle at ${gx}% ${gy}%, rgba(152,203,255,0.07) 0%, transparent 70%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─── Skeleton card ─────────────────────────────────────── */
function SkeletonCard({ featured = false, isDark }: { featured?: boolean; isDark: boolean }) {
  const base = isDark ? 'bg-outline-variant/10' : 'bg-gray-200/70';
  return (
    <div className={`relative rounded-2xl overflow-hidden ${featured ? 'col-span-full' : ''} ${
      isDark ? 'bg-surface-container border border-outline-variant/10' : 'bg-white border border-gray-200'
    }`}>
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{ translateX: ['−100%', '200%'] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.1 }}
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)'} 50%, transparent 100%)`,
        }}
      />
      <div className={`${featured ? 'h-[280px] lg:h-[380px]' : 'h-[148px]'} ${isDark ? 'bg-[#0d1117]' : 'bg-gray-900/5'}`} />
      <div className="p-6 space-y-3">
        <div className={`h-3 w-24 rounded-full ${base}`} />
        <div className={`h-5 w-48 rounded-full ${base}`} />
        <div className={`h-3 w-full rounded-full ${base}`} />
        <div className={`h-3 w-3/4 rounded-full ${base}`} />
        <div className="flex gap-2 pt-1">
          {[60, 48, 72].map(w => (
            <div key={w} className={`h-6 rounded-lg ${base}`} style={{ width: w }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Category tab bar ──────────────────────────────────── */
function CategoryTabs({
  active, onChange, isDark, counts, switching,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
  isDark: boolean;
  counts: Record<CategoryId, number>;
  switching: boolean;
}) {
  return (
    <div className="space-y-2">
      <div
        className={`flex items-center gap-1 p-1 rounded-2xl border w-fit flex-wrap ${
          isDark ? 'bg-surface-container border-outline-variant/12' : 'bg-gray-100 border-gray-200'
        }`}
      >
        {CATEGORIES.map(cat => {
          const isActive = active === cat.id;
          const color = CATEGORY_COLOR[cat.id];
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium font-body transition-all duration-150 select-none ${
                isActive
                  ? isDark ? 'text-on-surface' : 'text-gray-900'
                  : isDark ? 'text-on-surface-variant/60 hover:text-on-surface-variant' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-pill"
                  className={`absolute inset-0 rounded-xl ${isDark ? 'bg-surface-container-high' : 'bg-white shadow-sm'}`}
                  transition={{ type: 'spring', stiffness: 600, damping: 38 }}
                />
              )}
              <span className="relative z-10 material-symbols-outlined text-[14px]" style={isActive ? { color } : {}}>
                {cat.icon}
              </span>
              <span className="relative z-10">{cat.label}</span>
              {counts[cat.id] > 0 && cat.id !== 'all' && (
                <span
                  className="relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-mono"
                  style={isActive
                    ? { background: `${color}20`, color }
                    : { background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', color: isDark ? '#aaa' : '#888' }}
                >
                  {counts[cat.id]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Progress bar — sweeps across when switching */}
      <div className={`h-[2px] w-full rounded-full overflow-hidden ${isDark ? 'bg-outline-variant/10' : 'bg-gray-100'}`}>
        <AnimatePresence>
          {switching && (
            <motion.div
              key="progress"
              className="h-full rounded-full"
              style={{ background: CATEGORY_COLOR[active] }}
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Code pane ─────────────────────────────────────────── */
function CodePane({ lines, inView }: { lines: string[]; inView: boolean }) {
  return (
    <div className="flex-1 p-5 pt-3 overflow-hidden">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.25 + i * 0.055, duration: 0.35 }}
          className="flex gap-4"
        >
          <span className="select-none text-[11px] font-mono text-gray-700 w-4 text-right flex-shrink-0 leading-6">
            {line ? i + 1 : ''}
          </span>
          <span className="font-mono text-[12px] leading-6 whitespace-pre" style={{ color: lineColor(line) }}>
            {line || ' '}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Featured card ─────────────────────────────────────── */
function FeaturedCard({ project, inView, isDark }: { project: Project; inView: boolean; isDark: boolean }) {
  const [hovered, setHovered] = useState(false);
  const lines = codeSnippets[project.title] ?? [];
  const langs = project.tags.filter(t => Object.keys(LANG_COLORS).includes(t));
  const cat = PROJECT_CATEGORY[project.title] ?? 'all';
  const catColor = CATEGORY_COLOR[cat];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.08 } }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative col-span-full rounded-2xl overflow-hidden transition-all duration-500 ${
        isDark
          ? 'bg-surface-container border border-outline-variant/10 hover:border-outline-variant/30'
          : 'bg-white border border-gray-200 shadow-sm hover:shadow-2xl'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Animated accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${catColor}, transparent)` }}
        animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.45 }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Code pane */}
        <div className="relative min-h-[300px] lg:min-h-[380px] flex flex-col bg-[#0d1117]">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-[#161b22]">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-[11px] font-mono text-gray-500">framework.spec.ts</span>
            <div className="ml-auto flex items-center gap-2">
              {langs.slice(0, 2).map(lang => (
                <span key={lang} className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: `${LANG_COLORS[lang]}22`, color: LANG_COLORS[lang] }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <CodePane lines={lines} inView={inView} />
          <div className="absolute bottom-14 left-0 right-0 h-16 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
          <div className="absolute bottom-5 right-5 px-4 py-3 rounded-xl bg-[#161b22] border border-white/8 backdrop-blur-sm">
            <p className="text-2xl font-bold font-headline leading-none" style={{ color: catColor }}>
              {project.stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono mt-1">{project.stat.label}</p>
          </div>
        </div>

        {/* Info pane */}
        <div className="p-8 lg:p-10 flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
              style={{ color: catColor, border: `1px solid ${catColor}40`, background: `${catColor}12` }}
            >
              ★&nbsp;&nbsp;Featured Project
            </span>
            <span
              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-full flex items-center gap-1"
              style={{ color: catColor, border: `1px solid ${catColor}30`, background: `${catColor}0d` }}
            >
              <span className="material-symbols-outlined text-[11px]">{CATEGORIES.find(c => c.id === cat)?.icon}</span>
              {CATEGORIES.find(c => c.id === cat)?.label}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${catColor}18`, border: `1px solid ${catColor}35` }}
              >
                <span className="material-symbols-outlined text-[22px]" style={{ color: catColor }}>{project.icon}</span>
              </motion.div>
              <h3 className={`text-2xl font-bold font-headline leading-tight ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
                {project.title}
              </h3>
            </div>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className={`flex-shrink-0 p-2.5 rounded-xl transition-all duration-200 border ${
                isDark
                  ? 'border-outline-variant/20 text-on-surface-variant hover:text-primary hover:border-primary/30 hover:bg-primary/8'
                  : 'border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50'
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

          {project.metrics && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-xl border cursor-default ${
                isDark ? 'bg-surface-container-high border-outline-variant/15' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]" style={{ color: catColor }}>analytics</span>
              <span className={`text-xs font-mono ${isDark ? 'text-on-surface-variant' : 'text-gray-600'}`}>
                {project.metrics}
              </span>
            </motion.div>
          )}

          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {project.tags.map(tag => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.06, y: -1 }}
                className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-colors cursor-default ${
                  isDark
                    ? 'bg-surface-container-highest text-on-surface-variant hover:text-primary hover:bg-primary/10'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Regular project card ──────────────────────────────── */
function ProjectCard({ project, index, inView, isDark }: {
  project: Project; index: number; inView: boolean; isDark: boolean;
}) {
  const lines = codeSnippets[project.title] ?? [];
  const cat = PROJECT_CATEGORY[project.title] ?? 'all';
  const catColor = CATEGORY_COLOR[cat];
  const catMeta = CATEGORIES.find(c => c.id === cat);

  return (
    <TiltCard
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
        isDark
          ? 'bg-surface-container border border-outline-variant/10 hover:bg-surface-container-high hover:border-outline-variant/30'
          : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl'
      }`}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.08 } }}
        transition={{ delay: index * 0.05, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col flex-1"
      >
        {/* Accent stripe */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{ background: `linear-gradient(90deg, transparent 10%, ${catColor} 50%, transparent 90%)` }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.35 }}
        />

        {/* Mini code pane */}
        <div className="relative h-[148px] overflow-hidden bg-[#0d1117]">
          <div className="flex items-center gap-1.5 px-4 pt-3.5 pb-2 border-b border-white/5 bg-[#161b22]">
            <span className="w-2 h-2 rounded-full bg-red-500/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <span className="w-2 h-2 rounded-full bg-green-500/70" />
            <span className="ml-2 text-[10px] font-mono text-gray-600 truncate">{project.title.toLowerCase().replace(/\s+/g, '-')}.ts</span>
          </div>
          <div className="px-4 pt-2">
            {lines.slice(0, 5).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 + i * 0.04 }}
                className="flex gap-3"
              >
                <span className="select-none text-[10px] font-mono text-gray-700 w-3 text-right flex-shrink-0 leading-5">
                  {line ? i + 1 : ''}
                </span>
                <span className="font-mono text-[10px] leading-5 whitespace-pre truncate" style={{ color: lineColor(line) }}>
                  {line || ' '}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
          <div className="absolute top-9 right-3 px-2.5 py-1.5 rounded-lg text-center"
            style={{ background: `${catColor}22`, border: `1px solid ${catColor}38` }}>
            <span className="text-[13px] font-bold font-headline block leading-none" style={{ color: catColor }}>
              {project.stat.value}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-mono">{project.stat.label}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3.5 p-6 flex-1 relative z-10">
          {/* Category badge */}
          {catMeta && (
            <span
              className="self-start flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-lg"
              style={{ color: catColor, background: `${catColor}15`, border: `1px solid ${catColor}25` }}
            >
              <span className="material-symbols-outlined text-[11px]">{catMeta.icon}</span>
              {catMeta.label}
            </span>
          )}

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${catColor}15`, border: `1px solid ${catColor}30` }}
              >
                <span className="material-symbols-outlined text-[17px]" style={{ color: catColor }}>{project.icon}</span>
              </motion.div>
              <h3 className={`text-sm font-bold font-headline leading-snug ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
                {project.title}
              </h3>
            </div>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-on-surface-variant/40 hover:text-primary hover:bg-primary/10'
                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
              }`}>
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            </a>
          </div>

          <p className={`text-sm leading-relaxed font-body flex-1 ${isDark ? 'text-on-surface-variant' : 'text-gray-600'}`}>
            {project.description}
          </p>

          {project.metrics && (
            <div className={`text-[11px] font-mono px-3 py-2 rounded-lg ${
              isDark ? 'bg-surface-container-highest text-on-surface-variant/60' : 'bg-gray-50 text-gray-500 border border-gray-100'
            }`}>
              {project.metrics}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tags.slice(0, 4).map(tag => (
              <span key={tag}
                className={`px-2 py-1 text-[11px] rounded-lg font-mono transition-colors ${
                  isDark ? 'bg-surface-container-highest text-on-surface-variant/70' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className={`text-[11px] font-mono self-center ${isDark ? 'text-on-surface-variant/30' : 'text-gray-400'}`}>
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

/* ─── Main export ────────────────────────────────────────── */
export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [switching, setSwitching] = useState(false);

  const handleCategoryChange = useCallback((id: CategoryId) => {
    if (id === activeCategory) return;
    setSwitching(true);
    setActiveCategory(id);
  }, [activeCategory]);

  useEffect(() => {
    if (!switching) return;
    const t = setTimeout(() => setSwitching(false), 260);
    return () => clearTimeout(t);
  }, [switching, activeCategory]);

  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = cat.id === 'all'
      ? projects.length
      : projects.filter(p => PROJECT_CATEGORY[p.title] === cat.id).length;
    return acc;
  }, {} as Record<CategoryId, number>);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => PROJECT_CATEGORY[p.title] === activeCategory);

  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <section
      id="projects"
      className={`py-32 px-6 transition-colors ${isDark ? 'bg-surface' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="section-label">Case Studies</span>
            <h2 className={`section-heading ${isDark ? '' : '!text-gray-900'}`}>Featured Projects</h2>
            <p className={`mt-3 text-base font-light max-w-xl font-body ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
              Real frameworks and pipelines built in production — not toy projects.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
              {projects.length} projects · 46 GitHub repos
            </span>
            <a
              href="https://github.com/ranam2030"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl border transition-all font-body ${
                isDark
                  ? 'border-outline-variant/25 text-on-surface-variant hover:text-primary hover:border-primary/30 hover:bg-primary/6'
                  : 'border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <CategoryTabs
            active={activeCategory}
            onChange={handleCategoryChange}
            isDark={isDark}
            counts={counts}
            switching={switching}
          />
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && !switching && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className={`text-center py-24 rounded-2xl border ${isDark ? 'border-outline-variant/12 text-on-surface-variant/40' : 'border-gray-200 text-gray-400'}`}
            >
              <span className="material-symbols-outlined text-[40px] block mb-3 opacity-30">search_off</span>
              <p className="text-sm font-mono">No projects in this category yet</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skeleton grid — shown instantly on tab switch */}
        <AnimatePresence>
          {switching && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.08 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {filtered.find(p => p.featured) && (
                <SkeletonCard featured isDark={isDark} />
              )}
              {(filtered.find(p => p.featured) ? filtered.filter(p => !p.featured) : filtered).map((_, i) => (
                <SkeletonCard key={i} isDark={isDark} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project grid */}
        <AnimatePresence>
          {filtered.length > 0 && !switching && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.08 } }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {featured
                ? <>
                    <FeaturedCard project={featured} inView={inView} isDark={isDark} />
                    {rest.map((project, i) => (
                      <ProjectCard key={project.title} project={project} index={i} inView={inView} isDark={isDark} />
                    ))}
                  </>
                : filtered.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i} inView={inView} isDark={isDark} />
                  ))
              }
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom strip */}
        <motion.div
          className={`mt-12 pt-10 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDark ? 'border-outline-variant/12' : 'border-gray-100'
          }`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          <p className={`text-sm font-body ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
            More repositories on GitHub — including internal tooling, experiment branches, and pinned projects.
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
