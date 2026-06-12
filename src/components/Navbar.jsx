'use client';

import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-grad"
        style={{ scaleX: progress }}
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-xl font-bold tracking-wide">
          David<span className="text-grad">Lawal</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-grad px-5 py-2 text-sm font-semibold text-[#06121a] transition-transform hover:-translate-y-0.5"
          >
            Contact
          </a>
        </div>

        <button
          className="flex flex-col gap-[5px] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`h-[2px] w-6 bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-[2px] w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] w-6 bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        className="overflow-hidden border-line bg-bg/95 md:hidden"
      >
        <div className="flex flex-col items-center gap-1 pb-4">
          {[...LINKS, { href: '#contact', label: 'Contact' }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="w-full py-3 text-center text-sm font-medium text-muted hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
