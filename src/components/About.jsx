'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlowItem } from './Flow';

const STATS = [
  { value: '10+', label: 'Projects shipped to GitHub' },
  { value: '2', label: 'Frameworks in production — Nuxt & Next.js' },
  { value: '5', label: 'Languages: JS/TS, Python, C, C++, Assembly' },
];

export default function About() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="section-scroll h-full overflow-y-auto">
      <div className="flex min-h-full items-center px-6 py-12">
        <div className="mx-auto w-full max-w-6xl">
          <FlowItem from="left" order={0}>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-mint">About</p>
          </FlowItem>
          <FlowItem from="left" order={1}>
            <h2 className="font-display mb-8 text-3xl font-bold md:text-4xl">
              Engineering the web, end to end.
            </h2>
          </FlowItem>

          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.6fr]">
            <FlowItem from="left" order={2}>
              <motion.div
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="group relative mx-auto w-full max-w-[270px] -rotate-2 transition-transform"
              >
                <div className="absolute -inset-1 rounded-3xl bg-grad opacity-25 blur-lg transition-opacity group-hover:opacity-50" />
                <div className="card relative overflow-hidden rounded-3xl">
                  {imgOk ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src="/portrait.webp"
                      alt="David Lawal"
                      onError={() => setImgOk(false)}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex aspect-square w-full items-center justify-center bg-bg-soft">
                      <span className="font-display text-6xl font-bold text-grad">DL</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/60 to-transparent px-5 pb-4 pt-12">
                    <p className="font-display text-lg font-semibold">David Lawal</p>
                    <p className="text-xs uppercase tracking-[2px] text-mint">Frontend Engineer</p>
                  </div>
                </div>
              </motion.div>
            </FlowItem>

            <div>
              <FlowItem from="right" order={2}>
                <p className="mb-3 text-sm text-muted md:text-base">
                  I&apos;m <strong className="font-semibold text-ink">David Lawal</strong> — a
                  frontend engineer who treats the browser as a serious engineering platform. I
                  ship <strong className="font-semibold text-ink">complete, production-style websites</strong>:
                  corporate multi-page sites and component-driven apps in{' '}
                  <strong className="font-semibold text-ink">Nuxt</strong> and{' '}
                  <strong className="font-semibold text-ink">React / Next.js</strong>, including
                  interactive 3D interfaces like this site&apos;s WebGL background.
                </p>
              </FlowItem>
              <FlowItem from="right" order={3}>
                <p className="mb-6 text-sm text-muted md:text-base">
                  Beyond JavaScript frameworks I work in{' '}
                  <strong className="font-semibold text-ink">Python, C, and C++</strong>, with
                  coursework down to{' '}
                  <strong className="font-semibold text-ink">RISC-V and MIPS assembly</strong> — so
                  I understand what happens beneath the abstractions I use every day.
                </p>
              </FlowItem>

              <div className="mb-6 grid grid-cols-3 gap-3">
                {STATS.map((s, i) => (
                  <FlowItem key={s.value} from="up" order={3 + i}>
                    <div className="card p-4">
                      <h3 className="font-display text-xl font-bold text-grad md:text-2xl">{s.value}</h3>
                      <p className="mt-1 text-[11px] leading-snug text-muted">{s.label}</p>
                    </div>
                  </FlowItem>
                ))}
              </div>

              <FlowItem from="up" order={6}>
                <div className="card flex flex-wrap items-center justify-between gap-4 p-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[2px] text-mint">Education</p>
                    <p className="mt-0.5 text-sm text-ink">
                      B.Sc. Computer Science — Caleb University, Lagos{' '}
                      <span className="text-muted">(in progress)</span>
                    </p>
                    <p className="text-xs text-muted">Prev. Lancaster University Ghana, 2023–2025</p>
                  </div>
                  <a
                    href="/David-Lawal-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line bg-white/5 px-5 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                  >
                    Download Résumé ↓
                  </a>
                </div>
              </FlowItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
