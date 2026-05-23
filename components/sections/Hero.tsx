'use client';

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTheme } from '../ui/ThemeProvider';
import { ShinyText, DotGrid, ClickSpark, CountUp, Magnet } from '../ui/animations';

/* ─── Static config ───────────────────────────────────────── */
const ROLES = [
  'Senior QA Automation Engineer',
  'Test Automation Architect',
  'CI/CD Pipeline Specialist',
  'Performance Testing Expert',
];

const STACK_BADGES = [
  { label: 'Playwright', icon: 'play_circle',     color: '#5dcaa5' },
  { label: 'Selenium',   icon: 'web',             color: '#fb923c' },
  { label: 'k6',         icon: 'speed',           color: '#bdc2ff' },
  { label: 'CI/CD',      icon: 'settings_suggest', color: '#f9a825' },
];

const BROWSERS = [
  { name: 'Chromium', short: 'CR', color: '#fbbf24', target: 0.92, passed: 487 },
  { name: 'Firefox',  short: 'FF', color: '#fb923c', target: 0.78, passed: 412 },
  { name: 'WebKit',   short: 'WK', color: '#60a5fa', target: 0.66, passed: 348 },
];

const PIPELINE_STAGES = [
  { id: 'lint',   label: 'Lint',   icon: 'fact_check'     },
  { id: 'unit',   label: 'Unit',   icon: 'science'        },
  { id: 'e2e',    label: 'E2E',    icon: 'verified'       },
  { id: 'deploy', label: 'Deploy', icon: 'rocket_launch'  },
];

type TestEntry = { id: number; name: string; time: number; status: 'pass' | 'run' };

const TEST_POOL: Omit<TestEntry, 'id' | 'status'>[] = [
  { name: 'auth/login.spec.ts',         time: 142 },
  { name: 'payment/checkout.spec.ts',   time: 268 },
  { name: 'cart/add-item.spec.ts',      time: 89  },
  { name: 'profile/edit-avatar.spec',   time: 156 },
  { name: 'api/users-crud.spec.ts',     time: 198 },
  { name: 'search/filter-sort.spec',    time: 121 },
  { name: 'admin/audit-log.spec.ts',    time: 304 },
  { name: 'mobile/checkout.spec.ts',    time: 412 },
  { name: 'graphql/orders.spec.ts',     time: 175 },
];

/* ─── Right-panel sub-components ──────────────────────────── */

function BrowserNodes() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {BROWSERS.map((b, i) => (
        <motion.div
          key={b.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#161b22] border border-white/5 rounded-xl p-2.5 relative overflow-hidden"
        >
          {/* Top: name + count */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div
                className="w-4 h-4 rounded-md flex items-center justify-center text-[8px] font-bold"
                style={{ background: `${b.color}22`, color: b.color }}
              >
                {b.short}
              </div>
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                {b.name}
              </span>
            </div>
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: b.color }}
            />
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: b.color }}
              initial={{ width: 0 }}
              animate={{ width: `${b.target * 100}%` }}
              transition={{ delay: 1.3 + i * 0.1, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Bottom: count + check */}
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] font-mono text-gray-500">
              <CountUp to={b.passed} duration={1800} />
              <span className="text-gray-700"> tests</span>
            </span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.6 + i * 0.1, type: 'spring', stiffness: 400, damping: 18 }}
              className="material-symbols-outlined text-[10px] text-green-400"
            >
              check_circle
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CIPipeline() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveStage((s) => (s + 1) % (PIPELINE_STAGES.length + 1));
    }, 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#161b22] border border-white/5 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">
          Pipeline
        </span>
        <div className="flex items-center gap-1">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-primary"
          />
          <span className="text-[9px] font-mono text-primary/70">running</span>
        </div>
      </div>

      <div className="relative flex items-center justify-between">
        {/* Track line */}
        <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-px bg-white/[0.06]" />

        {/* Beam — animates across as stage advances */}
        <motion.div
          className="absolute left-3 top-1/2 -translate-y-1/2 h-[2px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #98cbff, transparent)',
          }}
          animate={{
            width: `${(activeStage / PIPELINE_STAGES.length) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {PIPELINE_STAGES.map((stage, i) => {
          const done = i < activeStage;
          const current = i === activeStage;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center gap-1.5">
              <motion.div
                className="w-7 h-7 rounded-lg flex items-center justify-center border"
                animate={{
                  background: done
                    ? 'rgba(74,222,128,0.18)'
                    : current
                    ? 'rgba(152,203,255,0.18)'
                    : 'rgba(255,255,255,0.02)',
                  borderColor: done
                    ? 'rgba(74,222,128,0.45)'
                    : current
                    ? 'rgba(152,203,255,0.5)'
                    : 'rgba(255,255,255,0.06)',
                  scale: current ? 1.08 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {done ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="material-symbols-outlined text-[14px] text-green-400"
                  >
                    check
                  </motion.span>
                ) : (
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ color: current ? '#98cbff' : '#4b5563' }}
                  >
                    {stage.icon}
                  </span>
                )}
                {current && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-lg border border-primary"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <span
                className={`text-[9px] font-mono ${
                  done ? 'text-green-400' : current ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TestStream() {
  const [entries, setEntries] = useState<TestEntry[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    // Seed initial entries with stagger
    const seed = setTimeout(() => {
      const initial = TEST_POOL.slice(0, 4).map((t) => ({
        ...t,
        id: idRef.current++,
        status: 'pass' as const,
      }));
      setEntries(initial);
    }, 1400);

    // Continuously add new entries every 1.8s
    const interval = setInterval(() => {
      setEntries((prev) => {
        const next = TEST_POOL[idRef.current % TEST_POOL.length];
        const newEntry: TestEntry = {
          id: idRef.current++,
          name: next.name,
          time: next.time + Math.floor(Math.random() * 40 - 20),
          status: 'pass',
        };
        return [newEntry, ...prev].slice(0, 4);
      });
    }, 1800);

    return () => {
      clearTimeout(seed);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-[#161b22] border border-white/5 rounded-xl p-3 flex-1 min-h-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">
          Live Stream
        </span>
        <div className="flex items-center gap-1.5">
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-green-400"
          />
          <span className="text-[9px] font-mono text-green-400">streaming</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <AnimatePresence mode="popLayout">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, x: -12, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 12, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-[10px] font-mono"
            >
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 500, damping: 22 }}
                className="material-symbols-outlined text-[12px] text-green-400 flex-shrink-0"
              >
                check_circle
              </motion.span>
              <span className="text-gray-400 truncate flex-1">{entry.name}</span>
              <span className="text-gray-600 text-[9px]">{entry.time}ms</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PerfSparkline() {
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: 28 }, () => 0.3 + Math.random() * 0.7)
  );

  useEffect(() => {
    const t = setInterval(() => {
      setBars((prev) => {
        const next = [...prev.slice(1), 0.3 + Math.random() * 0.7];
        return next;
      });
    }, 280);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#161b22] border border-white/5 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">
          Performance
        </span>
        <span className="text-[9px] font-mono text-primary/70">p95: 142ms</span>
      </div>
      <div className="flex items-end gap-[3px] h-8">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm origin-bottom"
            style={{
              background: i > 22
                ? 'linear-gradient(180deg, #98cbff 0%, #5dcaa5 100%)'
                : 'rgba(152,203,255,0.4)',
            }}
            animate={{ height: `${h * 100}%` }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Hero main export ────────────────────────────────────── */
export function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const panelRef = useRef<HTMLDivElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  // 3D tilt for the dashboard panel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 100, damping: 20 });

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

      {/* Interactive dot grid */}
      <DotGrid
        className="absolute inset-0 -z-10 w-full h-full"
        dotColor={isDark ? 'rgba(152,203,255,0.08)' : 'rgba(59,130,246,0.07)'}
        activeColor={isDark ? 'rgba(152,203,255,0.55)' : 'rgba(59,130,246,0.45)'}
        spacing={36}
        dotSize={1.4}
        proximity={140}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-16">
        {/* ── Left content ── */}
        <div className="lg:col-span-6">
          {/* Build-status badge — replaces generic "available" */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`inline-flex items-center gap-3 mb-7 px-3.5 py-1.5 rounded-full border text-xs font-mono ${
              isDark
                ? 'border-green-500/30 bg-green-500/8 text-green-400'
                : 'border-green-500/30 bg-green-50 text-green-600'
            }`}
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-400"
            />
            <span className="tracking-wider">Build: <span className="font-semibold">passing</span></span>
            <span className={isDark ? 'text-green-500/30' : 'text-green-600/40'}>·</span>
            <span className="tracking-wider">
              <CountUp to={1247} duration={2000} />
              <span> tests</span>
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`text-7xl md:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.85] font-headline ${
              isDark ? 'text-on-surface' : 'text-gray-900'
            }`}
          >
            MASUD{' '}
            <ShinyText text="RANA" speed={5} baseColor="#98cbff" shineColor="#ffffff" />
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 h-8 flex items-center"
          >
            <span className="text-primary/60 font-mono text-sm mr-2">$</span>
            <span
              className={`text-lg md:text-xl font-medium font-body ${
                isDark ? 'text-on-surface-variant' : 'text-gray-600'
              }`}
            >
              {displayed}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse' }}
                className="text-primary ml-0.5 font-light"
              >
                _
              </motion.span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className={`mt-4 text-base md:text-lg font-light max-w-xl leading-relaxed font-body ${
              isDark ? 'text-on-surface-variant' : 'text-gray-600'
            }`}
          >
            Architecting automation frameworks that scale — from unit to production,{' '}
            <span className={isDark ? 'text-on-surface font-normal' : 'text-gray-800 font-normal'}>
              zero defects, every release.
            </span>
          </motion.p>

          {/* Stack badges — magnetic, hoverable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            <span
              className={`text-[10px] font-mono uppercase tracking-widest mr-1 ${
                isDark ? 'text-on-surface-variant/50' : 'text-gray-400'
              }`}
            >
              Stack:
            </span>
            {STACK_BADGES.map((badge, i) => (
              <Magnet key={badge.label} strength={0.4} range={70}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono cursor-default transition-colors ${
                    isDark
                      ? 'bg-surface-container border-outline-variant/20 hover:border-outline-variant/40'
                      : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                  }`}
                  style={{ color: badge.color }}
                >
                  <span className="material-symbols-outlined text-[12px]">{badge.icon}</span>
                  {badge.label}
                </motion.div>
              </Magnet>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <ClickSpark sparkColor="#ffffff" sparkCount={10} sparkRadius={28}>
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
            </ClickSpark>
            <ClickSpark sparkColor="#98cbff" sparkCount={8} sparkRadius={24}>
              <a href="#contact" className="btn-secondary inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Contact Me
              </a>
            </ClickSpark>
          </motion.div>

          {/* Hoverable stat tiles — replaces flat numbers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-8 border-t ${
              isDark ? 'border-outline-variant/20' : 'border-gray-100'
            }`}
          >
            {[
              { value: 6,    suffix: '+',  label: 'Years XP',         color: '#98cbff' },
              { value: 1247, suffix: '',   label: 'Automated Tests',  color: '#5dcaa5' },
              { value: 70,   suffix: '%',  label: 'Regression Cut',   color: '#fbbf24' },
              { value: 0,    suffix: '',   label: 'Critical Bugs',    color: '#bdc2ff' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`relative group rounded-xl px-3 py-2.5 border transition-colors cursor-default ${
                  isDark
                    ? 'border-outline-variant/15 hover:border-outline-variant/30 bg-surface-container/40'
                    : 'border-gray-100 hover:border-gray-200 bg-white/50'
                }`}
              >
                {/* Accent dot */}
                <span
                  className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full"
                  style={{ background: stat.color }}
                />
                <CountUp
                  to={stat.value}
                  suffix={stat.suffix}
                  duration={1800 + i * 100}
                  className="block text-2xl md:text-3xl font-bold font-headline"
                  style={{ color: stat.color }}
                />
                <span
                  className={`text-[10px] uppercase tracking-widest font-body mt-1 block ${
                    isDark ? 'text-on-surface-variant/70' : 'text-gray-500'
                  }`}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Live QA dashboard panel ── */}
        <motion.div
          className="lg:col-span-6 relative"
          initial={{ opacity: 0, scale: 0.92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: '1600px' }}
        >
          {/* Corner watcher chips — tiny browser indicators outside the panel */}
          <motion.div
            className="absolute -top-3 -left-3 z-20 hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0d1117] border border-white/8 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.4 }}
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-400"
            />
            <span className="text-[10px] font-mono text-green-400">LIVE</span>
          </motion.div>
          <motion.div
            className="absolute -top-3 -right-3 z-20 hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0d1117] border border-white/8 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, duration: 0.4 }}
          >
            <span className="material-symbols-outlined text-[12px] text-primary">cloud_done</span>
            <span className="text-[10px] font-mono text-gray-400">GitHub CI</span>
          </motion.div>

          <motion.div
            ref={panelRef}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            className="rounded-2xl overflow-hidden relative cursor-default shadow-2xl bg-[#0d1117] border border-white/5"
          >
            {/* Window chrome */}
            <div className="h-10 flex items-center gap-2 px-4 border-b border-white/5 bg-[#161b22]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-3 text-[11px] font-mono text-gray-500">
                test-runner — playwright@1.49.0
              </span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] font-mono text-primary/60">parallel</span>
                <span className="text-[10px] font-mono text-gray-700">·</span>
                <span className="text-[10px] font-mono text-gray-400">main</span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-3 space-y-2.5">
              <BrowserNodes />
              <CIPipeline />
              <TestStream />
              <PerfSparkline />
            </div>

            {/* Status bar */}
            <div className="px-4 py-2.5 border-t border-white/5 bg-[#0d1117] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
                <span className="text-[11px] font-mono text-green-400">
                  <CountUp to={1247} duration={2200} /> passing
                </span>
                <span className="text-[10px] font-mono text-gray-700">·</span>
                <span className="text-[11px] font-mono text-red-400/60">0 failed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-600">coverage:</span>
                <span className="text-[10px] font-mono text-primary">94%</span>
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
