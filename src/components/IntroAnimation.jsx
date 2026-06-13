'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DL lettermark intro — plays once per browser session.
 * Portaled via fixed positioning at z-[99999].
 */
export default function IntroAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return;
    if (sessionStorage.getItem('dl-intro')) return;
    setShow(true);
    const t = setTimeout(() => {
      sessionStorage.setItem('dl-intro', '1');
      setShow(false);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--color-bg)',
          }}
        >
          <div className="flex items-end gap-0 select-none">
            {/* D */}
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.21, 0.65, 0.32, 0.99] }}
              className="font-display text-[5rem] font-bold leading-none text-ink"
            >
              D
            </motion.span>
            {/* L — slight delay */}
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.21, 0.65, 0.32, 0.99] }}
              className="font-display text-[5rem] font-bold leading-none text-grad"
            >
              L
            </motion.span>
          </div>

          {/* progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-grad"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
