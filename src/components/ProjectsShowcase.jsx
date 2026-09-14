'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import data from '@/data/projects.json';
import AllProjectsOverlay from './AllProjectsOverlay';
import ProjectArtwork from './ProjectArtwork';
import ProjectDrawer from './ProjectDrawer';

function Card({ p, i, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.21, 0.65, 0.32, 0.99] }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(p)}
      className="card card-lift group relative flex cursor-pointer flex-col overflow-hidden p-5"
    >
      <span className="absolute inset-x-0 top-0 z-10 h-[2px] bg-grad opacity-0 transition-opacity group-hover:opacity-100" />
      {p.flag === 'FLAGSHIP' && (
        <span className="absolute -right-9 top-4 z-10 rotate-45 bg-grad px-10 py-0.5 text-[9px] font-bold tracking-wider text-white">
          FLAGSHIP
        </span>
      )}

      <div className="-mx-5 -mt-5 mb-4 aspect-video overflow-hidden border-b border-line">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProjectArtwork project={p} className="h-full w-full" />
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <span className="text-2xl">{p.emoji}</span>
        <span className="flex gap-3 text-xs">
          {p.homepage && (
            <a href={p.homepage} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} className="text-muted transition-colors hover:text-ink">
              Live ↗
            </a>
          )}
          <a href={p.url} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} className="text-muted transition-colors hover:text-ink">
            Code ↗
          </a>
        </span>
      </div>

      <h3 className="font-display mb-1.5 text-base font-semibold leading-snug">{p.title}</h3>
      <p className="mb-4 flex-1 text-xs leading-relaxed text-muted">{p.blurb}</p>

      <div className="flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span key={s} className="rounded-full border border-line bg-accent/10 px-2.5 py-0.5 text-[10px] text-[#c6d2f2]">
            {s}
          </span>
        ))}
      </div>

      <p className="mt-3 text-[10px] text-muted/50 transition-colors group-hover:text-muted">Click for details →</p>
    </motion.article>
  );
}

export default function ProjectsShowcase() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [drawerProject, setDrawerProject] = useState(null);
  const featured = data.featured ?? [];

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-20">
        <a href="/" className="link-underline text-sm text-muted transition-colors hover:text-ink">← Back home</a>

        <p className="eyebrow mt-8"><span className="num">04</span>&nbsp;Projects</p>
        <h1 className="display-sm mb-3 mt-4">Selected work.</h1>
        <p className="mb-12 max-w-2xl text-muted">
          Framework apps, complete business sites and systems-level tooling. Featured cards are
          generated at build time by a Python pipeline hitting the GitHub API — click any card for
          details, or browse the full repository list live.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Card key={p.url} p={p} i={i} onOpen={setDrawerProject} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <motion.button
            onClick={() => setOverlayOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 py-2.5 text-sm font-semibold text-[#c6d2f2] transition-colors hover:border-accent hover:bg-accent/20"
          >
            Browse all repositories
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.button>
        </div>
      </section>

      <AllProjectsOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)} />
      <ProjectDrawer project={drawerProject} onClose={() => setDrawerProject(null)} />
    </>
  );
}
