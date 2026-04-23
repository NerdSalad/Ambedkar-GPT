import SectionLabel from './SectionLabel';

const MAKERS = [
  {
    name: 'Jyotiba Phule',
    initials: 'JP',
    tone: '#2f6abf',
    blurb: 'A revolutionary reformer who organized knowledge to dismantle hierarchical inequality.',
  },
  {
    name: 'Gurram Jashuva',
    initials: 'GJ',
    tone: '#3f86ff',
    blurb: 'Poet of the oppressed who turned ignored verse into a clarion call for equality.',
  },
  {
    name: 'Jagjivan Ram',
    initials: 'JR',
    tone: '#4aa2ff',
    blurb: 'Champion of social justice and a voice for the marginalized across generations.',
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
    blurb: 'India’s first woman teacher — a pioneer of education for every learner.',
  },
  {
    name: 'Periyar E.V.R',
    initials: 'PE',
    tone: '#6f9cff',
    blurb: 'Architect of the Self-Respect movement advocating rational, caste-free society.',
  },
];

// Double the list so the CSS animation (-50%) loops seamlessly.
const TRACK = [...MAKERS, ...MAKERS];

function MakerCard({ maker }) {
  return (
    <div className="group relative h-[360px] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-[#2a4375]/60 bg-[#0a1430] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-[#4a78c8]/80 md:w-[320px]">
      <div
        className="flex h-full w-full items-center justify-center"
        style={{
          background: `radial-gradient(120% 120% at 30% 20%, ${maker.tone}66 0%, #0a1330 60%)`,
        }}
      >
        <span className="font-display text-[96px] font-bold text-white/20 select-none">
          {maker.initials}
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#030611] via-[#030611]/70 to-transparent p-5">
        <h3 className="text-[22px] font-semibold leading-tight text-white">
          {maker.name}
        </h3>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#aec0de] opacity-90">
          {maker.blurb}
        </p>
      </div>
    </div>
  );
}

// Dalit History Makers — centered header with an infinite horizontal marquee
// of portrait cards. Duration is CSS-controlled via --marquee-duration.
export default function DalitHistoryMakers() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <SectionLabel>Dalit History Makers</SectionLabel>

        <h2 className="mx-auto mt-8 max-w-[820px] text-center font-display text-[38px] font-semibold leading-[1.08] text-white md:text-[52px]">
          Voices That Shaped{' '}
          <span className="italic gradient-text-blue">Justice</span>
        </h2>

        <p className="mx-auto mt-6 max-w-[700px] text-center text-[15px] leading-7 text-[#a6b9d6]">
          Meet the reformers, poets, and thinkers whose ideas built the foundations of
          equality — their stories live on in every line of the corpus.
        </p>
      </div>

      <div className="marquee mt-14" style={{ '--marquee-duration': '55s' }}>
        <div className="marquee-track">
          {TRACK.map((maker, i) => (
            <MakerCard key={`${maker.name}-${i}`} maker={maker} />
          ))}
        </div>
      </div>
    </section>
  );
}
