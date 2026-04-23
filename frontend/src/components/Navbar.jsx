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
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[#1a2c55]/60 bg-[rgba(5,8,26,0.85)] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[78px] w-full max-w-[1440px] items-center justify-between px-6 md:h-[88px] md:px-12">
        {/* ── Logo ─────────────────────────────── */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logoSrc}
            alt="AmbedkarGPT"
            className="h-10 w-10 object-contain drop-shadow-[0_0_14px_rgba(63,159,255,0.5)]"
          />
          <span className="text-[26px] font-semibold leading-none tracking-tight md:text-[30px]">
            <span className="text-white">Amb</span>
            <span className="ml-0.5 gradient-text-cyan">AI</span>
          </span>
        </Link>

        {/* ── Desktop nav ──────────────────────── */}
        <nav className="hidden items-center gap-7 text-[11.5px] font-medium tracking-[0.14em] lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.sectionId;
            return (
              <button
                key={item.sectionId}
                type="button"
                onClick={() => handleNav(item.sectionId)}
                className={`relative transition-colors ${
                  isActive ? 'text-[#3f9fff]' : 'text-white/85 hover:text-[#8fc1ff]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="pointer-events-none absolute -bottom-2 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#3f9fff] shadow-[0_0_8px_rgba(63,159,255,0.9)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ── CTA cluster ─────────────────────── */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link
            to="/login"
            className="hidden h-10 items-center justify-center rounded-lg px-5 text-sm font-medium text-white/90 transition hover:text-white md:inline-flex"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#0a7dff] to-[#3a9fff] px-5 text-sm font-medium text-white shadow-[0_6px_24px_rgba(17,122,255,0.45)] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* ── Mobile scroll nav ─────────────────── */}
      <nav className="mx-auto flex w-full max-w-[1440px] items-center gap-2 overflow-x-auto px-6 pb-3 text-xs text-[#d6e3fa] lg:hidden">
        {navItems.map((item) => (
          <button
            key={item.sectionId}
            type="button"
            onClick={() => handleNav(item.sectionId)}
            className="whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3 py-1.5 tracking-[0.12em] text-[#d6e3fa]"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
