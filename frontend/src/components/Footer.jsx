import { Link } from 'react-router-dom';
import logoSrc from '../assets/images/logo-animation.png';

const ABOUT_LINKS = [
  { label: 'API',                         href: '#' },
  { label: 'FAQ',                         href: '#' },
  { label: 'Support',                     href: '#contact' },
  { label: 'Contact Us',                  href: '#contact' },
  { label: 'Careers',                     href: '#' },
  { label: 'AmbedkarGpt Creator Program', href: '#' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter',  href: '#' },
  { label: 'YouTube',  href: '#' },
];

function StorePill({ iconClass, caption, name }) {
  return (
    <a
      href="#"
      aria-label={`Download on ${name}`}
      className="group flex items-center gap-3 rounded-xl border border-[#2a4375]/70 bg-[#0c1735]/70 px-5 py-3 transition hover:-translate-y-0.5 hover:border-[#4a78c8]/90 hover:bg-[#101e42]/80"
    >
      <i className={`${iconClass} text-[24px] text-white transition group-hover:text-[#8fc1ff]`} aria-hidden="true" />
      <div className="flex flex-col leading-tight">
        <span className="text-[10.5px] tracking-wide text-[#7aa6e5]">{caption}</span>
        <span className="-mt-0.5 text-[15px] font-semibold text-white">{name}</span>
      </div>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#1a2c55]/70 bg-[#040712]">
      {/* Top hairline + soft top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(63,159,255,0.45),transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[65%] -translate-x-1/2 rounded-full bg-[#2d7dfb]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1180px] px-6 py-16 md:py-20">
        {/* ─── Main grid: brand | About | Stay tuned! | Get the App ─── */}
        <div className="grid gap-12 md:grid-cols-[1.25fr_1fr_1fr_1.1fr]">
          {/* Brand block */}
          <div>
            <img
              src={logoSrc}
              alt="AmbedkarGPT"
              className="h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(63,159,255,0.35)]"
            />
            <Link
              to="/"
              className="mt-4 inline-block text-[22px] font-semibold leading-none tracking-tight"
            >
              <span className="text-white">Ambedkar</span>
              <span className="ml-0.5 gradient-text-cyan">GPT</span>
            </Link>
            <div className="mt-4 space-y-1 text-[13px] leading-relaxed text-[#9fb2d1]">
              <p>Kalpit Ltd</p>
              <p>ABN: 56 862 209 485</p>
            </div>
            <p className="mt-3 font-serif text-[13px] italic text-[#7aa6e5]">
              Equality for Everyone, AI FOR All
            </p>
          </div>

          {/* About column */}
          <div>
            <h4 className="text-[16px] font-semibold text-white">About</h4>
            <ul className="mt-6 space-y-5">
              {ABOUT_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[13.5px] text-[#9fb2d1] transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay tuned! column */}
          <div>
            <h4 className="text-[16px] font-semibold text-white">Stay tuned!</h4>
            <ul className="mt-6 space-y-5">
              {SOCIAL_LINKS.map((l) => (
                <li key={l.label} className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-[#3f9fff] shadow-[0_0_8px_rgba(63,159,255,0.8)]"
                    aria-hidden="true"
                  />
                  <a
                    href={l.href}
                    className="text-[13.5px] text-[#c8d8f2] transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get the App column */}
          <div>
            <h4 className="text-[16px] font-semibold text-white">Get the App</h4>
            <div className="mt-6 flex flex-col gap-3">
              <StorePill
                iconClass="fa-brands fa-apple"
                caption="Download on the"
                name="App Store"
              />
              <StorePill
                iconClass="fa-brands fa-google-play"
                caption="GET IT ON"
                name="Google Play"
              />
            </div>
          </div>
        </div>

        {/* ─── Separator with center glow ─── */}
        <div className="relative mt-16 h-px w-full bg-[#1a2c55]/60">
          <span className="absolute left-1/2 top-1/2 h-[2px] w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(63,159,255,0.85),transparent)] blur-[0.5px]" />
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-[#8296bd]">
            <a href="#" className="transition hover:text-white">Legal Notice</a>
            <a href="#" className="transition hover:text-white">DMCA</a>
            <a href="#" className="transition hover:text-white">Terms of Service</a>
            <a href="#" className="transition hover:text-white">Cookie Policy</a>
          </div>

          <div className="text-right text-[12.5px] leading-relaxed text-[#8296bd]">
            <p>Terms of use and privacy policy</p>
            <p className="mt-0.5">
              AmbedkarGPT Developed by Kalpit Ltd (UK) © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
