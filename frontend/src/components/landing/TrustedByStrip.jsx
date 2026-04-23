import SectionLabel from './SectionLabel';
import Sparkle from './Sparkle';

// Inline "INDIAai" wordmark — approximates the orange/green Govt of India AI logo
function IndiaAiLogo() {
  return (
    <div className="flex items-center gap-1.5 select-none">
      <span className="text-[28px] font-extrabold tracking-tight text-white">
        INDI<span className="text-[#ff7a2e]">A</span>
      </span>
      <span className="flex h-7 items-center rounded-md bg-gradient-to-br from-[#ff7a2e] via-[#ffd16a] to-[#2ea344] px-1.5 text-sm font-bold italic text-white shadow-[0_0_14px_rgba(255,130,40,0.35)]">
        ai
      </span>
    </div>
  );
}

// Inline Digital India logo approximation (chakra swoosh + text)
function DigitalIndiaLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden>
        <defs>
          <linearGradient id="dia-a" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%"  stopColor="#1a73ff" />
            <stop offset="100%" stopColor="#63c1ff" />
          </linearGradient>
          <linearGradient id="dia-b" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%"  stopColor="#ff7a2e" />
            <stop offset="100%" stopColor="#ffb347" />
          </linearGradient>
        </defs>
        <path
          d="M20 4 C 31 4 36 12 36 20 C 36 28 29 34 20 34"
          stroke="url(#dia-a)" strokeWidth="5" fill="none" strokeLinecap="round"
        />
        <path
          d="M6 20 C 6 12 12 5 20 5"
          stroke="url(#dia-b)" strokeWidth="5" fill="none" strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="3" fill="#1a73ff" />
      </svg>
      <div className="leading-tight">
        <p className="text-[16px] font-bold text-white">Digital India</p>
        <p className="text-[9px] tracking-wider text-[#8aa4d0]">POWER TO EMPOWER</p>
      </div>
    </div>
  );
}

// "Trusted By" partners strip — centered label pill + logos with sparkle separators
export default function TrustedByStrip() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2d7dfb]/12 blur-[120px]" />

      <div className="relative mx-auto max-w-[1180px] px-6">
        <SectionLabel>Trusted By</SectionLabel>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20">
          <Sparkle size={18} color="#8fbfff" className="opacity-70" />
          <IndiaAiLogo />
          <Sparkle size={18} color="#8fbfff" className="opacity-70" />
          <DigitalIndiaLogo />
          <Sparkle size={18} color="#8fbfff" className="opacity-70" />
        </div>
      </div>
    </section>
  );
}
