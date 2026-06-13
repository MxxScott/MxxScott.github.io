'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [tabindex]';

/**
 * Custom cursor — replaces the OS pointer entirely.
 *
 * Two layers:
 *   dot  — 8px filled circle, tracks instantly (feels snappy)
 *   ring — 34px outline circle, spring-follows with a lag (feels alive)
 *
 * On hover over interactive elements:
 *   dot  → shrinks + hidden
 *   ring → expands to 52px, fills with accent/15
 *
 * Everything is driven by rAF with ref-based state to avoid
 * React re-renders inside the animation loop.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Raw target position (set on mousemove — instant)
    let tx = -200, ty = -200;
    // Spring position for the ring
    let rx = -200, ry = -200;
    let hovering = false;
    let raf;

    // Hide OS cursor
    document.documentElement.style.cursor = 'none';

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        if (!hovering) {
          hovering = true;
          applyHover(dot, ring, true);
        }
      }
    };

    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        if (hovering) {
          hovering = false;
          applyHover(dot, ring, false);
        }
      }
    };

    const tick = () => {
      // dot tracks instantly
      dot.style.transform = `translate(${tx}px, ${ty}px)`;

      // ring spring follows
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout',  onOut,  { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      {/* inner dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 999999,
          pointerEvents: 'none',
          willChange: 'transform',
          /* centering handled by negative margin */
          width: 8, height: 8,
          marginLeft: -4, marginTop: -4,
          borderRadius: '50%',
          background: '#2f63f0',
          transition: 'width 0.18s, height 0.18s, margin 0.18s, opacity 0.18s',
          mixBlendMode: 'screen',
        }}
      />

      {/* outer ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 999998,
          pointerEvents: 'none',
          willChange: 'transform',
          width: 34, height: 34,
          marginLeft: -17, marginTop: -17,
          borderRadius: '50%',
          border: '1.5px solid rgba(47,99,240,0.75)',
          background: 'transparent',
          transition:
            'width 0.22s cubic-bezier(0.34,1.56,0.64,1), height 0.22s cubic-bezier(0.34,1.56,0.64,1), margin 0.22s cubic-bezier(0.34,1.56,0.64,1), background 0.18s, border-color 0.18s',
        }}
      />
    </>
  );
}

/** Directly mutates DOM styles — keeps hover changes out of the rAF loop */
function applyHover(dot, ring, on) {
  if (on) {
    // dot shrinks away
    dot.style.width    = '4px';
    dot.style.height   = '4px';
    dot.style.marginLeft  = '-2px';
    dot.style.marginTop   = '-2px';
    dot.style.opacity  = '0';
    // ring expands + fills
    ring.style.width   = '52px';
    ring.style.height  = '52px';
    ring.style.marginLeft = '-26px';
    ring.style.marginTop  = '-26px';
    ring.style.background = 'rgba(47,99,240,0.12)';
    ring.style.borderColor = 'rgba(91,130,255,0.9)';
  } else {
    dot.style.width   = '8px';
    dot.style.height  = '8px';
    dot.style.marginLeft = '-4px';
    dot.style.marginTop  = '-4px';
    dot.style.opacity = '1';
    ring.style.width  = '34px';
    ring.style.height = '34px';
    ring.style.marginLeft = '-17px';
    ring.style.marginTop  = '-17px';
    ring.style.background = 'transparent';
    ring.style.borderColor = 'rgba(47,99,240,0.75)';
  }
}
