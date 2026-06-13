'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Soft radial gradient that follows the cursor.
 * Skipped entirely when prefers-reduced-motion is set.
 */
export default function CursorGlow() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let raf;
    let tx = -9999, ty = -9999;
    let cx = -9999, cy = -9999;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      // spring-smooth the glow position
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0"
      style={{
        width: 700,
        height: 700,
        marginLeft: -350,
        marginTop: -350,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(47,99,240,0.10) 0%, rgba(47,99,240,0.04) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}
