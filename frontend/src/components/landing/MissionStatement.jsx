import { ShieldCheck, Sparkles } from 'lucide-react';

// Feature chip: icon in a soft glass square + label
function FeatureChip({ icon: Icon, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2a4375]/70 bg-[#0e1a3a]/80 text-[#5fa5ff] shadow-[0_0_12px_rgba(63,159,255,0.25)]">
        <Icon size={16} strokeWidth={1.8} />
      </span>
      <p className="text-[13px] leading-relaxed text-[#aac0e3]">{children}</p>
    </div>
  );
}

// Mission Statement — centered title/description with the poster image beside
// (on desktop) or below (mobile). Text block is always center-aligned.
export default function MissionStatement({
  label = 'MISSION STATEMENT',
  titlePrimary = 'Empowering with',
  titleAccent = 'Truth',
  description = '',
  image,
  imageLabel = 'JAY BHIM',
}) {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* ── Centered header block ───────────────────────────── */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center rounded-md border border-[#2f5ba0]/60 bg-[#0d1a36]/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#9dc3ff]">
            {label}
          </span>

          <h2 className="mt-6 font-display text-[42px] font-semibold leading-[1.05] tracking-tight text-white md:text-[54px]">
            {titlePrimary}{' '}
            <span className="italic gradient-text-blue">{titleAccent}</span>
          </h2>

          <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#aec0de]">
            {description}
          </p>
        </div>

        {/* ── Poster + chips row ──────────────────────────────── */}
        <div className="mt-14 grid items-center gap-12 md:grid-cols-2 md:gap-20">
          {/* Feature chips */}
          <div className="flex flex-col gap-5 md:order-1 md:items-start">
            <FeatureChip icon={ShieldCheck}>
              Verified insights with exact source citations
            </FeatureChip>
            <FeatureChip icon={Sparkles}>
              AI-powered simplification of complex knowledge
            </FeatureChip>
          </div>

          {/* Poster */}
          <div className="relative md:order-2">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[380px] overflow-hidden rounded-2xl border border-[#2a4375]/60 bg-[#0a1430] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_48px_rgba(63,120,255,0.18)]">
              {image ? (
                <img src={image} alt={imageLabel} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b1432] via-[#0d1a3f] to-[#0a1430]">
                  <span className="font-display text-4xl font-bold text-white/20">
                    {imageLabel}
                  </span>
                </div>
              )}

              {/* poster label overlay */}
              <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center">
                <span className="font-display text-4xl font-black italic tracking-wider text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {imageLabel}
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030611]/70 via-transparent to-transparent" />
            </div>
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(circle,rgba(63,120,255,0.2)_0%,transparent_70%)] blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
