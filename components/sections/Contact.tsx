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

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    // Mock submit
    await new Promise(r => setTimeout(r, 1500));
    setFormState('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormState('idle'), 4000);
  };

  const inputClass = `w-full px-4 py-3 rounded-lg text-sm font-body outline-none transition-all duration-200 ${
    isDark
      ? 'bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/40 border border-outline-variant/20 focus:border-primary/50 focus:bg-surface-container focus:shadow-[0_0_0_2px_rgba(152,203,255,0.1)]'
      : 'bg-white text-gray-900 placeholder:text-gray-400 border border-gray-200 focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]'
  }`;

  return (
    <section
      id="contact"
      className={`py-32 px-6 transition-colors ${isDark ? 'bg-surface-container-low' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: CTA copy */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:sticky lg:top-32">
              <span className="section-label">Ready to Scale Quality?</span>
              <h2 className={`text-5xl md:text-6xl font-bold tracking-tighter font-headline leading-tight ${
                isDark ? 'text-on-surface' : 'text-gray-900'
              }`}>
                Get In<br />
                <span className="text-gradient">Touch</span>
              </h2>

              <p className={`mt-6 text-base font-light leading-relaxed font-body ${
                isDark ? 'text-on-surface-variant' : 'text-gray-600'
              }`}>
                Available for senior QA automation roles, contract engagements, and remote opportunities at MNCs and fast-moving product companies.
              </p>

              {/* Contact links */}
              <div className="mt-10 flex flex-col gap-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className={`flex items-center gap-3 text-sm font-medium transition-colors group font-body ${
                    isDark
                      ? 'text-on-surface-variant hover:text-primary'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isDark
                      ? 'bg-surface-container-high group-hover:bg-primary/10'
                      : 'bg-white group-hover:bg-blue-50 border border-gray-200'
                  }`}>
                    <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
                  </span>
                  {personalInfo.email}
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 text-sm font-medium transition-colors group font-body ${
                    isDark
                      ? 'text-on-surface-variant hover:text-primary'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isDark
                      ? 'bg-surface-container-high group-hover:bg-primary/10'
                      : 'bg-white group-hover:bg-blue-50 border border-gray-200'
                  }`}>
                    <span className="material-symbols-outlined text-primary text-[18px]">terminal</span>
                  </span>
                  GitHub Profile 
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 text-sm font-medium transition-colors group font-body ${
                    isDark
                      ? 'text-on-surface-variant hover:text-primary'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isDark
                      ? 'bg-surface-container-high group-hover:bg-primary/10'
                      : 'bg-white group-hover:bg-blue-50 border border-gray-200'
                  }`}>
                    <span className="material-symbols-outlined text-primary text-[18px]">link</span>
                  </span>
                  LinkedIn Profile
                </a>

                {/* Location + availability */}
                <div className={`mt-4 pt-4 border-t flex items-center gap-2 ${
                  isDark ? 'border-outline-variant/20' : 'border-gray-200'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className={`text-xs font-body ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
                    Open to opportunities · {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className={`p-8 rounded-lg border border-outline-variant/10 ${
                isDark ? 'bg-surface-container' : 'bg-white border-gray-200'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-mono uppercase tracking-wider ${
                    isDark ? 'text-on-surface-variant' : 'text-gray-500'
                  }`}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-mono uppercase tracking-wider ${
                    isDark ? 'text-on-surface-variant' : 'text-gray-500'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1.5">
                <label className={`text-xs font-mono uppercase tracking-wider ${
                  isDark ? 'text-on-surface-variant' : 'text-gray-500'
                }`}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Opportunity / Collaboration / Inquiry"
                  className={inputClass}
                />
              </div>

              <div className="mt-4 flex flex-col gap-1.5">
                <label className={`text-xs font-mono uppercase tracking-wider ${
                  isDark ? 'text-on-surface-variant' : 'text-gray-500'
                }`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about the role, project, or what you have in mind..."
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={formState === 'loading' || formState === 'success'}
                  className={`flex-1 sm:flex-none px-8 py-3.5 rounded-lg font-bold font-body text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${
                    formState === 'success'
                      ? 'bg-green-500/20 text-green-400 cursor-default'
                      : 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container'
                  } disabled:opacity-60`}
                >
                  {formState === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : formState === 'success' ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      Send Message
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {formState === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-green-400 font-mono"
                    >
                      I'll reply within 24 hours.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <p className={`mt-4 text-[11px] font-body ${
                isDark ? 'text-on-surface-variant/40' : 'text-gray-400'
              }`}>
                Prefer email?{' '}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-primary hover:underline"
                >
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
