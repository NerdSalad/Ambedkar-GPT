import { useEffect, useState } from 'react';
import logoSrc from '../assets/images/logo-animation.png';
import { markAppReady } from '../utils/appReady';

// Choreography (all values in ms, tuned inside index.css via keyframe %s):
//
//   0     logo fades in (scale + blur) and starts rotating forever
//   600   wordmark fades in at normal size
//   1000  wordmark scales up until it fills the screen width
//   1700  wordmark holds, huge
//   3600  wordmark shrinks back to normal size
//   4400  quote #1 fades up       ("AI for Justice")
//   4900  quote #2 fades up       ("Educate · Agitate · Organize")
//   5400  quote #3 fades up       ("Knowledge for everyone")
//   6500  overlay fades to 0
//   7100  overlay unmounts
//
// prefers-reduced-motion collapses the whole thing to ~0.6s.
const HOLD_MS  = 6500;
const TOTAL_MS = 7100;

const QUOTES = [
  'AI for Justice',
  'Educate · Agitate · Organize',
  'Knowledge for everyone',
];

export default function OpeningSplash({ onDone }) {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'exit' | 'gone'

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdMs  = reduce ? 200 : HOLD_MS;
    const totalMs = reduce ? 600 : TOTAL_MS;

    const t1 = setTimeout(() => setPhase('exit'), holdMs);
    const t2 = setTimeout(() => {
      setPhase('gone');
      markAppReady();
      onDone?.();
    }, totalMs);

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

      {/* expanding radar rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2">
        <span className="splash-ring splash-ring--1" />
        <span className="splash-ring splash-ring--2" />
        <span className="splash-ring splash-ring--3" />
      </div>

      {/* Stack: logo / wordmark / quotes */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Logo — outer element controls the entry fade/scale; inner element
            owns the infinite rotation so the entry doesn't reset the spin. */}
        <div className="splash-logo-enter">
          <div className="splash-logo-spin">
            <img
              src={logoSrc}
              alt=""
              className="h-36 w-36 object-contain drop-shadow-[0_0_42px_rgba(63,159,255,0.6)] md:h-52 md:w-52"
            />
          </div>
        </div>

        {/* Wordmark — fades in → scales up to fill width → shrinks back.
            We pin the transform-origin to the logo's center for a smooth
            grow/shrink. whitespace-nowrap keeps the text on one line while
            it's huge. */}
        <h1 className="splash-wordmark whitespace-nowrap font-display text-[42px] font-semibold tracking-tight text-white md:text-[72px]">
          Ambedkar<span className="gradient-text-cyan">GPT</span>
        </h1>

        {/* Cascading quotes — each fades up with its own delay after the
            wordmark has returned to normal size */}
        <div className="flex flex-col items-center gap-2 pt-2 text-center">
          {QUOTES.map((q, i) => (
            <p
              key={q}
              className={`splash-quote splash-quote--${i + 1} text-[12px] font-semibold uppercase tracking-[0.4em] text-[#7aa6e5] md:text-[13px]`}
            >
              {q}
            </p>
          ))}
        </div>
      </div>

      {/* bottom hairline shimmer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center">
        <div className="splash-bar h-[2px] w-40 rounded-full bg-[linear-gradient(90deg,transparent,rgba(63,159,255,0.8),transparent)]" />
      </div>
    </div>
  );
}
