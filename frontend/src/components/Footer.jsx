import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { TwitterIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from './landing/SocialIcons';
import logoSrc from '../assets/images/logo-animation.png';

const SOCIALS = [
  { icon: TwitterIcon,   href: '#', label: 'Twitter' },
  { icon: LinkedinIcon,  href: '#', label: 'LinkedIn' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: YoutubeIcon,   href: '#', label: 'YouTube' },
];

const LINK_GROUPS = [
  {
    title: 'Product',
    links: [
      { label: 'BheemBot',  href: '#bheem' },
      { label: 'Archive',   href: '#ambedkarverse' },
      { label: 'Pricing',   href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',    href: '#about' },
      { label: 'Mission',  href: '#about' },
      { label: 'Team',     href: '#charity' },
      { label: 'Careers',  href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog',          href: '#' },
      { label: 'Research',      href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'Support',       href: '#contact' },
    ],
  },
];

// Store pill using Font Awesome brand icons — visually balanced, scales cleanly
function StoreButton({ iconClass, caption, name }) {
  return (
    <a
      href="#"
      aria-label={`Download on ${name}`}
      className="group flex items-center gap-3 rounded-xl border border-[#2a4375]/70 bg-[#0c1735]/70 px-4 py-2.5 transition hover:-translate-y-0.5 hover:border-[#4a78c8]/90 hover:bg-[#101e42]/80"
    >
      <i className={`${iconClass} text-[26px] text-white transition group-hover:text-[#8fc1ff]`} aria-hidden="true" />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] tracking-wide text-[#7aa6e5]">{caption}</span>
        <span className="-mt-0.5 text-[15px] font-semibold text-white">{name}</span>
      </div>
    </a>
  );
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#1a2c55]/70 bg-[#040712]">
      {/* Top hairline + soft glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(63,159,255,0.45),transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[65%] -translate-x-1/2 rounded-full bg-[#2d7dfb]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1180px] px-6 py-16 md:py-20">
        {/* ─── Main grid ─── */}
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src={logoSrc}
                alt="AmbedkarGPT"
                className="h-11 w-11 object-contain drop-shadow-[0_0_14px_rgba(63,159,255,0.4)]"
              />
              <span className="text-[28px] font-semibold leading-none tracking-tight">
                <span className="text-white">Amb</span>
                <span className="ml-0.5 gradient-text-cyan">AI</span>
              </span>
            </Link>
            <p className="mt-5 max-w-[300px] text-[14px] leading-relaxed text-[#9fb2d1]">
              Empowering minds with knowledge and equality through AI —
              grounded in authentic, source-backed wisdom.
            </p>

            {/* Newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-sm items-center overflow-hidden rounded-xl border border-[#2a4375]/70 bg-[#0a1330]/70 focus-within:border-[#3f6bd4]"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent px-4 py-2.5 text-[13.5px] text-white placeholder:text-[#6f85a8] outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-10 w-10 items-center justify-center bg-gradient-to-r from-[#0a7dff] to-[#3a9fff] text-white transition hover:brightness-110"
              >
                <ArrowRight size={15} strokeWidth={2.4} />
              </button>
            </form>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2a4375]/70 bg-[#0c1735]/70 text-[#aec0de] transition hover:border-[#4a78c8]/90 hover:text-white"
                >
                  <Icon width={13} height={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7aa6e5]">
                {group.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[14px] text-[#9fb2d1] transition hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get the App */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7aa6e5]">
              Get the App
            </h4>
            <p className="mt-3 text-[12.5px] leading-relaxed text-[#9fb2d1]">
              Take the corpus with you — on every device.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <StoreButton
                iconClass="fa-brands fa-apple"
                caption="Download on the"
                name="App Store"
              />
              <StoreButton
                iconClass="fa-brands fa-google-play"
                caption="Get it on"
                name="Google Play"
              />
            </div>
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#1a2c55]/60 pt-6 md:flex-row">
          <p className="text-[12px] text-[#6f85a8]">
            © {new Date().getFullYear()} AmbAI. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-[12px] text-[#8296bd]">
            <a href="#" className="transition hover:text-white">Privacy Policy</a>
            <span className="text-[#2a3a5f]">•</span>
            <a href="#" className="transition hover:text-white">Terms of Service</a>
            <span className="text-[#2a3a5f]">•</span>
            <a href="#" className="transition hover:text-white">Cookies</a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-lg border border-[#2a4375]/70 bg-[#0c1735]/70 px-3 py-1.5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#aec0de] transition hover:border-[#4a78c8]/90 hover:text-white"
          >
            <ArrowUp size={12} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
