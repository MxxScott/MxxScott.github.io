'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FlowItem } from './Flow';

const MARQUEE = [
  'Nuxt', 'React', 'Next.js', 'TypeScript', 'Three.js / R3F',
  'Tailwind', 'Framer Motion', 'Python', 'C / C++', 'Node.js',
];

export default function Hero() {
  const { scrollY } = useScroll();
  const hintOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <header className="relative flex h-full flex-col items-center justify-center overflow-hidden">
      {/* cinematic framing — spotlight on the 3D core + legibility gradient */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[82vmin] w-[82vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,99,240,0.20),transparent_62%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg via-bg/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-bg/80 to-transparent" />
      </div>

      {/* editorial corner meta (desktop) */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
        <span className="absolute left-8 top-28 text-[11px] uppercase tracking-[0.32em] text-muted">
          Portfolio — &rsquo;26
        </span>
        <span className="absolute right-8 top-28 text-right text-[11px] uppercase leading-relaxed tracking-[0.32em] text-muted">
          6.52&deg;N · 3.38&deg;E<br />Lagos, NG
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        <FlowItem order={0} from="up">
          <div className="mb-7 flex flex-wrap items-center justify-center gap-4">
            <span className="eyebrow"><span className="num">01</span>&nbsp;Frontend Engineer</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for work
            </span>
          </div>
        </FlowItem>

        <FlowItem order={1} from="up" blur>
          <h1 className="display mb-7">
            I build <span className="text-grad-iris">immersive</span>,<br className="hidden sm:block" />
            production-grade <span className="text-grad">web</span>.
          </h1>
        </FlowItem>

        <FlowItem order={2} from="up">
          <p className="mx-auto mb-10 max-w-xl text-base text-muted md:text-lg">
            I design and ship complete, polished interfaces in Nuxt and React/Next.js —
            including interactive 3D — on a systems foundation of Python, C and C++.
          </p>
        </FlowItem>

        <FlowItem order={3} from="up">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#projects" className="btn-primary">
              View My Work <span aria-hidden>→</span>
            </a>
            <a href="/David-Lawal-Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Download CV <span aria-hidden>↓</span>
            </a>
            <a href="https://github.com/MxxScott" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              GitHub <span aria-hidden>↗</span>
            </a>
          </div>
        </FlowItem>
      </div>

      {/* kinetic tech marquee */}
      <FlowItem order={4} from="up" className="relative z-10 mt-16 w-full">
        <div className="marquee w-full border-y border-line bg-white/[0.015] py-3">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} className="mx-6 inline-flex items-center gap-6 text-sm font-medium uppercase tracking-[0.18em] text-muted">
                {t}<span className="text-accent/60" aria-hidden>✦</span>
              </span>
            ))}
          </div>
        </div>
      </FlowItem>

      <motion.div
        style={{ opacity: hintOpacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[3px] text-muted"
      >
        SCROLL ▾
      </motion.div>
    </header>
  );
}
