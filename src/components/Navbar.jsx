'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const LINKS = [
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
];

function MobileSidebar({ open, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ zIndex: 9998 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Sidebar panel */}
          <motion.div
            key="sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{ zIndex: 9999 }}
            className="fixed right-0 top-0 flex h-full w-72 flex-col bg-card border-l border-line"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <a
                href="#top"
                onClick={onClose}
                className="font-display text-lg font-bold tracking-wide"
              >
                David<span className="text-grad">Lawal</span>
              </a>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1 px-4 py-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05 }}
                  className="rounded-xl px-4 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            {/* Footer CTA */}
            <div className="mt-auto border-t border-line px-6 py-6">
              <a
                href="/David-Lawal-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="block w-full rounded-full bg-grad py-3 text-center text-sm font-semibold text-white"
              >
                Download CV ↓
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <>
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

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {LINKS.slice(0, 3).map((l) => (
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
              className="rounded-full bg-grad px-5 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Contact
            </a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="flex flex-col gap-[5px] md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="h-[2px] w-6 rounded-full bg-ink" />
            <span className="h-[2px] w-4 rounded-full bg-ink" />
            <span className="h-[2px] w-6 rounded-full bg-ink" />
          </button>
        </div>
      </nav>

      <MobileSidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
