'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-surface flex items-center justify-center flex-col gap-8"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          {/* Logo Mark */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="font-headline text-2xl font-bold tracking-tighter text-on-surface">
                MASUD RANA
              </span>
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-body font-medium">
              Senior QA Automation Engineer
            </span>
          </motion.div>

          {/* Loading Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-48 h-[1px] bg-outline-variant/30 relative overflow-hidden rounded-full"
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </motion.div>

          {/* Status text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant"
          >
            Initializing Quality Systems...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
