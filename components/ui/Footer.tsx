'use client';

import { useTheme } from './ThemeProvider';
import { personalInfo } from '@/data/portfolio';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Trust', href: '#testimonials' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`w-full py-12 border-t transition-colors ${
        isDark
          ? 'border-outline-variant/20 bg-surface-container-lowest'
          : 'border-gray-200/60 bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
          <span className="font-headline text-sm font-bold tracking-[0.15em] text-on-surface uppercase">
            Masud Rana
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-wrap justify-center gap-6">
          {footerLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-medium font-body tracking-wide transition-colors ${
                isDark
                  ? 'text-on-surface-variant hover:text-primary'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social + Copyright */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-on-surface-variant hover:text-[#5dcaa5] hover:bg-[#5dcaa5]/10'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-on-surface-variant hover:text-[#98cbff] hover:bg-[#98cbff]/10'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-on-surface-variant hover:text-[#bdc2ff] hover:bg-[#bdc2ff]/10'
                  : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50'
              }`}
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <p
            className={`text-[11px] font-body tracking-wide ${
              isDark ? 'text-on-surface-variant/50' : 'text-gray-400'
            }`}
          >
            © {new Date().getFullYear()} Masud Rana. Built for Precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
