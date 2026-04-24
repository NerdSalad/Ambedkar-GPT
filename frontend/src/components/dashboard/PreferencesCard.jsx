import Card, { CardTitle } from './Card';

const ROWS = [
  ['Favorite Topics',    'AI, Technology, Machine Learning'],
  ['Question Type',      'Technical & Analytical'],
  ['Response Style',     'Detailed & Comprehensive'],
  ['Language',           'English'],
  ['Favorite AI Tools',  'ChatGPT, Midjourney, Claude'],
  ['Most Used Category', 'Technology'],
];

const KEYWORDS = [
  { label: 'AI',              tint: 'blue'   },
  { label: 'Machine Learning', tint: 'blue'   },
  { label: 'React',            tint: 'cyan'   },
  { label: 'TypeScript',       tint: 'blue'   },
  { label: 'Design',           tint: 'pink'   },
  { label: 'UX',               tint: 'blue'   },
  { label: 'Python',           tint: 'purple' },
  { label: 'Data Science',     tint: 'teal'   },
];

const TINTS = {
  blue:   'bg-[#12224d]/80 text-[#6aa8ff] border-[#2a4a8a]/60',
  cyan:   'bg-[#0f2a3d]/80 text-[#6ad6ff] border-[#1d4a66]/60',
  pink:   'bg-[#3a1a2a]/80 text-[#ff80b5] border-[#6a2a46]/60',
  purple: 'bg-[#231738]/80 text-[#b18aff] border-[#4a3375]/60',
  teal:   'bg-[#0e2e2d]/80 text-[#5bdbc4] border-[#1c4a48]/60',
};

export default function PreferencesCard() {
  return (
    <Card className="h-full">
      <CardTitle>User Preferences</CardTitle>

      <dl className="mt-5 space-y-4">
        {ROWS.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4">
            <dt className="text-[13px] text-[#8b94b8]">{k}</dt>
            <dd className="text-right text-[13px] font-medium text-white">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#2a3566]/60 to-transparent" />

      <div className="mt-5">
        <div className="text-[13px] text-[#8b94b8]">Recently Searched Keywords</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {KEYWORDS.map((k) => (
            <span
              key={k.label}
              className={`rounded-lg border px-2.5 py-1 text-[11.5px] font-medium ${TINTS[k.tint]}`}
            >
              {k.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
