'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { useTheme } from '../ui/ThemeProvider';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const ROLES = [
  'Senior QA Automation Engineer',
  'Test Automation Architect',
  'CI/CD Pipeline Specialist',
  'Performance Testing Expert',
];

const CODE_LINES = [
  "import { test, expect } from '@playwright/test';",
  '',
  "test.describe('Payment Suite', () => {",
  "  test('checkout flow', async ({ page }) => {",
  "    await page.goto('/checkout');",
  "    await page.fill('#card', '4111-1111-1111-1111');",
  "    await page.click('[data-cy=pay]');",
  "    await expect(page.locator('.success')).toBeVisible();",
  '    // ✓ 1,247 assertions passed',
  '  });',
  '});',
];

const CHIPS: { label: string; icon: string; style: CSSProperties; delay: number }[] = [
  { label: 'Playwright', icon: 'play_circle', style: { top: '10%', left: '5%' }, delay: 0 },
  { label: 'TypeScript', icon: 'code', style: { top: '10%', right: '5%' }, delay: 0.2 },
  { label: 'Docker', icon: 'deployed_code', style: { bottom: '26%', left: '3%' }, delay: 0.45 },
  { label: 'GitHub CI', icon: 'settings_suggest', style: { bottom: '26%', right: '3%' }, delay: 0.35 },
];

export function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const panelRef = useRef<HTMLDivElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [testCount, setTestCount] = useState(0);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden px-6 lg:px-12 pt-20 transition-colors ${
        isDark ? 'bg-surface' : 'bg-white'
      }`}
    >
      {/* Animated background glows */}
      <motion.div
        animate={{ x: [0, 50, -30, 10, 0], y: [0, -35, 28, -12, 0], scale: [1, 1.12, 0.92, 1.06, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/4 w-[900px] h-[900px] bg-primary/6 rounded-full blur-[180px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -45, 22, 0], y: [0, 35, -22, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[140px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 30, -15, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-secondary/4 rounded-full blur-[120px] -z-10 pointer-events-none"
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(152,203,255,0.07)' : 'rgba(59,130,246,0.06)'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16">
        {/* Left content */}
        <motion.div
          className="lg:col-span-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Available badge */}
          <motion.div variants={itemVariants} className="mb-7">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider ${
                isDark
                  ? 'border-green-500/30 bg-green-500/8 text-green-400'
                  : 'border-green-500/30 bg-green-50 text-green-600'
              }`}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"
              />
              Available for opportunities
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className={`text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] font-headline ${
              isDark ? 'text-on-surface' : 'text-gray-900'
            }`}
          >
            MASUD{' '}
            <span className="text-gradient">RANA</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} className="mt-6 h-8 flex items-center">
            <span
              className={`text-lg md:text-xl font-medium font-body ${
                isDark ? 'text-on-surface-variant' : 'text-gray-500'
              }`}
            >
              {displayed}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse' }}
                className="text-primary ml-0.5 font-light"
              >
                |
              </motion.span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className={`mt-4 text-base md:text-lg font-light max-w-xl leading-relaxed font-body ${
              isDark ? 'text-on-surface-variant' : 'text-gray-600'
            }`}
          >
            Architecting automation frameworks that scale — from unit to production,{' '}
            <span className={isDark ? 'text-on-surface font-normal' : 'text-gray-800 font-normal'}>
              zero defects, every release.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8">
            <a
              href="#projects"
              className="btn-primary inline-flex items-center gap-2 relative overflow-hidden group"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              View Projects
              <motion.div
                className="absolute inset-0 bg-white/15"
                initial={{ x: '-100%', skewX: '-20deg' }}
                whileHover={{ x: '120%' }}
                transition={{ duration: 0.5 }}
              />
            </a>
            <a href="#contact" className="btn-secondary inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Contact Me
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className={`flex flex-wrap gap-8 mt-10 pt-8 border-t ${
              isDark ? 'border-outline-variant/20' : 'border-gray-100'
            }`}
          >
            {[
              { value: '6+', label: 'Years Experience' },
              { value: '1.2k+', label: 'Automated Tests' },
              { value: '70%', label: 'Regression Cut' },
              { value: '0', label: 'Critical Bugs' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col gap-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }}
              >
                <span className="text-3xl font-bold font-headline text-primary">{stat.value}</span>
                <span
                  className={`text-[11px] uppercase tracking-widest font-body ${
                    isDark ? 'text-on-surface-variant' : 'text-gray-500'
                  }`}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D code panel */}
        <motion.div
          className="lg:col-span-5 relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.88, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: '1400px' }}
        >
          <motion.div
            ref={panelRef}
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            className="aspect-square rounded-2xl overflow-hidden relative cursor-default shadow-2xl"
          >
            {/* Dark code editor background */}
            <div className="absolute inset-0 bg-[#0d1117]" />

            {/* Window chrome */}
            <div className="absolute top-0 left-0 right-0 h-10 flex items-center gap-2 px-5 border-b border-white/5 bg-[#161b22] z-10">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-[11px] font-mono text-gray-500">payment.spec.ts</span>
              <span className="ml-auto text-[10px] font-mono text-primary/50">Playwright</span>
            </div>

            {/* Code lines */}
            <div className="absolute inset-0 pt-14 p-6 flex flex-col gap-2 overflow-hidden">
              {CODE_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.07, duration: 0.35 }}
                  className="flex gap-4"
                >
                  <span className="text-[11px] font-mono text-gray-600 w-4 text-right flex-shrink-0 leading-6 select-none">
                    {line ? i + 1 : ''}
                  </span>
                  <span
                    className="font-mono text-[12px] leading-6 whitespace-pre"
                    style={{
                      color: line.includes('✓')
                        ? '#4ade80'
                        : line.startsWith('import') || line.startsWith('test') || line.startsWith('  test')
                        ? '#60a5fa'
                        : line.trimStart().startsWith('//')
                        ? '#6b7280'
                        : line.includes("'") || line.includes('"')
                        ? '#fbbf24'
                        : '#d1d5db',
                    }}
                  >
                    {line || ' '}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/4 pointer-events-none" />

            {/* Floating skill chips */}
            {CHIPS.map((chip) => (
              <motion.div
                key={chip.label}
                className="absolute"
                style={chip.style}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + chip.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3.2 + chip.delay * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.12 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-white/10 backdrop-blur-md bg-white/5 text-gray-300 whitespace-nowrap shadow-lg"
                >
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '14px' }}>
                    {chip.icon}
                  </span>
                  {chip.label}
                </motion.div>
              </motion.div>
            ))}

            {/* Center decoration: orbital rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute w-44 h-44 rounded-full border border-primary/8"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute w-28 h-28 rounded-full border border-primary/14"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.8, repeat: Infinity }}
                className="absolute w-16 h-16 rounded-xl border border-primary/40"
              />
              <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-primary">
                <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
              </div>
            </div>

            {/* Status bar */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-3 border-t border-white/5 bg-[#0d1117] flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
                <span className="text-[11px] font-mono text-green-400">
                  {testCount.toLocaleString()} tests passing
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-gray-600">TypeScript</span>
                <span className="text-[10px] font-mono text-gray-700">·</span>
                <span className="text-[10px] font-mono text-gray-600">Playwright</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span
          className={`text-[9px] uppercase tracking-[0.25em] font-mono ${
            isDark ? 'text-on-surface-variant/30' : 'text-gray-300'
          }`}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className={`material-symbols-outlined text-[18px] ${
              isDark ? 'text-on-surface-variant/25' : 'text-gray-300'
            }`}
          >
            keyboard_arrow_down
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
