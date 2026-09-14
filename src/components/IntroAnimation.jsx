'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return;
    if (sessionStorage.getItem('dl-intro')) return;

    setShow(true);
    const t = setTimeout(() => {
      sessionStorage.setItem('dl-intro', '1');
      setShow(false);
    }, 2200);

    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'radial-gradient(circle at 50% 40%, rgba(89, 120, 255, 0.16), rgba(8, 11, 19, 0.88) 36%, rgba(5, 7, 13, 1) 68%)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(99,127,255,0.20),transparent_60%)] blur-3xl"
          />

          <div className="relative flex items-end gap-0 select-none">
            <motion.span
              initial={{ opacity: 0, y: 42, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[5.5rem] font-bold leading-none tracking-[-0.08em] text-ink drop-shadow-[0_0_40px_rgba(98,126,255,0.18)] sm:text-[7rem]"
            >
              D
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 42, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[5.5rem] font-bold leading-none tracking-[-0.08em] text-grad drop-shadow-[0_0_30px_rgba(111,150,255,0.35)] sm:text-[7rem]"
            >
              L
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.45em] text-white/55"
          >
            David Lawal
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0.4 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.35, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-[#7ea8ff] to-[#2f63f0] shadow-[0_0_18px_rgba(47,99,240,0.8)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
