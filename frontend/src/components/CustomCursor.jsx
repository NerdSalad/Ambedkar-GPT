import { useEffect, useRef } from 'react';

// Global custom cursor:
//   • dot   — snaps to the real pointer position
//   • ring  — trails the dot with a linear-interp ease (smooth follow)
// Both elements render pointer-events:none at a high z-index.
// Guarded with (pointer: fine) so touch devices skip the RAF loop entirely.
export default function CustomCursor() {
  const outlineRef = useRef(null);
  const dotRef     = useRef(null);

  const mouse    = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

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
      position.current.x += (mouse.current.x - position.current.x) * 0.14;
      position.current.y += (mouse.current.y - position.current.y) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
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
  }, []);

  return (
    <>
      <div ref={outlineRef} className="custom-cursor custom-cursor--outline" aria-hidden="true" />
      <div ref={dotRef}     className="custom-cursor custom-cursor--dot"     aria-hidden="true" />
    </>
  );
}
