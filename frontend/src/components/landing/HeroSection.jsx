import { useEffect, useMemo, useState } from 'react';
import { Play, ArrowRight, Home as HomeIcon, LayoutGrid, Shield, Zap } from 'lucide-react';
import Sparkle from './Sparkle';
import CountUp from './CountUp';
import squiggleSrc from '../../assets/images/squiggle-lines.png';

// Words that cycle through the accent slot in the hero headline
const ROTATING_WORDS = ['Knowledge.', 'Truth.', 'Equality.', 'Justice.', 'Inclusion.'];

function RotatingWord({ words, intervalMs = 2600 }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  // Pre-measure max word so the headline doesn't jump
  const widest = useMemo(
    () => words.reduce((acc, w) => (w.length > acc.length ? w : acc), ''),
    [words]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const t = setInterval(() => {
      setVisible(false);
      // swap word mid-fade so the crossfade reads clean
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 220);
      return () => clearTimeout(swap);
    }, intervalMs);
    return () => clearInterval(t);
  }, [words.length, intervalMs]);

  return (
    <span className="relative inline-block align-baseline">
      {/* ghost word reserves the widest width so the line never jumps */}
      <span
        aria-hidden="true"
        className="invisible font-display italic font-semibold"
      >
        {widest}
      </span>
      <span
        className="absolute inset-0 font-display italic font-semibold gradient-text-cyan transition-all duration-300 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.97)',
          filter: visible ? 'blur(0)' : 'blur(6px)',
        }}
      >
        {words[index]}
      </span>
    </span>
  );
}

const BUBBLE_VARIANTS = {
  a: 'float-bubble-a',
  b: 'float-bubble-b',
  c: 'float-bubble-c',
  d: 'float-bubble-d',
};

// Floating decorative icon with soft-blue glass badge look
function FloatIcon({ icon: Icon, className = '', variant = 'a' }) {
  return (
    <div
      className={`${BUBBLE_VARIANTS[variant]} pulse-glow group absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#2d73c8]/80 bg-[#0b2148]/75 text-[#79c4ff] shadow-[0_0_28px_rgba(50,142,255,0.42)] transition-all duration-300 hover:scale-110 hover:border-[#5fa5ff]/90 hover:bg-[#0d2a5a]/90 hover:shadow-[0_0_44px_rgba(63,159,255,0.75)] hover:text-white ${className}`}
    >
      <Icon size={18} strokeWidth={1.6} className="transition-transform duration-300 group-hover:scale-110" />
    </div>
  );
}

// Hero section — giant gradient headline, stats, badge card, radar-grid backdrop.
export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(41,108,255,0.18),rgba(6,11,26,0.98)_42%),linear-gradient(180deg,#050a18_0%,#030611_100%)] pt-24 md:min-h-[900px] md:pt-32"
    >
      {/* ── Corner glows ──────────────────────────────── */}
      <div className="pointer-events-none absolute -left-24 -top-16 h-[460px] w-[460px] rounded-full bg-[#2d7dfb]/25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 top-0 h-[460px] w-[460px] rounded-full bg-[#1d66de]/25 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#1e4fb5]/25 blur-[120px]" />

      {/* ── Squiggle lines background ─────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${squiggleSrc})` }}
      />

      {/* ── Scanner beam ──────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 z-10" style={{ top: '96px' }}>
        <div className="hero-scan-beam relative h-px w-full">
          {/* core glowing line */}
          <div
            className="absolute inset-x-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(63,159,255,0.12) 8%, rgba(63,210,255,0.85) 30%, rgba(180,230,255,1) 50%, rgba(63,210,255,0.85) 70%, rgba(63,159,255,0.12) 92%, transparent 100%)',
            }}
          />
          {/* bloom glow beneath the line */}
          <div
            className="absolute inset-x-0 -top-3 h-7"
            style={{
              background: 'linear-gradient(90deg, transparent 5%, rgba(63,159,255,0.04) 20%, rgba(100,200,255,0.18) 40%, rgba(160,225,255,0.22) 50%, rgba(100,200,255,0.18) 60%, rgba(63,159,255,0.04) 80%, transparent 95%)',
              filter: 'blur(4px)',
            }}
          />
        </div>
      </div>

      {/* ── Floating icon badges ───────────────────────── */}
      <FloatIcon icon={HomeIcon}   className="left-[12%] top-[22%]"  variant="a" />
      <FloatIcon icon={LayoutGrid} className="right-[13%] top-[20%]" variant="b" />
      <FloatIcon icon={Shield}     className="left-[20%] top-[64%]"  variant="c" />
      <FloatIcon icon={Zap}        className="right-[15%] top-[53%]" variant="d" />

      {/* ── Content ───────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col items-center px-6 pt-8 pb-16 text-center md:pt-14 md:pb-24">
        {/* Eyebrow pill */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#3a5e94] bg-[#0f1d3b]/75 px-5 py-2 text-[13px] text-[#d3e4ff] shadow-[0_0_24px_rgba(43,126,255,0.22)]">
          <Sparkle size={12} color="#4fb4ff" />
          Trusted by AI Power Users Worldwide
        </div>

        {/* Headline — accent word rotates through Knowledge/Truth/Equality/… */}
        <h1 className="font-display max-w-[1040px] text-[42px] font-semibold leading-[1.05] tracking-tight text-white md:text-[72px] md:leading-[1.04]">
          Empower Through{' '}
          <RotatingWord words={ROTATING_WORDS} />
          <br />
          Scale with Intelligent{' '}
          <span className="font-display italic font-semibold gradient-text-cyan">
            AI
          </span>
        </h1>

        {/* Sub-copy */}
        <p className="mt-7 max-w-[820px] text-base leading-7 text-[#b7c6e1] md:text-lg md:leading-8">
          Where broken knowledge systems meet intelligent AI.
          Get instant answers, personalized guidance, and expert-backed insights —
          so every seeker can make confident decisions.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="btn-outline-blue group inline-flex h-12 items-center gap-2.5 rounded-xl px-7 font-count text-[15px] font-medium text-white"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition">
              <Play size={11} fill="currentColor" strokeWidth={0} className="translate-x-[1px]" />
            </span>
            Watch Demo
          </button>
          <button
            type="button"
            className="btn-gradient inline-flex h-12 items-center gap-2 rounded-xl px-7 font-count text-[15px] font-semibold text-white"
          >
            BheemBot
            <ArrowRight size={17} strokeWidth={2.2} />
          </button>
        </div>

        {/* Bottom row: stats + AI Tools badge */}
        <div className="mt-14 w-full md:mt-20 md:grid md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-8">
          {/* Stats (left) — count up from 0 when the hero enters view */}
          <div className="flex items-start gap-10 md:gap-12">
            <div className="text-left">
              <p className="font-display text-[36px] leading-none text-[#3f9fff] md:text-[44px]">
                <CountUp end={4.8} decimals={1} />
                <span className="text-[#3f9fff]/80">+</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#90a8cc]">Stars Rating</p>
            </div>
            <div className="text-left">
              <p className="font-display text-[36px] leading-none text-[#3f9fff] md:text-[44px]">
                <CountUp
                  end={24}
                  format={(v) => `${Math.round(v)}k`}
                />
                <span className="text-[#3f9fff]/80">+</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#90a8cc]">
                Satisfied Customer
              </p>
            </div>
          </div>

          {/* Spacer where hero image would be (desktop) */}
          <div className="hidden md:block md:w-[40px]" />

          {/* BEST AI TOOLS card (right) */}
          <div className="mt-8 md:ml-auto md:mt-0 md:max-w-[260px]">
            <div className="glass-card-dark px-5 py-4 text-left shadow-[0_0_30px_rgba(48,104,201,0.22)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7aa6e5]">
                Best AI Tools
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#b8c3d8]">
                Using AI to democratize knowledge and create equal beginnings for every learner.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom fade to next section ─────────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#05081a]" />
    </section>
  );
}
