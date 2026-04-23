import { useState } from 'react';
import { Calendar, MapPin, FileText, Eye } from 'lucide-react';
import SectionLabel from './SectionLabel';

const RECORDS = [
  {
    num: '01',
    title: 'Manifesto for Social Equality (1927)',
    tag:  'PRIMARY SOURCE',
    body: 'A cornerstone document outlining the foundational principles of the movement, focusing on the dismantling of hereditary inequality.',
    meta: [
      { icon: Calendar, text: 'MAR 1927' },
      { icon: MapPin,   text: 'MAHAD, INDIA' },
      { icon: FileText, text: '12.4 MB' },
    ],
  },
  {
    num: '02',
    title: 'Bhimrao Ramji Ambedkar: The London Essays',
    tag:  'ACADEMIC JOURNAL',
    body: 'Digital reproductions of the handwritten drafts during his tenure at the London School of Economics, featuring extensive marginalia.',
    meta: [
      { icon: Calendar, text: '1920–1923' },
      { icon: MapPin,   text: 'LONDON, UK' },
      { icon: FileText, text: '142 PAGES' },
    ],
  },
  {
    num: '03',
    title: 'The Yeola Declaration Digital Folio',
    tag:  'PRESS ARCHIVE',
    body: 'A curated selection of newspaper clippings and eyewitness accounts surrounding the 1935 Yeola Conference and the subsequent declarations.',
    meta: [
      { icon: Calendar, text: 'OCT 1935' },
      { icon: MapPin,   text: 'YEOLA, INDIA' },
      { icon: Eye,      text: '4.2K VIEWS' },
    ],
  },
];

function RecordRow({ record }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#1e3260]/70 bg-[#0a1330]/70 p-5 transition hover:border-[#3a6bc4]/90 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
        <span className="font-display text-[32px] font-light leading-none text-[#6b8cc9] md:text-[40px]">
          {record.num}
        </span>

        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h4 className="max-w-xl font-display text-[20px] font-semibold leading-snug text-white md:text-[22px]">
              {record.title}
            </h4>
            <span className="rounded-md border border-[#2f5ba0]/50 bg-[#0d1a36]/70 px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] text-[#9dc3ff]">
              {record.tag}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-[#9fb2d1]">
            {record.body}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.15em] text-[#7a90b8]">
            {record.meta.map((m) => (
              <span key={m.text} className="inline-flex items-center gap-1.5">
                <m.icon size={12} strokeWidth={1.8} />
                {m.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dalit Corpus — archive explorer: timeframe slider + record list
export default function DalitCorpusSection() {
  const [range, setRange] = useState([1850, 1990]);

  return (
    <section id="ambedkarverse" className="relative overflow-hidden py-24 md:py-32">
      {/* floating spheres (decorative) */}
      <div className="pointer-events-none absolute left-[4%] top-[12%] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_40%_30%,rgba(80,130,220,0.35),rgba(10,20,50,0.9)_70%)] blur-[0.5px] opacity-60" />
      <div className="pointer-events-none absolute right-[3%] top-[42%] h-60 w-60 rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(95,150,240,0.25),rgba(10,20,50,0.9)_70%)] blur-[0.5px] opacity-60" />

      <div className="relative mx-auto max-w-[1180px] px-6">
        <SectionLabel size="lg">Dalit Corpus</SectionLabel>

        <p className="mx-auto mt-8 max-w-[720px] text-center font-serif text-[18px] italic leading-relaxed text-[#c0d0ea] md:text-[20px]">
          A moonlit repository of resistance, culture, and documented histories.
          Exploring the profound depths of subaltern narratives through archival meticulousness.
        </p>

        {/* Main panel */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-[#1e3260]/70 bg-[#060c1e]/85 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] md:p-10">
          <div className="grid gap-10 md:grid-cols-[260px_1fr]">
            {/* Left: Archive Explorer filter */}
            <div>
              <h3 className="font-display text-[26px] font-semibold text-white">
                Archive Explorer
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#9fb2d1]">
                Utilize the metadata matrix to isolate specific archival nodes.
              </p>

              <div className="mt-7">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a90b8]">
                  Timeframe Range
                </p>
                <div className="rounded-xl border border-[#1e3260]/70 bg-[#0a1330] px-4 py-3">
                  <div className="flex items-center justify-between text-[13px] font-medium text-[#c0d0ea]">
                    <span>{range[0]}</span>
                    <span>{range[1]}</span>
                  </div>
                  <div className="relative mt-3 h-1 rounded-full bg-[#1a2a55]">
                    <div
                      className="absolute top-0 h-1 rounded-full bg-gradient-to-r from-[#3f9fff] to-[#7b5cff] shadow-[0_0_12px_rgba(63,159,255,0.6)]"
                      style={{
                        left: `${((range[0] - 1850) / 140) * 100}%`,
                        right: `${100 - ((range[1] - 1850) / 140) * 100}%`,
                      }}
                    />
                    <span
                      className="absolute -top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#3f9fff] bg-[#0a1330]"
                      style={{ left: `${((range[0] - 1850) / 140) * 100}%` }}
                    />
                    <span
                      className="absolute -top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#7b5cff] bg-[#0a1330]"
                      style={{ left: `${((range[1] - 1850) / 140) * 100}%` }}
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setRange([1850, 1950])}
                      className="flex-1 rounded-md border border-[#1e3260]/70 bg-[#0e1a3a]/80 py-1.5 text-[11px] text-[#9fb2d1] hover:text-white"
                    >
                      Pre-Indep.
                    </button>
                    <button
                      onClick={() => setRange([1950, 1990])}
                      className="flex-1 rounded-md border border-[#1e3260]/70 bg-[#0e1a3a]/80 py-1.5 text-[11px] text-[#9fb2d1] hover:text-white"
                    >
                      Modern
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Records */}
            <div className="space-y-4">
              {RECORDS.map((r) => (
                <RecordRow key={r.num} record={r} />
              ))}

              <div className="pt-2 text-center">
                <button className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7aa6e5] transition hover:text-white">
                  Load More Records
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
