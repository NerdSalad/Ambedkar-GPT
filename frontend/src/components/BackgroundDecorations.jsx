const glowBase = {
  background:
    'radial-gradient(circle, rgba(96,165,250,0.35) 0%, rgba(59,130,246,0.25) 25%, rgba(30,64,175,0.10) 50%, rgba(0,0,0,0) 70%)',
};

const variants = {
  login: [
    { left: '-273px', top: '-118px', size: 769, blur: 96, opacity: 1 },
    { left: '825px', top: '386px', size: 985, blur: 72, opacity: 0.65 },
    { left: '860px', top: '-221px', size: 638, blur: 47, opacity: 0.65 },
  ],
  signup: [
    { left: '-245px', top: '361px', size: 769, blur: 96, opacity: 1 },
    { left: '813px', top: '-185px', size: 985, blur: 72, opacity: 0.65 },
    { left: '29px', top: '-252px', size: 638, blur: 47, opacity: 0.65 },
  ],
};

// Decorative texture overlays with Figma-matched glow fields.
export default function BackgroundDecorations({ variant = 'login' }) {
  const active = variants[variant] ?? variants.login;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {active.map((field) => (
        <div
          key={`${field.left}-${field.top}-${field.size}`}
          className="absolute rounded-full"
          style={{
            ...glowBase,
            left: field.left,
            top: field.top,
            width: `${field.size}px`,
            height: `${field.size}px`,
            filter: `blur(${field.blur}px)`,
            opacity: field.opacity,
          }}
        />
      ))}

      {/* ── Curvy wave lines — top-left area ───────────────────────────────── */}
      <svg
        className="absolute top-0 left-0"
        width="520" height="260"
        viewBox="0 0 520 260"
        style={{ opacity: 0.22 }}
      >
        <path d="M 0 60  Q 120 15  240 65  T 520 55"
          stroke="#7ba3ff" strokeWidth="1.5" fill="none" />
        <path d="M 0 110 Q 140 65  280 112 T 520 108"
          stroke="#6b8aff" strokeWidth="1.2" fill="none" />
        <path d="M 0 160 Q 160 115 320 162 T 520 158"
          stroke="#7ba3ff" strokeWidth="1.0" fill="none" />
        <path d="M 0 210 Q 140 168 280 212 T 520 208"
          stroke="#5a78ff" strokeWidth="0.8" fill="none" />
      </svg>

      {/* ── Dotted concentric arc fragments — lower-right ──────────────────── */}
      <svg
        className="absolute bottom-0 right-0"
        width="380" height="380"
        viewBox="0 0 380 380"
        style={{ opacity: 0.2 }}
      >
        {/* Centred at corner (380,380) — only top-left quarter shows */}
        <circle cx="380" cy="380" r="130"
          stroke="#8aabff" strokeWidth="1.2" fill="none"
          strokeDasharray="4 8" />
        <circle cx="380" cy="380" r="210"
          stroke="#7ba3ff" strokeWidth="1.0" fill="none"
          strokeDasharray="4 10" />
        <circle cx="380" cy="380" r="300"
          stroke="#6b8aff" strokeWidth="0.8" fill="none"
          strokeDasharray="4 12" />
      </svg>

      {/* ── 4-point sparkle glyphs ──────────────────────────────────────────── */}
      <svg className="absolute" style={{ top: '38%', left: '47%', opacity: 0.32 }}
        width="14" height="14" viewBox="0 0 16 16">
        <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" fill="#8aabff" />
      </svg>

      <svg className="absolute" style={{ top: '68%', left: '9%', opacity: 0.25 }}
        width="11" height="11" viewBox="0 0 16 16">
        <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" fill="#7ba3ff" />
      </svg>

      <svg className="absolute" style={{ top: '18%', right: '12%', opacity: 0.28 }}
        width="10" height="10" viewBox="0 0 16 16">
        <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" fill="#8aabff" />
      </svg>

      <svg className="absolute" style={{ top: '52%', right: '6%', opacity: 0.22 }}
        width="8" height="8" viewBox="0 0 16 16">
        <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" fill="#7ba3ff" />
      </svg>

      {/* ── Thin rounded-rect accent ───────────────────────────────────────── */}
      <svg className="absolute" style={{ top: '7%', right: '4%', opacity: 0.18 }}
        width="120" height="90" viewBox="0 0 120 90">
        <rect x="1" y="1" width="118" height="88" rx="12"
          stroke="#7ba3ff" strokeWidth="1" fill="none" />
      </svg>

    </div>
  );
}
