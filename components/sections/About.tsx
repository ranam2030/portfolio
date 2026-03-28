'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { aboutContent } from '@/data/portfolio';

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="about"
      className={`py-32 px-6 transition-colors ${
        isDark ? 'bg-surface-container-low' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Sticky sidebar */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:sticky lg:top-32">
              <span className="section-label">{aboutContent.label}</span>
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight font-headline leading-tight ${
                isDark ? 'text-on-surface' : 'text-gray-900'
              }`}>
                {aboutContent.heading}
              </h2>

              {/* Decorative element */}
              <div className="mt-8 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-primary" />
                <span className="text-xs font-mono text-primary uppercase tracking-widest">
                  QA · 5+ YRS
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-8">
              {/* Paragraphs */}
              <div className={`space-y-6 text-lg font-light leading-relaxed font-body ${
                isDark ? 'text-on-surface-variant' : 'text-gray-600'
              }`}>
                {aboutContent.paragraphs.map((para, i) => (
                  <p key={i}>
                    {i === 0 ? (
                      <>
                        With over{' '}
                        <span className={`font-semibold ${isDark ? 'text-primary' : 'text-blue-600'}`}>
                          5+ years of dedicated experience
                        </span>{' '}
                        in the QA ecosystem,{para.slice(para.indexOf('I '))}
                      </>
                    ) : (
                      para
                    )}
                  </p>
                ))}
              </div>

              {/* Highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                {aboutContent.highlights.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`p-6 rounded-lg border border-outline-variant/10 transition-all duration-300 group ${
                      isDark
                        ? 'bg-surface-container-lowest hover:bg-surface-container'
                        : 'bg-white hover:bg-gray-50 border-gray-200/80'
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary text-2xl mb-4 block group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <h3 className={`text-base font-bold mb-2 font-headline ${
                      isDark ? 'text-on-surface' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed font-body ${
                      isDark ? 'text-on-surface-variant' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
