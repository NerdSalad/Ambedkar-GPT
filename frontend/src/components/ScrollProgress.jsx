import { useEffect, useRef } from 'react';

// Thin gradient bar pinned to the top of the viewport. Scales horizontally
// (transform: scaleX) with how far the user has scrolled. Uses rAF + ref so
// React never re-renders on scroll.
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!barRef.current) return;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      barRef.current.style.transform = `scaleX(${pct})`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        background:
          'linear-gradient(90deg, #3f9fff 0%, #7b5cff 50%, #3f9fff 100%)',
        boxShadow: '0 0 12px rgba(63,159,255,0.55)',
        transform: 'scaleX(0)',
        willChange: 'transform',
      }}
      ref={barRef}
    />
  );
}
