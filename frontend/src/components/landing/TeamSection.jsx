import { LinkedinIcon, TwitterIcon } from './SocialIcons';
import SectionLabel from './SectionLabel';

const TEAM = [
  { name: 'Yuvraj Singh Kane',  role: 'Founder & CEO',       initials: 'YK' },
  { name: 'Tanishq Bhise',      role: 'Co-Founder, CTO',     initials: 'TB' },
  { name: 'Nishang Yadav',      role: 'Head of AI',          initials: 'NY' },
  { name: 'Anurag Deshmukh',    role: 'Head of Engineering', initials: 'AD' },
];

function TeamCard({ member }) {
  return (
    <div className="glass-card hover-lift relative overflow-hidden p-4">
      {/* photo */}
      <div
        className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl"
        style={{
          background:
            'radial-gradient(120% 120% at 30% 20%, rgba(63,135,255,0.35) 0%, #0a1330 70%)',
        }}
      >
        <span className="font-display text-[72px] font-bold text-white/20">
          {member.initials}
        </span>
      </div>

      {/* info */}
      <div className="mt-4 flex items-center justify-between px-1">
        <div>
          <p className="text-[15px] font-semibold text-white">{member.name}</p>
          <p className="mt-0.5 text-[11.5px] uppercase tracking-[0.15em] text-[#7aa6e5]">
            {member.role}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="#"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2a4375]/70 text-[#aec0de] transition hover:border-[#4a78c8]/90 hover:text-white"
          >
            <LinkedinIcon width={12} height={12} />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2a4375]/70 text-[#aec0de] transition hover:border-[#4a78c8]/90 hover:text-white"
          >
            <TwitterIcon width={12} height={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

// Team section — "A team like never seen before" with group header + member cards
export default function TeamSection() {
  return (
    <section id="charity" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <SectionLabel>Work With Us</SectionLabel>

        <h2 className="mx-auto mt-8 max-w-[820px] text-center font-display text-[38px] font-semibold leading-[1.08] text-white md:text-[52px]">
          A team like{' '}
          <span className="italic gradient-text-blue">never seen</span>{' '}
          before
        </h2>

        {/* Group hero panel */}
        <div className="relative mx-auto mt-10 h-[240px] w-full overflow-hidden rounded-2xl border border-[#2a4375]/60 bg-gradient-to-br from-[#0d1a3f] via-[#0a1430] to-[#06102b] shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:h-[300px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-end gap-4 opacity-70">
              {['YK','TB','NY','AD'].map((i, idx) => (
                <div
                  key={i}
                  className="flex h-32 w-24 items-center justify-center rounded-xl bg-gradient-to-b from-[#1a2a55] to-[#0a1330] font-display text-3xl font-bold text-white/30 md:h-40 md:w-28"
                  style={{ transform: `translateY(${idx % 2 === 0 ? 0 : -12}px)` }}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030611] via-transparent to-transparent" />
        </div>

        <p className="mx-auto mt-8 max-w-[720px] text-center text-[14.5px] leading-7 text-[#a6b9d6]">
          Our team connects scholars, creators, engineers, and changemakers —
          turning knowledge into meaningful action.
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
