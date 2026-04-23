import { Link } from 'react-router-dom';
import { TwitterIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from './landing/SocialIcons';
import logoSrc       from '../assets/images/logo-animation.png';
import appleLogo     from '../assets/images/app-store.png';
import googlePlayLogo from '../assets/images/google-play.jpg';

const SOCIALS = [
  { icon: TwitterIcon,   href: '#', label: 'Twitter' },
  { icon: LinkedinIcon,  href: '#', label: 'LinkedIn' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: YoutubeIcon,   href: '#', label: 'YouTube' },
];

const LINK_GROUPS = [
  { title: 'Product',   links: ['BheemBot', 'Solutions', 'Pricing', 'Archive'] },
  { title: 'Company',   links: ['About', 'Mission', 'Team', 'Careers'] },
  { title: 'Resources', links: ['Blog', 'Research', 'Documentation', 'Support'] },
];

// App-store style pill button. Shows logo (inverted to white on dark), small
// caption and store name.
function StoreButton({ logo, caption, name, invert = false }) {
  return (
    <a
      href="#"
      className="group flex items-center gap-3 rounded-xl border border-[#2a4375]/70 bg-[#0c1735]/70 px-4 py-2.5 transition hover:-translate-y-0.5 hover:border-[#4a78c8]/90 hover:bg-[#101e42]/80"
    >
      <img
        src={logo}
        alt={`${name} logo`}
        className={`h-7 w-7 object-contain ${invert ? 'invert brightness-200' : ''}`}
      />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] text-[#7aa6e5]">{caption}</span>
        <span className="text-[14px] font-semibold text-white">{name}</span>
      </div>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#1a2c55]/70 bg-[#040712]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(63,159,255,0.5),transparent)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60%] -translate-x-1/2 rounded-full bg-[#2d7dfb]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1180px] px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
          {/* Brand block */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logoSrc}
                alt="AmbedkarGPT"
                className="h-10 w-10 object-contain drop-shadow-[0_0_14px_rgba(63,159,255,0.4)]"
              />
              <span className="text-[26px] font-semibold leading-none tracking-tight">
                <span className="text-white">Amb</span>
                <span className="ml-0.5 gradient-text-cyan">AI</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-[#9fb2d1]">
              Empowering minds with knowledge and equality through AI —
              grounded in authentic, source-backed wisdom.
            </p>
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
                {group.links.map((label) => (
                  <li key={label}>
                    <a href="#" className="text-[14px] text-[#9fb2d1] transition hover:text-white">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get the App column */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7aa6e5]">
              Get the App
            </h4>
            <p className="mt-3 text-[12.5px] leading-relaxed text-[#9fb2d1]">
              Take the corpus with you — on every device.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <StoreButton
                logo={appleLogo}
                caption="Download on the"
                name="App Store"
                invert
              />
              <StoreButton
                logo={googlePlayLogo}
                caption="Get it on"
                name="Google Play"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#1a2c55]/60 pt-6 text-[12px] text-[#6f85a8] md:flex-row">
          <p>© {new Date().getFullYear()} AmbAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
