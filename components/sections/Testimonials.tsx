'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ui/ThemeProvider';
import { testimonials, certifications, type Testimonial, type Certification } from '@/data/portfolio';

/* ─── Issuer SVG logos ──────────────────────────────────── */
function IssuerLogo({ type, size = 18 }: { type: Certification['issuerLogo']; size?: number }) {
  if (type === 'linkedin') return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
  if (type === 'udemy') return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
      <path d="M12 0L5.81 3.573v3.574l6.189-3.574 6.191 3.574V3.573zM5.81 10.148v8.144c0 1.85.589 3.243 1.741 4.234S10.177 24 11.973 24s3.269-.482 4.448-1.474c1.179-.991 1.768-2.439 1.768-4.314v-8.064h-3.242v7.85c0 2.036-.901 3.055-2.974 3.055-2.076 0-2.974-1.019-2.974-3.055v-7.85z"/>
    </svg>
  );
  // keeron / generic — shield check
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size }}>verified</span>
  );
}

/* ─── Testimonial card ──────────────────────────────────── */
function TestimonialCard({ t, index, inView, isDark }: {
  t: Testimonial; index: number; inView: boolean; isDark: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = t.quote.length > 220;
  const displayQuote = isLong && !expanded ? t.quote.slice(0, 220).trimEnd() + '…' : t.quote;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-300 overflow-hidden ${
        isDark
          ? 'bg-surface-container border-outline-variant/10 hover:border-outline-variant/25'
          : 'bg-white border-gray-200 shadow-sm hover:shadow-lg'
      }`}
    >
      {/* Colored top stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }} />

      {/* Subtle glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-8 -right-8 w-36 h-36 rounded-full blur-[50px] pointer-events-none"
        style={{ background: t.color }}
      />

      {/* Quote mark */}
      <div className="text-5xl font-serif leading-none mb-3 select-none" style={{ color: `${t.color}40` }}>&ldquo;</div>

      {/* Quote text */}
      <div className="flex-1 mb-5 relative z-10">
        <p className={`text-sm leading-relaxed font-body whitespace-pre-line ${isDark ? 'text-on-surface-variant' : 'text-gray-600'}`}>
          {displayQuote}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(e => !e)}
            className={`mt-2 text-xs font-medium font-body transition-colors ${isDark ? 'text-primary hover:text-on-surface' : 'text-blue-600 hover:text-blue-800'}`}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t relative z-10"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold font-headline"
          style={{ background: `${t.color}20`, border: `1px solid ${t.color}35`, color: t.color }}
        >
          {t.initials}
        </div>
        <div className="min-w-0">
          <p className={`text-sm font-semibold font-headline leading-tight truncate ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
            {t.name}
          </p>
          <p className={`text-[11px] font-body mt-0.5 truncate ${isDark ? 'text-on-surface-variant/55' : 'text-gray-400'}`}>
            {t.role}{t.company ? ` · ${t.company}` : ''}
          </p>
        </div>
        <div className="ml-auto flex-shrink-0 text-right">
          <p className={`text-[10px] font-mono ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>{t.date}</p>
          <p className={`text-[10px] font-body mt-0.5 ${isDark ? 'text-on-surface-variant/30' : 'text-gray-300'}`}>{t.relationship}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Certification card ─────────────────────────────────── */
function CertCard({ cert, index, inView, isDark }: {
  cert: Certification; index: number; inView: boolean; isDark: boolean;
}) {
  return (
    <motion.a
      href={cert.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${cert.name} certificate from ${cert.issuer}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 overflow-hidden ${
        isDark
          ? 'bg-surface-container border-outline-variant/10 hover:border-outline-variant/25'
          : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at top left, ${cert.color}0a 0%, transparent 70%)` }} />

      {/* Issuer icon badge */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30`, color: cert.color }}
      >
        <IssuerLogo type={cert.issuerLogo} size={20} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className={`text-sm font-bold font-headline leading-tight ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
              {cert.name}
            </p>
            <p className={`text-[11px] font-body mt-0.5 ${isDark ? 'text-on-surface-variant/60' : 'text-gray-500'}`}>
              {cert.issuer}
            </p>
          </div>
          <span
            className="material-symbols-outlined text-[15px] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 mt-0.5"
            style={{ color: cert.color }}
          >
            open_in_new
          </span>
        </div>

        <div className="flex items-center gap-3 mt-3">
          {cert.date && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{ background: `${cert.color}15`, color: cert.color }}
            >
              <span className="material-symbols-outlined text-[10px]">calendar_today</span>
              {cert.date}
            </span>
          )}
          <span
            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{ background: `${cert.color}10`, color: cert.color, border: `1px solid ${cert.color}25` }}
          >
            <span className="material-symbols-outlined text-[10px]">verified</span>
            Verified
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/* ─── Main export ────────────────────────────────────────── */
export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [tab, setTab] = useState<'testimonials' | 'certifications'>('testimonials');

  return (
    <section
      id="testimonials"
      className={`py-32 px-6 transition-colors ${isDark ? 'bg-surface-container-lowest' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="section-label">Social Proof</span>
            <h2 className={`section-heading ${isDark ? '' : '!text-gray-900'}`}>
              Trust &amp; Credentials
            </h2>
            <p className={`mt-3 text-sm font-body max-w-lg ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
              What colleagues say, and the certifications that back the work.
            </p>
          </div>
          <p className={`text-sm font-mono shrink-0 ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
            / PEER_REVIEW.LOG
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex gap-1 mb-10 w-fit"
        >
          {(['testimonials', 'certifications'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium font-body transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                tab === t
                  ? isDark ? 'text-on-surface' : 'text-gray-900'
                  : isDark ? 'text-on-surface-variant/60 hover:text-on-surface-variant' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === t && (
                <motion.div
                  layoutId="cred-tab"
                  className={`absolute inset-0 rounded-xl ${isDark ? 'bg-surface-container' : 'bg-white shadow-sm border border-gray-200'}`}
                  transition={{ type: 'spring', stiffness: 600, damping: 38 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px]">
                  {t === 'testimonials' ? 'format_quote' : 'workspace_premium'}
                </span>
                {t === 'testimonials' ? `Recommendations (${testimonials.length})` : `Certifications (${certifications.length})`}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {testimonials.map((t, i) => (
                  <TestimonialCard key={t.name} t={t} index={i} inView={inView} isDark={isDark} />
                ))}
              </div>

              {/* LinkedIn CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="mt-8 flex items-center justify-center gap-3"
              >
                <div className={`h-[1px] w-16 ${isDark ? 'bg-outline-variant/20' : 'bg-gray-200'}`} />
                <a
                  href="https://www.linkedin.com/in/masudr2030/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-xs font-body transition-colors ${
                    isDark ? 'text-on-surface-variant/50 hover:text-primary' : 'text-gray-400 hover:text-blue-600'
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  View all recommendations on LinkedIn
                  <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </a>
                <div className={`h-[1px] w-16 ${isDark ? 'bg-outline-variant/20' : 'bg-gray-200'}`} />
              </motion.div>
            </motion.div>
          )}

          {tab === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, i) => (
                  <CertCard key={cert.name} cert={cert} index={i} inView={inView} isDark={isDark} />
                ))}
              </div>

              {/* Credential note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className={`mt-8 text-center text-xs font-body ${isDark ? 'text-on-surface-variant/30' : 'text-gray-400'}`}
              >
                All credentials are publicly verifiable — click any card to view the original certificate.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
