'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { personalInfo } from '@/data/portfolio';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SOCIAL_LINKS = [
  {
    label: 'Email',
    value: 'masudr2030@gmail.com',
    href: `mailto:${personalInfo.email}`,
    color: '#98cbff',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/ranam2030',
    href: personalInfo.github,
    color: '#5dcaa5',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/masudr2030',
    href: personalInfo.linkedin,
    color: '#bdc2ff',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

function FloatingField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required,
  placeholder,
  isDark,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  isDark: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-body z-10 ${
          isActive
            ? 'top-2 text-[10px] text-primary font-medium'
            : `top-[14px] text-sm ${isDark ? 'text-on-surface-variant/50' : 'text-gray-400'}`
        }`}
      >
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={isActive ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-4 pt-7 pb-2.5 rounded-xl text-sm font-body outline-none transition-all duration-200 border-2 ${
          focused
            ? isDark
              ? 'border-primary bg-primary/6 text-on-surface'
              : 'border-blue-400 bg-blue-50/50 text-gray-900 shadow-[0_0_0_3px_rgba(59,130,246,0.08)]'
            : isDark
            ? 'border-outline-variant/25 bg-surface-container-lowest text-on-surface hover:border-outline-variant/45'
            : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
        }`}
      />
    </div>
  );
}

function FloatingTextarea({
  label,
  name,
  value,
  onChange,
  required,
  rows,
  isDark,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  isDark: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-body z-10 ${
          isActive
            ? 'top-2 text-[10px] text-primary font-medium'
            : `top-[14px] text-sm ${isDark ? 'text-on-surface-variant/50' : 'text-gray-400'}`
        }`}
      >
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-4 pt-7 pb-3 rounded-xl text-sm font-body outline-none transition-all duration-200 border-2 resize-none ${
          focused
            ? isDark
              ? 'border-primary bg-primary/6 text-on-surface'
              : 'border-blue-400 bg-blue-50/50 text-gray-900 shadow-[0_0_0_3px_rgba(59,130,246,0.08)]'
            : isDark
            ? 'border-outline-variant/25 bg-surface-container-lowest text-on-surface hover:border-outline-variant/45'
            : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
        }`}
      />
    </div>
  );
}

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormState('idle'), 6000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  return (
    <section
      id="contact"
      className={`py-32 px-6 transition-colors ${isDark ? 'bg-surface-container-low' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Left: CTA + social links ── */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:sticky lg:top-32">
              <span className="section-label">Ready to Scale Quality?</span>
              <h2
                className={`text-5xl md:text-6xl font-bold tracking-tighter font-headline leading-tight ${
                  isDark ? 'text-on-surface' : 'text-gray-900'
                }`}
              >
                Get In<br />
                <span className="text-gradient">Touch</span>
              </h2>

              <p
                className={`mt-6 text-base font-light leading-relaxed font-body ${
                  isDark ? 'text-on-surface-variant' : 'text-gray-600'
                }`}
              >
                Available for senior QA automation roles, contract engagements, and remote opportunities
                at MNCs and fast-moving product companies.
              </p>

              {/* Social link cards */}
              <div className="mt-10 flex flex-col gap-3">
                {SOCIAL_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    initial={{ opacity: 0, x: -14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-250 group ${
                      isDark
                        ? 'bg-surface-container border-outline-variant/12 hover:border-outline-variant/30'
                        : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: `${link.color}18`, border: `1px solid ${link.color}30`, color: link.color }}
                    >
                      {link.svg}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-[10px] font-mono uppercase tracking-widest mb-0.5 ${
                          isDark ? 'text-on-surface-variant/50' : 'text-gray-400'
                        }`}
                      >
                        {link.label}
                      </p>
                      <p
                        className={`text-sm font-medium font-body truncate transition-colors ${
                          isDark ? 'text-on-surface-variant group-hover:text-on-surface' : 'text-gray-600 group-hover:text-gray-900'
                        }`}
                      >
                        {link.value}
                      </p>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[16px] ml-auto flex-shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${
                        isDark ? 'text-primary' : 'text-blue-500'
                      }`}
                    >
                      arrow_forward
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Location + availability */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
                className={`mt-6 flex items-center gap-3 p-4 rounded-2xl border ${
                  isDark
                    ? 'bg-green-500/5 border-green-500/15'
                    : 'bg-green-50 border-green-100'
                }`}
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
                />
                <span className={`text-xs font-body ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                  Open to opportunities · <span className="font-medium">Dhaka, Bangladesh</span>
                  <span className={isDark ? ' text-green-400/60' : ' text-green-500'}> · remote friendly</span>
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right: Contact form ── */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className={`p-8 rounded-2xl border ${
                isDark
                  ? 'bg-surface-container border-outline-variant/12'
                  : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              <h3
                className={`text-lg font-bold font-headline mb-6 ${
                  isDark ? 'text-on-surface' : 'text-gray-900'
                }`}
              >
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatingField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  isDark={isDark}
                />
                <FloatingField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  isDark={isDark}
                />
              </div>

              <div className="mt-4">
                <FloatingField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Opportunity / Collaboration / Inquiry"
                  isDark={isDark}
                />
              </div>

              <div className="mt-4">
                <FloatingTextarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  isDark={isDark}
                />
              </div>

              {/* Submit */}
              <div className="mt-6 flex items-center gap-4">
                <motion.button
                  type="submit"
                  disabled={formState === 'loading' || formState === 'success' || formState === 'error'}
                  whileHover={formState === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                  className={`flex-1 sm:flex-none px-8 py-3.5 rounded-xl font-bold font-body text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    formState === 'success'
                      ? isDark
                        ? 'bg-green-500/15 text-green-400 cursor-default'
                        : 'bg-green-50 text-green-600 cursor-default border border-green-200'
                      : 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container'
                  } disabled:opacity-60`}
                >
                  {formState === 'loading' ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full"
                      />
                      Sending...
                    </>
                  ) : formState === 'success' ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      Sent!
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      Send Message
                    </>
                  )}
                </motion.button>

                <AnimatePresence mode="wait">
                  {formState === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-0.5"
                    >
                      <p className="text-xs text-green-400 font-mono font-medium">Message delivered!</p>
                      <p className={`text-[11px] font-body ${isDark ? 'text-on-surface-variant/50' : 'text-gray-400'}`}>
                        I&apos;ll reply within 24 hours.
                      </p>
                    </motion.div>
                  )}
                  {formState === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[15px] text-red-400">error</span>
                      <p className="text-xs text-red-400 font-body">{errorMsg}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className={`mt-5 text-[11px] font-body ${isDark ? 'text-on-surface-variant/35' : 'text-gray-400'}`}>
                Prefer direct email?{' '}
                <a href={`mailto:${personalInfo.email}`} className="text-primary hover:underline">
                  {personalInfo.email}
                </a>
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
