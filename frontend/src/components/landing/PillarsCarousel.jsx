import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionLabel from './SectionLabel';

// Stylized portrait card placeholder — displays initials over a radial gradient.
function PortraitPlaceholder({ initials, tone = '#3f78d2' }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background: `radial-gradient(120% 120% at 30% 20%, ${tone}66 0%, #0a1330 60%)`,
      }}
    >
      <span className="font-display text-[96px] font-bold text-white/20 select-none">
        {initials}
      </span>
    </div>
  );
}

const PILLARS = [
  {
    name: 'Jyotiba Phule',
    initials: 'JP',
    tone: '#2f6abf',
    blurb: 'A revolutionary social reformer who organized knowledge to dismantle hierarchical inequality.',
  },
  {
    name: 'Gurram Jashuva',
    initials: 'GJ',
    tone: '#3f86ff',
    blurb: 'Poet of the oppressed who turned ignored poetry into a clarion call for equality through verse.',
  },
  {
    name: 'Jagjivan Ram',
    initials: 'JR',
    tone: '#4aa2ff',
    blurb: 'A champion of social justice and a voice for the marginalized across political generations.',
  },
  {
    name: 'Udham Singh',
    initials: 'US',
    tone: '#5e7bff',
    blurb: 'A revolutionary who gave voice to the silenced and inspired movements for dignity.',
  },
  {
    name: 'Savitribai Phule',
    initials: 'SP',
    tone: '#7b5cff',
    blurb: 'India’s first woman teacher — a pioneer of education for every learner, regardless of birth.',
  },
];

function PillarCard({ pillar }) {
  return (
    <div className="group relative h-[360px] shrink-0 basis-[300px] overflow-hidden rounded-2xl border border-[#2a4375]/60 bg-[#0a1430] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-[#4a78c8]/80 md:basis-[320px]">
      <PortraitPlaceholder initials={pillar.initials} tone={pillar.tone} />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#030611] via-[#030611]/70 to-transparent p-5">
        <h3 className="text-[22px] font-semibold leading-tight text-white">{pillar.name}</h3>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#aec0de] opacity-90">
          {pillar.blurb}
        </p>
      </div>
    </div>
  );
}

// Horizontally scrolling carousel of revolutionary/social-reform "Pillars"
export default function PillarsCarousel() {
  const [offset, setOffset] = useState(0);
  const CARD_W = 340;

  const go = (dir) => {
    setOffset((o) => {
      const max = (PILLARS.length - 1) * CARD_W;
      return Math.max(0, Math.min(max, o + dir * CARD_W));
    });
  };

  return (
    <section className="relative py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <SectionLabel>Pillars of Equality</SectionLabel>
            <h2 className="mt-6 font-display text-[36px] font-semibold leading-tight text-white md:text-[46px]">
              Voices That Shaped{' '}
              <span className="italic gradient-text-blue">Justice</span>
            </h2>
          </div>
          <div className="hidden gap-3 md:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2a4375]/70 bg-[#0c1735]/70 text-[#aec0de] transition hover:border-[#4a78c8]/90 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2a4375]/70 bg-[#0c1735]/70 text-[#aec0de] transition hover:border-[#4a78c8]/90 hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {PILLARS.map((p) => (
              <PillarCard key={p.name} pillar={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
