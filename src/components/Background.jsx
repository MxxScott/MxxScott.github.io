'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useScroll } from 'framer-motion';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

/**
 * Persistent site background: the 3D scene stays fixed behind every section
 * while content flows over it. Scroll progress (whole page) drives the
 * scene's slow rotation and drift.
 */
export default function Background() {
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll();

  useEffect(
    () => scrollYProgress.on('change', (v) => (scrollRef.current = v)),
    [scrollYProgress]
  );

  return (
    <div className="fixed inset-0 z-0">
      <Scene scrollRef={scrollRef} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#0a0d16_96%)]" />
    </div>
  );
}
