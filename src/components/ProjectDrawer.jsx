'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* Extended detail per project */
const DETAILS = {
  'roar-frontend': {
    role: 'Solo frontend engineer',
    year: '2025',
    highlights: [
      'Built a rich-text article builder from scratch — no external editor library',
      'Migrated entire UI system: design tokens, component library, dark theme',
      'Achieved sub-2s LCP on mobile via code-splitting and font optimization',
    ],
    what: 'A content creation platform frontend featuring a fully custom article builder, mobile-first layout system, and a redesigned component library.',
  },
  Onlearn: {
    role: 'Frontend engineer',
    year: '2024',
    highlights: [
      'Documented every component as if shipping to a client team',
      'Responsive across 320px–2560px with zero layout shift',
      'Structured Nuxt route system for seamless course navigation',
    ],
    what: 'A responsive e-learning platform landing and dashboard experience built with Nuxt 3, Vue, and TypeScript — documented to production standards.',
  },
  'Wings-Height-Insurance-Brokers-Limited': {
    role: 'Frontend engineer (freelance)',
    year: '2024',
    highlights: [
      'Zero framework — hand-crafted HTML, CSS, JS for fast load times',
      'Multi-page: quotes, claims, bookings, team, and service pages',
      'Cross-browser tested; accessible heading hierarchy and contrast ratios',
    ],
    what: 'A complete corporate website for an insurance brokerage. Multiple service pages, quote and booking flows, delivered framework-free for maximum portability.',
  },
  Anime_Abyss: {
    role: 'Solo developer',
    year: '2025',
    highlights: [
      'Built on Nuxt 4 (RC) — learned the new routing and composable model',
      'Custom card hover system with CSS-only layered transitions',
      'Fetches live anime data and renders dynamic discovery grids',
    ],
    what: 'An anime discovery homepage with a custom interactive card system and live data fetching, built on the Nuxt 4 release candidate.',
  },
  'Maneyger-7.0': {
    role: 'Solo developer',
    year: '2023',
    highlights: [
      'All UI logic hand-built — no React, no Vue, pure vanilla JS',
      'Persistent state via localStorage; no backend required',
      'Budget categories, expense tracking, and visual summaries',
    ],
    what: 'A personal finance manager with full CRUD budget tracking, category management, and spending summaries — all in vanilla JavaScript.',
  },
  'Inventory-Management-System': {
    role: 'Solo developer',
    year: '2024',
    highlights: [
      'Full SDLC documentation: requirements, design, implementation, testing',
      'Stateful CLI session with persistent file-backed data store',
      'Covers every CRUD operation with input validation and error handling',
    ],
    what: 'A command-line inventory tracker built in Python, fully documented across every SDLC phase as a study in professional software process.',
  },
  FusionOCR: {
    role: 'Solo developer',
    year: '2025',
    highlights: [
      'Dual TrOCR models (handwritten + printed) cover the full spectrum of children\'s writing styles',
      'Weighted Levenshtein consensus across 4 engines — TrOCR × 2, EasyOCR, Tesseract',
      'Preprocessing removes ruled lines, corrects skew, and handles uneven phone-photo lighting',
      'Batch TrOCR inference + parallel threads — optimised for throughput without sacrificing accuracy',
    ],
    what: 'Multi-engine OCR pipeline purpose-built for children\'s handwritten English. Fuses four OCR engines via weighted edit-distance consensus and outputs structured JSON consumed by Verdikt for AI marking.',
  },
  Verdikt: {
    role: 'Solo developer',
    year: '2025',
    highlights: [
      'Three-stage pipeline: FusionOCR transcription → vision LLM verification → LLM marking',
      'Marks by concept and understanding — explicitly ignores spelling errors in children\'s answers',
      'Flags low-confidence OCR lines and gives benefit of the doubt during marking',
      'Pluggable LLM backend: Ollama (local, free) or HuggingFace Inference API',
    ],
    what: 'AI-powered exam script marking system. Takes handwritten children\'s scripts, verifies the OCR transcription with a vision LLM, then marks each answer against a mark scheme — returning scores, justification, and student feedback.',
  },
  'terminal-games-cpp': {
    role: 'Solo developer',
    year: '2024',
    highlights: [
      'Snake: difficulty selector (Easy/Medium/Hard/Custom ms), tail growth, wall & self-collision',
      'Pac-Man: procedural maze generation, pellet scoring, two ghosts with hybrid chase/random AI',
      'Zero dependencies — all rendering via cout, input via conio.h',
    ],
    what: 'Snake and Pac-Man built from scratch in C++ for the Windows terminal. Demonstrates game loop architecture, grid-based collision detection, and rudimentary AI with no external libraries.',
  },
};

function DrawerInner({ project, onClose }) {
  const detail = DETAILS[project?.name] ?? {};

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          />

          {/* drawer */}
          <motion.aside
            key="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{
              position: 'fixed', right: 0, top: 0, bottom: 0,
              width: 480, maxWidth: '95vw',
              zIndex: 9999, overflowY: 'auto',
              background: 'var(--color-card)',
              borderLeft: '1px solid var(--color-line)',
            }}
          >
            {/* top accent line */}
            <div className="h-[3px] w-full bg-grad" />

            <div className="px-7 py-6">
              {/* close */}
              <button
                onClick={onClose}
                className="mb-6 flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"
              >
                <span>←</span> Close
              </button>

              {/* header */}
              <div className="mb-6 flex items-start gap-4">
                <span className="text-4xl">{project.emoji}</span>
                <div>
                  <h2 className="font-display text-xl font-bold leading-snug">{project.title}</h2>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted">
                    {detail.role && <span>{detail.role}</span>}
                    {detail.year && <span>· {detail.year}</span>}
                  </div>
                </div>
              </div>

              {/* what is it */}
              {detail.what && (
                <div className="mb-6">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[2px] text-mint">Overview</p>
                  <p className="text-sm leading-relaxed text-muted">{detail.what}</p>
                </div>
              )}

              {/* highlights */}
              {detail.highlights?.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[2px] text-mint">Key highlights</p>
                  <ul className="space-y-2">
                    {detail.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-grad" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* stack */}
              <div className="mb-8">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[2px] text-mint">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack?.map((s) => (
                    <span key={s} className="rounded-full border border-line bg-accent/10 px-3 py-1 text-xs text-[#c6d2f2]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* links */}
              <div className="flex gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full border border-line bg-white/5 py-2.5 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5"
                >
                  View Code ↗
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-full bg-grad py-2.5 text-center text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,99,240,0.35)] transition-transform hover:-translate-y-0.5"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ProjectDrawer({ project, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(<DrawerInner project={project} onClose={onClose} />, document.body);
}
