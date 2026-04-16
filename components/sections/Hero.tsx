'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { useTheme } from '../ui/ThemeProvider';
import { personalInfo } from '@/data/portfolio';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const CODE_LINES = [
  'const framework = new PlaywrightConfig({',
  "  browser: 'chromium',",
  '  parallelWorkers: 8,',
  "  reporter: 'allure',",
  '});',
  '',
  'test("payment flow", async ({ page }) => {',
  '  await page.goto("/checkout");',
  '  await expect(page).toHaveTitle(/Order/);',
  '  // ✓ 1247 assertions passed',
];

const CHIPS: { label: string; icon: string; style: CSSProperties; delay: number }[] = [
  { label: 'Playwright', icon: 'play_circle', style: { top: '7%', left: '6%' }, delay: 0 },
  { label: 'TypeScript', icon: 'code', style: { top: '7%', right: '6%' }, delay: 0.25 },
  { label: 'Docker', icon: 'deployed_code', style: { top: '46%', left: '3%' }, delay: 0.5 },
  { label: 'CI/CD', icon: 'settings_suggest', style: { top: '46%', right: '3%' }, delay: 0.4 },
];

export function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const panelRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 25,
  });

  const [testCount, setTestCount] = useState(0);
  useEffect(() => {
    const target = 1247;
    const duration = 2200;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setTestCount(Math.floor(eased * target));
      if (p >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden px-6 lg:px-12 pt-20 transition-colors ${
        isDark ? 'bg-surface' : 'bg-white'
      }`}
    >
      {/* Animated drifting background glow */}
      <motion.div
        animate={{ x: [0, 40, -20, 10, 0], y: [0, -25, 20, -10, 0], scale: [1, 1.08, 0.95, 1.03, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -30, 15, 0], y: [0, 20, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px] -z-10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-20">
        {/* Left content */}
        <motion.div
          className="lg:col-span-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col gap-6">
            <motion.span
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-body"
            >
              Senior QA Automation Engineer
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className={`text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] font-headline ${
                isDark ? 'text-on-surface' : 'text-gray-900'
              }`}
            >
              MASUD{' '}
              <span className="text-gradient">RANA</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`text-xl md:text-2xl font-light max-w-2xl leading-relaxed font-body ${
                isDark ? 'text-on-surface-variant' : 'text-gray-600'
              }`}
            >
              {personalInfo.tagline}{' '}
              <span className={isDark ? 'text-on-surface' : 'text-gray-800'}>
                Expert in Playwright, Selenium, and CI/CD pipelines.
              </span>
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
              <a
                href="#projects"
                className="btn-primary inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">folder_open</span>
                View Projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download Resume
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-outline-variant/20"
            >
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '1.2k+', label: 'Automated Tests' },
                { value: '70%', label: 'Regression Cut' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-bold font-headline text-primary">
                    {stat.value}
                  </span>
                  <span
                    className={`text-xs uppercase tracking-wider font-body ${
                      isDark ? 'text-on-surface-variant' : 'text-gray-500'
                    }`}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right visual panel — 3D tilt on hover */}
        <motion.div
          className="lg:col-span-5 relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: '1200px' }}
        >
          <motion.div
            ref={panelRef}
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`aspect-square rounded-xl overflow-hidden relative cursor-default ${
              isDark ? 'bg-surface-container-high' : 'bg-gray-100'
            }`}
          >
            {/* Decorative code grid — lines enter one by one */}
            <div className="absolute inset-0 p-8 flex flex-col gap-3 overflow-hidden opacity-30">
              {CODE_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.09, duration: 0.35 }}
                  className={`font-mono text-xs whitespace-pre ${
                    line.includes('✓')
                      ? 'text-primary'
                      : isDark
                      ? 'text-on-surface-variant'
                      : 'text-gray-600'
                  }`}
                >
                  {line || ' '}
                </motion.div>
              ))}
            </div>

            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 ${
                isDark
                  ? 'bg-gradient-to-br from-surface-container via-transparent to-surface-container-high/80'
                  : 'bg-gradient-to-br from-gray-100 via-transparent to-gray-200/80'
              }`}
            />

            {/* Floating skill chips */}
            {CHIPS.map(chip => (
              <motion.div
                key={chip.label}
                className="absolute"
                style={chip.style}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + chip.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.8 + chip.delay * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-body font-medium border border-outline-variant/30 backdrop-blur-sm whitespace-nowrap ${
                    isDark
                      ? 'bg-surface-container/80 text-on-surface-variant'
                      : 'bg-white/80 text-gray-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '14px' }}>
                    {chip.icon}
                  </span>
                  {chip.label}
                </motion.div>
              </motion.div>
            ))}

            {/* Center icon with rings + pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute w-48 h-48 rounded-full border border-primary/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute w-32 h-32 rounded-full border border-primary/20"
              />
              {/* Expanding pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-20 h-20 rounded-xl border border-primary/50"
              />
              <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 glow-primary relative z-10">
                <span className="material-symbols-outlined text-primary text-4xl">
                  verified_user
                </span>
              </div>
            </div>

            {/* Status badge — live animated counter */}
            <div
              className={`absolute bottom-6 left-6 right-6 p-4 rounded-lg border border-outline-variant/20 ${
                isDark ? 'glass-panel' : 'glass-panel-light'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-primary">
                  TESTS_PASSING: {testCount.toLocaleString()}
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span
                    className="w-2 h-2 rounded-full bg-primary animate-pulse"
                    style={{ animationDelay: '0.15s' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span
          className={`text-[10px] uppercase tracking-[0.2em] font-body ${
            isDark ? 'text-on-surface-variant/40' : 'text-gray-400'
          }`}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isDark ? 'text-on-surface-variant/30' : 'text-gray-400'
            }`}
          >
            keyboard_arrow_down
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
