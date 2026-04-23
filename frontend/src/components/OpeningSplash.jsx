import { useEffect, useState } from 'react';
import logoSrc from '../assets/images/logo-animation.png';
import { markAppReady } from '../utils/appReady';

// Full-viewport splash that plays on first mount, then fades out.
// Total lifecycle: ~3s
//   0.0 – 0.9s   logo drops in (scale + blur)
//   0.7 – 1.4s   AmbedkarGPT wordmark fades up
//   1.1 – 1.7s   "AI for Justice" tagline fades up
//   1.7 – 2.4s   hold
//   2.4 – 3.0s   overlay fades to 0 and unmounts
export default function OpeningSplash({ onDone }) {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'exit' | 'gone'

  useEffect(() => {
    // Respect reduced-motion — skip straight to exit
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdMs = reduce ? 400 : 2400;

    const t1 = setTimeout(() => setPhase('exit'), holdMs);
    const t2 = setTimeout(() => {
      setPhase('gone');
      markAppReady();
      onDone?.();
    }, holdMs + 600);

    // freeze background scroll while the splash is visible
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [onDone]);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#05081a] transition-opacity duration-[600ms] ease-out ${
        phase === 'exit' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(63,159,255,0.22)_0%,transparent_70%)] blur-3xl splash-glow" />

      {/* concentric expanding rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2">
        <span className="splash-ring splash-ring--1" />
        <span className="splash-ring splash-ring--2" />
        <span className="splash-ring splash-ring--3" />
      </div>

      {/* radar logo */}
      <img
        src={logoSrc}
        alt=""
        className="splash-logo relative z-10 h-40 w-40 object-contain drop-shadow-[0_0_42px_rgba(63,159,255,0.6)] md:h-56 md:w-56"
      />

      {/* wordmark */}
      <h1 className="splash-wordmark relative z-10 mt-8 font-display text-[44px] font-semibold tracking-tight text-white md:text-[72px]">
        Ambedkar<span className="gradient-text-cyan">GPT</span>
      </h1>

      {/* tagline */}
      <p className="splash-tagline relative z-10 mt-6 text-[11px] font-semibold uppercase tracking-[0.5em] text-[#7aa6e5] md:text-[13px]">
        AI for Justice
      </p>

      {/* bottom hairline shimmer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center">
        <div className="splash-bar h-[2px] w-40 rounded-full bg-[linear-gradient(90deg,transparent,rgba(63,159,255,0.8),transparent)]" />
      </div>
    </div>
  );
}
