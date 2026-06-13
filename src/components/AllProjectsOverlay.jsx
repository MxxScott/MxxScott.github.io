'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import fallbackData from '@/data/projects.json';

/* ─── constants ─────────────────────────────────────────────────────────── */

const USERNAME = 'MxxScott';
const EXCLUDE = new Set([`${USERNAME}.github.io`, 'Hello-World', 'Test-Repo']);

const EMOJI_BY_LANG = {
  JavaScript: '🟨', TypeScript: '🔷', Vue: '💚', Python: '🐍',
  C: '⚙️', 'C++': '⚙️', HTML: '🌐', CSS: '🎨', Assembly: '🔩',
  Java: '☕', 'C#': '🟣', Ruby: '🔴', Go: '🐹', Rust: '🦀', Kotlin: '🟠',
};

const CURATED = {
  'roar-frontend': {
    title: 'Roar — Article Builder', emoji: '🦁',
    blurb: 'A content-creation platform frontend with a mobile-friendly article builder and a fully reworked UI system.',
    stack: ['Next.js 15', 'React 19', 'Tailwind 4', 'Framer Motion', 'TypeScript'],
  },
  Onlearn: {
    title: 'Onlearn — E-Learning Platform', emoji: '🎓',
    blurb: 'A fully responsive landing experience for an online learning platform, documented like production code.',
    stack: ['Nuxt', 'Vue 3', 'Tailwind', 'TypeScript'],
  },
  'Wings-Height-Insurance-Brokers-Limited': {
    title: 'Wings Height Insurance Brokers', emoji: '🏢',
    blurb: 'A complete multi-page corporate website — quotes, claims, bookings and service pages.',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
  },
  Anime_Abyss: {
    title: 'Anime Abyss', emoji: '🌊',
    blurb: 'An anime discovery homepage with custom styling on a modern Nuxt 4 foundation.',
    stack: ['Nuxt 4', 'Vue 3', 'Tailwind'],
  },
  'Maneyger-7.0': {
    title: 'Maneyger 7.0', emoji: '💰',
    blurb: 'A personal finance manager with hand-built UI logic in vanilla JavaScript.',
    stack: ['JavaScript', 'Bootstrap', 'CSS'],
  },
  'Inventory-Management-System': {
    title: 'Inventory Manager CLI', emoji: '📦',
    blurb: 'A stateful command-line inventory tracker — full CRUD, documented through every SDLC phase.',
    stack: ['Python', 'CLI', 'SDLC Docs'],
  },
  FusionOCR: {
    title: 'FusionOCR', emoji: '🔬',
    blurb: 'Multi-engine OCR pipeline for children\'s handwritten English — fuses TrOCR, EasyOCR, and Tesseract via weighted Levenshtein consensus. Powers Verdikt.',
    stack: ['Python', 'TrOCR', 'EasyOCR', 'OpenCV', 'HuggingFace'],
  },
  Verdikt: {
    title: 'Verdikt', emoji: '⚖️',
    blurb: 'AI-powered exam script marking — transcribe handwritten scripts, verify accuracy with a vision LLM, then mark each answer against a mark scheme.',
    stack: ['Python', 'Ollama', 'LLaVA', 'llama3.2', 'FusionOCR'],
  },
  'terminal-games-cpp': {
    title: 'Terminal Games (C++)', emoji: '🕹️',
    blurb: 'Snake and Pac-Man built from scratch in C++ for the terminal — game loops, grid collision, and ghost AI with no external libraries.',
    stack: ['C++', 'Terminal', 'Game Loop', 'AI'],
  },
};

function repoToCard(r) {
  const c = CURATED[r.name] ?? {};
  const lang = r.language ?? '';
  const topics = (r.topics ?? []).filter((t) => !t.startsWith('portfolio-'));
  const rawStack = lang ? [lang, ...topics.slice(0, 3)] : topics.slice(0, 4);
  return {
    name: r.name,
    title: c.title ?? r.name.replace(/[-_]/g, ' '),
    emoji: c.emoji ?? (EMOJI_BY_LANG[lang] ?? '📁'),
    blurb: c.blurb ?? r.description ?? '',
    stack: c.stack ?? rawStack,
    url: r.html_url,
    homepage: r.homepage || null,
    language: lang,
    stars: r.stargazers_count ?? 0,
    pushedAt: r.pushed_at ?? null,
  };
}

async function fetchAllRepos() {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed&type=owner`,
    { headers: { Accept: 'application/vnd.github+json' } },
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const repos = await res.json();
  return repos
    .filter((r) => !r.fork && !r.archived && !EXCLUDE.has(r.name) && !(r.topics ?? []).includes('portfolio-hide'))
    .map(repoToCard);
}

/* ─── skeleton ──────────────────────────────────────────────────────────── */

function SkeletonCard() {
  return (
    <div className="card flex animate-pulse flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <div className="h-7 w-7 rounded-md bg-line" />
        <div className="h-3 w-12 rounded bg-line" />
      </div>
      <div className="h-4 w-3/4 rounded bg-line" />
      <div className="h-3 w-full rounded bg-line" />
      <div className="h-3 w-5/6 rounded bg-line" />
      <div className="mt-auto flex gap-1.5 pt-2">
        <div className="h-4 w-14 rounded-full bg-line" />
        <div className="h-4 w-16 rounded-full bg-line" />
        <div className="h-4 w-10 rounded-full bg-line" />
      </div>
    </div>
  );
}

/* ─── repo card ─────────────────────────────────────────────────────────── */

function RepoCard({ p }) {
  const ago = useMemo(() => {
    if (!p.pushedAt) return null;
    const days = Math.floor((Date.now() - new Date(p.pushedAt)) / 86400000);
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
  }, [p.pushedAt]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      className="card group relative flex flex-col gap-2 overflow-hidden p-5"
    >
      <span className="absolute inset-x-0 top-0 h-[2px] bg-grad opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-2">
        <span className="text-xl leading-none">{p.emoji}</span>
        <span className="flex shrink-0 items-center gap-3 text-xs text-muted">
          {p.stars > 0 && <span>★ {p.stars}</span>}
          {p.homepage && (
            <a href={p.homepage} target="_blank" rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
              onClick={(e) => e.stopPropagation()}>
              Live ↗
            </a>
          )}
          <a href={p.url} target="_blank" rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
            onClick={(e) => e.stopPropagation()}>
            Code ↗
          </a>
        </span>
      </div>

      <h3 className="font-display text-sm font-semibold leading-snug">{p.title}</h3>

      {p.blurb
        ? <p className="flex-1 text-xs leading-relaxed text-muted line-clamp-3">{p.blurb}</p>
        : <p className="flex-1 text-xs italic text-muted/50">No description</p>
      }

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
        {p.stack.map((s) => (
          <span key={s} className="rounded-full border border-line bg-accent/10 px-2 py-0.5 text-[10px] text-[#c6d2f2]">
            {s}
          </span>
        ))}
        {ago && <span className="ml-auto text-[10px] text-muted/60">{ago}</span>}
      </div>
    </motion.article>
  );
}

/* ─── overlay (portaled to document.body) ──────────────────────────────── */

function OverlayContent({ open, onClose }) {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState('All');

  useEffect(() => {
    if (!open || status !== 'idle') return;
    setStatus('loading');
    fetchAllRepos()
      .then((cards) => { setRepos(cards); setStatus('done'); })
      .catch(() => { setRepos(fallbackData.all ?? []); setStatus('done'); });
  }, [open, status]);

  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  const langs = useMemo(() => {
    const s = new Set(repos.map((r) => r.language).filter(Boolean));
    return ['All', ...Array.from(s).sort()];
  }, [repos]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return repos.filter((r) => {
      if (lang !== 'All' && r.language !== lang) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.blurb.toLowerCase().includes(q) ||
        r.stack.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [repos, query, lang]);

  const isLoading = status === 'loading';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="all-projects-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          /* Portal renders directly on body — no stacking context traps */
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(10,13,22,0.97)',
            backdropFilter: 'blur(14px)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}
        >
          {/* header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.06 }}
            style={{ flexShrink: 0, borderBottom: '1px solid var(--color-line)', padding: '20px 24px 16px' }}
            className="flex flex-wrap items-center gap-3"
          >
            {/* back */}
            <button
              onClick={onClose}
              className="group flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-muted transition-all hover:border-accent hover:text-ink"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Back
            </button>

            {/* title */}
            <div className="mr-auto">
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[3px] text-mint">All projects</p>
              <h2 className="font-display text-lg font-bold leading-none text-ink">
                {isLoading
                  ? <span className="inline-block h-5 w-24 animate-pulse rounded bg-line" />
                  : `${filtered.length} repo${filtered.length !== 1 ? 's' : ''}`
                }
              </h2>
            </div>

            {/* search */}
            <input
              type="search"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-44 rounded-lg border border-line bg-card px-3 py-1.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />

            {/* lang chips */}
            {!isLoading && (
              <div className="flex flex-wrap gap-1.5">
                {langs.map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      lang === l
                        ? 'border-accent bg-accent/20 text-[#c6d2f2]'
                        : 'border-line text-muted hover:border-accent/50 hover:text-ink'
                    }`}>
                    {l}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* grid */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading
                ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
                : filtered.length > 0
                  ? filtered.map((p) => <RepoCard key={p.url} p={p} />)
                  : <div className="col-span-full py-20 text-center text-muted">No projects match your search.</div>
              }
            </div>
          </div>

          {/* footer */}
          {status === 'done' && (
            <div className="shrink-0 border-t border-line px-6 py-2 text-center text-[10px] text-muted/50">
              Live from GitHub · add topic <code className="font-mono">portfolio-hide</code> to any repo to exclude it
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AllProjectsOverlay({ open, onClose }) {
  // createPortal needs the DOM — guard against SSR/static build
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <OverlayContent open={open} onClose={onClose} />,
    document.body,
  );
}
