'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlowItem } from './Flow';
import data from '@/data/projects.json';
import AllProjectsOverlay from './AllProjectsOverlay';

const DIRS = ['left', 'up', 'right'];

function ProjectCard({ p, i }) {
  return (
    <FlowItem from={DIRS[i % 3]} order={3 + Math.floor(i / 3)}>
      <motion.article
        whileHover={{ y: -6 }}
        className="card group relative flex h-full flex-col overflow-hidden p-5"
      >
        {/* top accent bar */}
        <span className="absolute inset-x-0 top-0 h-[2px] bg-grad opacity-0 transition-opacity group-hover:opacity-100" />

        {/* flagship ribbon */}
        {p.flag === 'FLAGSHIP' && (
          <span className="absolute -right-9 top-4 rotate-45 bg-grad px-10 py-0.5 text-[9px] font-bold tracking-wider text-white">
            FLAGSHIP
          </span>
        )}

        <div className="mb-3 flex items-center justify-between">
          <span className="text-2xl">{p.emoji}</span>
          <span className="flex gap-3 text-xs">
            {p.homepage && (
              <a
                href={p.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-ink"
              >
                Live ↗
              </a>
            )}
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-ink"
            >
              Code ↗
            </a>
          </span>
        </div>

        <h3 className="font-display mb-1.5 text-base font-semibold leading-snug">{p.title}</h3>
        <p className="mb-4 flex-1 text-xs leading-relaxed text-muted">{p.blurb}</p>

        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line bg-accent/10 px-2.5 py-0.5 text-[10px] text-[#c6d2f2]"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.article>
    </FlowItem>
  );
}

export default function Projects() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const featured = data.featured ?? [];

  return (
    <>
      <section className="section-scroll h-full overflow-y-auto">
        <div className="flex min-h-full items-center px-6 py-12">
          <div className="mx-auto w-full max-w-6xl">
            <FlowItem from="left" order={0}>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-mint">Projects</p>
            </FlowItem>
            <FlowItem from="left" order={1}>
              <h2 className="font-display mb-3 text-3xl font-bold md:text-4xl">Selected work</h2>
            </FlowItem>
            <FlowItem from="left" order={2}>
              <p className="mb-8 max-w-2xl text-sm text-muted">
                Modern framework apps, complete business sites, and systems-level tooling. Card data
                is generated at build time by a Python pipeline hitting the GitHub API.
              </p>
            </FlowItem>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <ProjectCard key={p.url} p={p} i={i} />
              ))}
            </div>

            <FlowItem from="up" order={8}>
              <div className="mt-10 flex justify-center">
                <motion.button
                  onClick={() => setOverlayOpen(true)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 py-2.5 text-sm font-semibold text-[#c6d2f2] transition-colors hover:border-accent hover:bg-accent/20"
                >
                  View all projects
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </motion.button>
              </div>
            </FlowItem>
          </div>
        </div>
      </section>

      <AllProjectsOverlay
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
      />
    </>
  );
}
