import { useEffect, useMemo, useRef } from 'react';

// Global custom cursor:
//   • dot   — snaps to the real pointer position
//   • ring  — trails the dot with a linear-interp ease (smooth follow)
//   • trail — N small dots chasing the ring with progressively softer easing
// Everything renders pointer-events:none at a high z-index.
// Guarded with (pointer: fine) so touch devices skip the RAF loop entirely.

const TRAIL_LEN = 7;

export default function CustomCursor() {
  const outlineRef = useRef(null);
  const dotRef     = useRef(null);
  const trailRefs  = useRef([]);

  // live pointer position + eased positions
  const mouse    = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const trails   = useRef(
    Array.from({ length: TRAIL_LEN }, () => ({ x: 0, y: 0 }))
  );

  // Pre-compute per-trail easing + styling so the tail tapers smoothly
  const trailStyles = useMemo(
    () => Array.from({ length: TRAIL_LEN }, (_, i) => {
      const t = (i + 1) / (TRAIL_LEN + 1); // 0.125 … 0.875
      return {
        ease: 0.22 - i * 0.025, // leader catches up faster than tail
        size: Math.max(2, 6 - i * 0.6),
        opacity: 0.55 * (1 - t),
      };
    }),
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onDown = () => {
      outlineRef.current?.classList.add('cursor--active');
      dotRef.current?.classList.add('cursor--active');
    };
    const onUp = () => {
      outlineRef.current?.classList.remove('cursor--active');
      dotRef.current?.classList.remove('cursor--active');
    };

    const interactiveSel = 'a, button, [role="button"], input, textarea, label, select, summary';
    const onOver = (e) => {
      if (e.target.closest?.(interactiveSel)) {
        outlineRef.current?.classList.add('cursor--hover');
      }
    };
    const onOut = (e) => {
      if (e.target.closest?.(interactiveSel)) {
        outlineRef.current?.classList.remove('cursor--hover');
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);

    let raf;
    const tick = () => {
      // ring eases toward the pointer
      position.current.x += (mouse.current.x - position.current.x) * 0.14;
      position.current.y += (mouse.current.y - position.current.y) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
      }

      // trail: each dot eases toward the one in front of it
      let prev = position.current;
      for (let i = 0; i < TRAIL_LEN; i++) {
        const t = trails.current[i];
        const style = trailStyles[i];
        t.x += (prev.x - t.x) * style.ease;
        t.y += (prev.y - t.y) * style.ease;
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) translate(-50%, -50%)`;
        }
        prev = t;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [trailStyles]);

  return (
    <>
      {/* tail (rendered first so ring + dot sit on top) */}
      {trailStyles.map((s, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="custom-cursor custom-cursor--trail"
          aria-hidden="true"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
          }}
        />
      ))}
      <div ref={outlineRef} className="custom-cursor custom-cursor--outline" aria-hidden="true" />
      <div ref={dotRef}     className="custom-cursor custom-cursor--dot"     aria-hidden="true" />
    </>
  );
}
