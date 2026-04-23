import SectionLabel from './SectionLabel';
import savitribai from '../../assets/images/makers/savitribai.png';
import gurram     from '../../assets/images/makers/gurram.png';
import jagjivan   from '../../assets/images/makers/jagjivan.png';
import udham      from '../../assets/images/makers/udham.png';
import dakshayani from '../../assets/images/makers/dakshayani.png';
import kanshi     from '../../assets/images/makers/kanshi.png';
import janabai    from '../../assets/images/makers/janabai.png';

const MAKERS = [
  {
    name: 'Savitribai Phule',
    image: savitribai,
    blurb: 'India’s first woman teacher — a pioneer of education for every learner, regardless of birth.',
  },
  {
    name: 'Gurram Jashuva',
    image: gurram,
    blurb: 'Poet of the oppressed who turned ignored verse into a clarion call for equality.',
  },
  {
    name: 'Jagjivan Ram',
    image: jagjivan,
    blurb: 'Champion of social justice and a voice for the marginalized across generations.',
  },
  {
    name: 'Udham Singh',
    image: udham,
    blurb: 'A revolutionary who gave voice to the silenced and inspired movements for dignity.',
  },
  {
    name: 'Dakshayani Velayudhan',
    image: dakshayani,
    blurb: 'First and only Dalit woman elected to the Constituent Assembly — a quiet architect of equality.',
  },
  {
    name: 'Kanshi Ram',
    image: kanshi,
    blurb: 'Organiser of the modern Bahujan movement and an unwavering advocate for social justice.',
  },
  {
    name: 'Sant Janabai',
    image: janabai,
    blurb: 'Medieval Marathi saint-poet whose verses centred the lives of labouring Dalit women.',
  },
];

// Double the list so the CSS marquee (-50%) loops seamlessly.
const TRACK = [...MAKERS, ...MAKERS];

function MakerCard({ maker, idx }) {
  return (
    <div
      className="group relative h-[360px] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[#2a4375]/60 bg-[#0a1430] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-[#4a78c8]/80 md:w-[300px]"
      aria-hidden={idx >= MAKERS.length ? true : undefined}
    >
      {/* Portrait with soft blue-wash backdrop so every image feels part of the
          same card system regardless of its native background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#11204a] via-[#0b1633] to-[#070c1f]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_25%,rgba(63,159,255,0.18),transparent_65%)]" />

      <img
        src={maker.image}
        alt={maker.name}
        loading="lazy"
        className="relative h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
        style={{ filter: 'saturate(1.05) contrast(1.02)' }}
      />

      {/* Name + blurb overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#030611] via-[#030611]/70 to-transparent p-5">
        <h3 className="text-[20px] font-semibold leading-tight text-white md:text-[22px]">
          {maker.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-[#aec0de]">
          {maker.blurb}
        </p>
      </div>
    </div>
  );
}

// Dalit History Makers — centered header + infinite horizontal marquee of portraits
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
            <MakerCard key={`${maker.name}-${i}`} maker={maker} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
