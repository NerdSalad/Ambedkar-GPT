import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logoSrc from '../assets/images/logo-animation.png';

const navItems = [
  { label: 'HOME',          sectionId: 'home' },
  { label: 'ABOUT',         sectionId: 'about' },
  { label: 'BHEEM CHATBOT', sectionId: 'bheem' },
  { label: 'CONTACT',       sectionId: 'contact' },
  { label: 'CHARITY',       sectionId: 'charity' },
  { label: 'AMBEDKARVERSE', sectionId: 'ambedkarverse' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('home');

  // Track which section is currently in view so HOME / ABOUT / etc. highlight automatically
  useEffect(() => {
    if (location.pathname !== '/') return;
    const ids = navItems.map((i) => i.sectionId);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.1, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);

  function handleNav(sectionId) {
    setActive(sectionId);
    if (location.pathname === '/') {
      const target = document.getElementById(sectionId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    sessionStorage.setItem('pending-section-scroll', sectionId);
    navigate('/');
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#1a2c55]/40 bg-[rgba(6,10,24,0.55)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 md:h-[80px] md:px-10">
        {/* ── Logo ─────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img
            src={logoSrc}
            alt="AmbedkarGPT"
            className="h-12 w-12 object-contain drop-shadow-[0_0_16px_rgba(63,159,255,0.65)]"
          />
          <span className="font-display text-[20px] font-bold leading-none tracking-tight md:text-[24px]">
            <span className="text-white">Ambedkar</span>
            <span className="gradient-text-cyan">GPT</span>
          </span>
        </Link>

        {/* ── Desktop nav ──────────────────────── */}
        <nav className="hidden items-center gap-7 font-count text-[11.5px] font-medium tracking-[0.16em] lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.sectionId;
            return (
              <button
                key={item.sectionId}
                type="button"
                onClick={() => handleNav(item.sectionId)}
                className={`relative rounded-md px-3 py-1.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0d1a3a] border border-[#3f6bd4]/60 text-[#3f9fff] shadow-[0_0_12px_rgba(63,159,255,0.18)]'
                    : 'border border-transparent text-white/75 hover:text-white hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ── CTA cluster ─────────────────────── */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to="/login"
            className="hidden h-10 items-center justify-center rounded-lg px-4 font-count text-[13px] font-medium text-white/80 transition hover:text-white md:inline-flex"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#0a7dff] to-[#3a9fff] px-5 font-count text-[13px] font-semibold text-white shadow-[0_6px_24px_rgba(17,122,255,0.45)] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* ── Mobile scroll nav ─────────────────── */}
      <nav className="mx-auto flex w-full max-w-[1440px] items-center gap-2 overflow-x-auto border-t border-[#10213f]/60 px-6 py-2.5 font-count text-[11px] font-medium tracking-[0.15em] lg:hidden">
        {navItems.map((item) => {
          const isActive = active === item.sectionId;
          return (
            <button
              key={item.sectionId}
              type="button"
              onClick={() => handleNav(item.sectionId)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 transition ${
                isActive
                  ? 'border-[#3f9fff]/70 bg-[#0d1a36] text-[#3f9fff]'
                  : 'border-white/10 bg-white/[0.04] text-[#d6e3fa] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
