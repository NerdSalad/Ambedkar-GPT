import { Link } from 'react-router-dom';
import { TwitterIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from './landing/SocialIcons';

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

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-[#1a2c55]/70 bg-[#040712]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(63,159,255,0.5),transparent)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60%] -translate-x-1/2 rounded-full bg-[#2d7dfb]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1180px] px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#3f6bd4]/60 bg-[#0b1430] shadow-[0_0_18px_rgba(63,159,255,0.35)]">
                <span className="absolute inset-1 rounded-full border border-[#3f6bd4]/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#3f9fff]" />
              </span>
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
