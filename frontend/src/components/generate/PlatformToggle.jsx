const InstagramGlyph = (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const TwitterGlyph = (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M18.9 2H22l-7.5 8.57L23 22h-6.88l-5.39-7.05L4.56 22H1.44l8.03-9.18L1 2h7.05l4.87 6.44L18.9 2Zm-2.42 18h1.9L7.62 4H5.6l10.88 16Z" />
  </svg>
);

const FacebookGlyph = (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M13.5 22v-8h2.7l.4-3.13h-3.1V8.86c0-.9.25-1.52 1.55-1.52h1.65v-2.8a22 22 0 0 0-2.4-.12c-2.38 0-4.01 1.45-4.01 4.12v2.3H7.6V14h2.68v8h3.22Z" />
  </svg>
);

const LinkedInGlyph = (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 4.97 8.5 2.5 2.5 0 0 1 4.98 3.5ZM3 9.75h4v11.25H3V9.75Zm7 0h3.84v1.54h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12V21H17.5v-5.02c0-1.2-.02-2.74-1.67-2.74-1.68 0-1.93 1.31-1.93 2.66V21H10V9.75Z" />
  </svg>
);

const PLATFORMS = [
  {
    id: 'instagram',
    label: 'Instagram',
    glyph: InstagramGlyph,
    iconBg: 'bg-gradient-to-br from-[#ff4fa2] via-[#c24fff] to-[#7b5cff]',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    glyph: TwitterGlyph,
    iconBg: 'bg-gradient-to-br from-[#1f2937] to-[#0f172a]',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    glyph: FacebookGlyph,
    iconBg: 'bg-gradient-to-br from-[#4265e9] to-[#2a49c8]',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    glyph: LinkedInGlyph,
    iconBg: 'bg-gradient-to-br from-[#0a66c2] to-[#1e88e5]',
  },
];

export default function PlatformToggle({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {PLATFORMS.map((p) => {
        const isActive = value === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p.id)}
            className={[
              'flex items-center gap-3 rounded-xl border px-3.5 py-3 text-[13px] font-medium transition-all duration-200',
              isActive
                ? 'border-[#3f9fff]/70 text-white'
                : 'border-[rgba(60,85,155,0.25)] text-[#a3b0d4] hover:border-[#3f9fff]/40 hover:text-white',
            ].join(' ')}
            style={{
              background: isActive
                ? 'linear-gradient(180deg, rgba(22,44,95,0.85) 0%, rgba(10,18,44,0.85) 100%)'
                : 'linear-gradient(180deg, rgba(14,23,55,0.75) 0%, rgba(9,14,33,0.75) 100%)',
              boxShadow: isActive ? '0 0 0 1px rgba(63,159,255,0.45), 0 8px 22px rgba(15,35,90,0.35)' : undefined,
            }}
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-[0_6px_16px_rgba(0,0,0,0.35)] ${p.iconBg}`}>
              {p.glyph}
            </span>
            <span>{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}
