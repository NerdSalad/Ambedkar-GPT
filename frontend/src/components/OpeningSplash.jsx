import { useEffect, useState } from 'react';
import logoSrc from '../assets/images/logo-animation.png';
import { markAppReady } from '../utils/appReady';

export default function OpeningSplash({ onDone }) {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'exit' | 'gone'

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdMs = reduce ? 400 : 3000;

    const t1 = setTimeout(() => setPhase('exit'), holdMs);
    const t2 = setTimeout(() => {
      setPhase('gone');
      markAppReady();
      onDone?.();
    }, holdMs + 700);

    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = prev;
    };
  }, [onDone]);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-[700ms] ease-out ${
        phase === 'exit' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #0e1d4a 0%, #080e22 45%, #04080f 100%)' }}
    >
      {/* ── Spotlight radial glow ── */}
      <div
        className="splash-glow pointer-events-none absolute left-1/2 top-[22%] h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
        style={{ background: 'radial-gradient(ellipse, rgba(30,90,210,0.45) 0%, rgba(10,40,130,0.25) 45%, transparent 75%)' }}
      />

      {/* ── Expanding rings ── */}
      <div className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2">
        <span className="splash-ring splash-ring--1" />
        <span className="splash-ring splash-ring--2" />
        <span className="splash-ring splash-ring--3" />
      </div>

      {/* ── Radar logo ── */}
      <img
        src={logoSrc}
        alt=""
        className="splash-logo relative z-10 h-20 w-20 object-contain drop-shadow-[0_0_32px_rgba(63,159,255,0.7)] md:h-28 md:w-28"
      />

      {/* ── Wordmark: AMBEDKARGPT ── */}
      <h1
        className="splash-wordmark relative z-10 mt-6 font-serif text-[52px] font-bold uppercase leading-none tracking-[0.08em] md:text-[80px] lg:text-[96px]"
        style={{
          background: 'linear-gradient(180deg, #c8deff 0%, #6aaaff 30%, #2a6fd4 65%, #0d3a8a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 28px rgba(50,120,255,0.35))',
        }}
      >
        AmbedkarGPT
      </h1>

      {/* ── Divider + tagline ── */}
      <div className="splash-tagline relative z-10 mt-6 flex items-center gap-4">
        <div
          className="h-px w-16 md:w-24"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(74,123,196,0.7))' }}
        />
        <span
          className="font-count text-[10px] uppercase tracking-[0.42em] md:text-[11px]"
          style={{ color: '#4a7bc4' }}
        >
          AI for Justice
        </span>
        <div
          className="h-px w-16 md:w-24"
          style={{ background: 'linear-gradient(270deg, transparent, rgba(74,123,196,0.7))' }}
        />
      </div>

      {/* ── ESTD. 2026 ── */}
      <p
        className="splash-estd relative z-10 mt-3 font-count text-[10px] uppercase tracking-[0.35em]"
        style={{ color: '#2d5080' }}
      >
        ESTD. 2026
      </p>

      {/* ── Language selector ── */}
      <div className="splash-lang relative z-10 mt-6">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-count text-[12px] font-medium transition hover:brightness-110"
          style={{
            borderColor: 'rgba(63,120,220,0.5)',
            backgroundColor: 'rgba(15,35,90,0.6)',
            color: '#7aabea',
          }}
        >
          English
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="#7aabea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
