'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const messages = [
  'System Status: Optimized',
  'Tests: All Passing',
  'CI/CD: Green',
  'Coverage: 94.2%',
];

export function StatusTerminal() {
  const [msgIndex, setMsgIndex] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed bottom-6 right-6 hidden md:flex items-center gap-3 px-4 py-2.5 rounded-full shadow-2xl z-30 border transition-colors ${
        isDark
          ? 'bg-surface-container-high border-outline-variant/20'
          : 'bg-white border-gray-200/80'
      }`}
    >
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow flex-shrink-0" />
      <AnimatePresence mode="wait">
        <motion.span
          key={msgIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          className={`text-[10px] font-mono uppercase tracking-widest ${
            isDark ? 'text-on-surface-variant' : 'text-gray-500'
          }`}
        >
          {messages[msgIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
