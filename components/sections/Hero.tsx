'use client';

import { motion } from 'framer-motion';
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

export function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden px-6 lg:px-12 pt-20 transition-colors ${
        isDark ? 'bg-surface' : 'bg-white'
      }`}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-20">
        {/* Left content */}
        <motion.div
          className="lg:col-span-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col gap-6">
            {/* Label */}
            <motion.span
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-body"
            >
              Senior QA Automation Engineer
            </motion.span>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className={`text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] font-headline ${
                isDark ? 'text-on-surface' : 'text-gray-900'
              }`}
            >
              MASUD{' '}
              <span className="text-gradient">RANA</span>
            </motion.h1>

            {/* Tagline */}
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

            {/* CTA Buttons */}
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

            {/* Quick stats */}
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

        {/* Right visual panel */}
        <motion.div
          className="lg:col-span-5 relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`aspect-square rounded-xl overflow-hidden relative ${
              isDark ? 'bg-surface-container-high' : 'bg-gray-100'
            }`}
          >
            {/* Decorative code grid */}
            <div className="absolute inset-0 p-8 flex flex-col gap-3 overflow-hidden opacity-30">
              {[
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
                '});',
              ].map((line, i) => (
                <div
                  key={i}
                  className={`font-mono text-xs whitespace-pre ${
                    line.includes('✓')
                      ? 'text-primary'
                      : isDark
                      ? 'text-on-surface-variant'
                      : 'text-gray-600'
                  }`}
                >
                  {line || ' '}
                </div>
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

            {/* Center icon */}
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
              <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 glow-primary">
                <span className="material-symbols-outlined text-primary text-4xl">
                  verified_user
                </span>
              </div>
            </div>

            {/* Status badge */}
            <div
              className={`absolute bottom-6 left-6 right-6 p-4 rounded-lg border border-outline-variant/20 ${
                isDark ? 'glass-panel' : 'glass-panel-light'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-primary">
                  SYSTEM_STATUS: OPTIMIZED
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.15s' }} />
                </div>
              </div>
            </div>
          </div>
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
