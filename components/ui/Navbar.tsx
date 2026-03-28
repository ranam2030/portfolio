'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map(l => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? 'bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10'
              : 'bg-white/80 backdrop-blur-xl border-b border-gray-200/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
            <span
              className={`text-base font-bold tracking-[0.15em] font-headline transition-colors ${
                isDark ? 'text-on-surface' : 'text-gray-900'
              }`}
            >
              MASUD RANA
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium font-body tracking-tight transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-primary'
                    : isDark
                    ? 'text-on-surface-variant hover:text-primary'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
              }`}
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Resume CTA */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all duration-200 active:scale-95 font-body"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Resume
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDark ? 'text-on-surface-variant hover:bg-surface-container' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-20 left-0 right-0 z-40 px-6 pb-6 pt-4 ${
              isDark
                ? 'bg-surface-container/95 backdrop-blur-xl border-b border-outline-variant/10'
                : 'bg-white/95 backdrop-blur-xl border-b border-gray-200/60'
            }`}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`px-4 py-3 rounded-lg font-medium font-body text-sm transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-primary bg-primary/5'
                      : isDark
                      ? 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-on-primary text-sm font-bold rounded-lg"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
