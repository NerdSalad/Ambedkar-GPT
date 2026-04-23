import { useEffect, useRef, useState } from 'react';

// eased count-up number that starts when the element first enters the viewport.
//   end       — final numeric value
//   decimals  — fractional digits to render (0 by default)
//   suffix    — string appended to the rendered number ("+", "k+", etc.)
//   durationMs — total animation time
//   format    — optional (value) => string — overrides the default toFixed path
export default function CountUp({
  end,
  decimals = 0,
  suffix = '',
  durationMs = 1400,
  format,
}) {
  const [value, setValue] = useState(0);
  const hostRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = hostRef.current;
    if (!el) return;

    const runAnimation = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const startTs = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - startTs) / durationMs);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(end * eased);
        if (t < 1) requestAnimationFrame(tick);
        else setValue(end);
      };
      requestAnimationFrame(tick);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setValue(end);
      startedRef.current = true;
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, durationMs]);

  const display = format
    ? format(value)
    : value.toFixed(decimals);

  return (
    <span ref={hostRef}>
      {display}
      {suffix}
    </span>
  );
}
