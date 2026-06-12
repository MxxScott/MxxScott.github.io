'use client';

import { createContext, useContext, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const FlowCtx = createContext(null);

/**
 * Page-transition scroll system with a persistent background.
 *
 * Each FlowSection is a tall scroll region with a full-viewport panel pinned
 * inside it. The panel itself never visibly moves — instead its elements
 * (FlowItems) slide/fade IN as the section arrives, HOLD while you keep
 * scrolling (the dwell), then slide/fade OUT before the next section's
 * elements arrive. The fixed site background stays put throughout, so it
 * reads as elements leaving and a new "page" assembling.
 *
 * Phase map (section progress 0→1):
 *   enter 0.30→0.52 · hold 0.52→0.86 (the dwell) · exit 0.86→1
 */
export function FlowSection({ id, children, first = false, last = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  // spring-smoothed so transitions glide instead of tracking raw scroll
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const height = first ? 'h-[170vh]' : last ? 'h-[150vh]' : 'h-[200vh]';

  return (
    <div id={id} ref={ref} className={`relative ${height}`}>
      <div className="sticky top-0 h-screen overflow-hidden supports-[height:100svh]:h-svh">
        <FlowCtx.Provider value={{ progress, first, last }}>{children}</FlowCtx.Provider>
      </div>
    </div>
  );
}

const DIRS = {
  up: { enter: { x: 0, y: 56 }, exit: { x: 0, y: -56 } },
  down: { enter: { x: 0, y: -56 }, exit: { x: 0, y: 56 } },
  left: { enter: { x: -72, y: 0 }, exit: { x: 72, y: 0 } },
  right: { enter: { x: 72, y: 0 }, exit: { x: -72, y: 0 } },
};

/**
 * An element that flows with its section: slides in from `from`, dwells,
 * then continues out the other side. `order` staggers siblings.
 */
export function FlowItem({ children, from = 'up', order = 0, className = '' }) {
  const { progress, first, last } = useContext(FlowCtx);
  const d = DIRS[from] ?? DIRS.up;
  const o = Math.min(order, 6);

  const e0 = 0.3 + o * 0.018;
  const e1 = 0.52 + o * 0.018;
  const x0 = 0.86 + o * 0.012;
  const x1 = Math.min(0.97 + o * 0.005, 1);

  // Build keyframe ranges per section role (hooks must run unconditionally)
  const opacity = useTransform(
    progress,
    first ? [x0, x1] : last ? [e0, e1] : [e0, e1, x0, x1],
    first ? [1, 0] : last ? [0, 1] : [0, 1, 1, 0]
  );
  const x = useTransform(
    progress,
    first ? [x0, x1] : last ? [e0, e1] : [e0, e1, x0, x1],
    first ? [0, d.exit.x] : last ? [d.enter.x, 0] : [d.enter.x, 0, 0, d.exit.x]
  );
  const y = useTransform(
    progress,
    first ? [x0, x1] : last ? [e0, e1] : [e0, e1, x0, x1],
    first ? [0, d.exit.y] : last ? [d.enter.y, 0] : [d.enter.y, 0, 0, d.exit.y]
  );

  if (first) {
    // First section: entrance is a mount animation; scroll only drives the exit
    return (
      <motion.div style={{ opacity, x, y }} className={className}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 + order * 0.12, ease: [0.21, 0.65, 0.32, 0.99] }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ opacity, x, y }} className={className}>
      {children}
    </motion.div>
  );
}
