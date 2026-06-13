'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FlowItem } from './Flow';

export default function Hero() {
  const { scrollY } = useScroll();
  const hintOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <header className="relative flex h-full items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-4xl px-6 text-center">

        {/* open-to-work badge */}
        <FlowItem order={0} from="up">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-mint">
              Frontend Engineer
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
              {/* pulsing green dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for opportunities
            </span>
          </div>
        </FlowItem>

        <FlowItem order={1} from="up">
          <h1 className="font-display mb-5 text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl">
            I build <span className="text-grad">professional, immersive</span> web experiences.
          </h1>
        </FlowItem>

        <FlowItem order={2} from="up">
          <p className="mx-auto mb-9 max-w-xl text-base text-muted md:text-lg">
            Specializing in Nuxt, React, and interactive 3D interfaces — with a systems
            foundation in Python, C, and C++.
          </p>
        </FlowItem>

        <FlowItem order={3} from="up">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-grad px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(47,99,240,0.4)] transition-transform hover:-translate-y-0.5"
            >
              View My Work
            </a>
            <a
              href="/David-Lawal-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line bg-white/5 px-8 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            >
              Download CV ↓
            </a>
            <a
              href="https://github.com/MxxScott"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line bg-white/5 px-8 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            >
              GitHub ↗
            </a>
          </div>
        </FlowItem>
      </div>

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
