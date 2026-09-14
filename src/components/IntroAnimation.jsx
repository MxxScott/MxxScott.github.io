'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function IntroAnimation() {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return undefined;
    if (sessionStorage.getItem('dl-intro')) return undefined;

    setShow(true);
    const duration = reduceMotion ? 350 : 1650;
    const timer = setTimeout(() => {
      sessionStorage.setItem('dl-intro', '1');
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [reduceMotion]);

  const transition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.8, ease };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.01 : 0.35 } }}
          className="fixed inset-0 z-[99999] overflow-hidden bg-[#060914] text-ink"
          aria-label="Loading David Lawal portfolio"
          role="status"
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(126,168,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(126,168,255,.08) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse at center, black, transparent 72%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.9, ease }}
            className="absolute left-1/2 top-1/2 h-[min(46vw,28rem)] w-[min(46vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7ea8ff]/20 shadow-[0_0_100px_rgba(47,99,240,0.18)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.18 }}
            className="absolute left-6 top-6 text-[9px] font-semibold uppercase tracking-[0.35em] text-white/45 sm:left-10 sm:top-10"
          >
            Portfolio / 2026
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.25 }}
            className="absolute right-6 top-6 text-right text-[9px] font-semibold uppercase tracking-[0.35em] text-white/45 sm:right-10 sm:top-10"
          >
            Frontend<br />Engineering
          </motion.div>

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 1.12, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.75, ease }}
              className="font-display text-[clamp(5rem,16vw,10rem)] font-bold leading-[0.8] tracking-[-0.13em] text-white"
            >
              <span>D</span><span className="text-[#9bb5ff]">L</span>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.55, delay: reduceMotion ? 0 : 0.35, ease }}
              className="mt-7 h-px w-28 origin-center bg-[#7ea8ff]/70"
            />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: reduceMotion ? 0 : 0.42 }}
              className="mt-4 text-[10px] font-semibold uppercase tracking-[0.55em] text-white/60"
            >
              David Lawal
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 1.15, delay: reduceMotion ? 0 : 0.42, ease }}
            className="absolute left-1/2 top-0 h-full w-px origin-top bg-[#7ea8ff]/30"
          />

          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.72, delay: reduceMotion ? 0 : 0.92, ease }}
            className="absolute inset-x-0 top-0 h-1/2 border-b border-white/10 bg-[#060914]"
          />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: reduceMotion ? 0.01 : 0.72, delay: reduceMotion ? 0 : 0.92, ease }}
            className="absolute inset-x-0 bottom-0 h-1/2 border-t border-white/10 bg-[#060914]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
