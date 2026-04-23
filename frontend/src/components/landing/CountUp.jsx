import { useEffect, useRef, useState } from 'react';
import { isAppReady, onAppReady } from '../../utils/appReady';

// Eased count-up number that:
//   • waits for the app's opening splash to finish before it starts observing
//   • replays on every fresh scroll-in (leaves → re-enters resets & re-runs)
// Props:
//   end        — final numeric value
//   decimals   — fractional digits for the default formatter
//   suffix     — string appended after the number ("+", "k+", etc.)
//   durationMs — total animation time
//   format     — optional (value) => string (overrides toFixed path)
export default function CountUp({
  end,
  decimals = 0,
  suffix = '',
  durationMs = 1400,
  format,
}) {
  const [value, setValue] = useState(0);
  const hostRef = useRef(null);
  const rafRef  = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = hostRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(end);
      return;
    }

    const animate = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const startTs = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - startTs) / durationMs);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(end * eased);
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
        else setValue(end);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    let observer;
    const attachObserver = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Fresh run whenever the stat scrolls into view
            animate();
          } else {
            // Leaving view — stop any in-flight animation and reset to 0
            // so the next re-entry reads as a new count-up.
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            setValue(0);
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
    };

    let unsubReady = () => {};
    if (isAppReady()) {
      attachObserver();
    } else {
      // Keep the number at 0 while the splash is on; only start observing
      // once the app signals ready.
      setValue(0);
      unsubReady = onAppReady(attachObserver);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer?.disconnect();
      unsubReady();
    };
  }, [end, durationMs]);

  const display = format ? format(value) : value.toFixed(decimals);

  return (
    <span ref={hostRef}>
      {display}
      {suffix}
    </span>
  );
}
