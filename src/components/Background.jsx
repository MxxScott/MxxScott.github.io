'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useScroll } from 'framer-motion';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

/**
 * Persistent site background. Renders the 3D scene fixed behind every
 * section; falls back to a static gradient for users who prefer reduced
 * motion (accessibility + battery).
 */
export default function Background() {
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(
    () => scrollYProgress.on('change', (v) => (scrollRef.current = v)),
    [scrollYProgress]
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {reducedMotion ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#16224a_0%,transparent_55%),radial-gradient(ellipse_at_75%_70%,#101a3a_0%,transparent_50%)]" />
      ) : (
        <Scene scrollRef={scrollRef} />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#0a0d16_96%)]" />
    </div>
  );
}
