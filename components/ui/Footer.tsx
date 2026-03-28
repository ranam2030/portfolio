'use client';

import { useTheme } from './ThemeProvider';
import { personalInfo } from '@/data/portfolio';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
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
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded transition-colors ${
                isDark
                  ? 'text-on-surface-variant hover:text-primary'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              aria-label="GitHub"
            >
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className={`p-1.5 rounded transition-colors ${
                isDark
                  ? 'text-on-surface-variant hover:text-primary'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              aria-label="Email"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded transition-colors ${
                isDark
                  ? 'text-on-surface-variant hover:text-primary'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              aria-label="LinkedIn"
            >
              <span className="material-symbols-outlined text-[20px]">link</span>
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
