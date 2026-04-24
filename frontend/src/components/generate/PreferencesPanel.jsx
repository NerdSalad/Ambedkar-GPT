import { Heart, Music2, Guitar, Clock, Star, Target } from 'lucide-react';

const PREFS = [
  {
    Icon: Heart,
    iconColor: 'text-[#ff80b5]',
    label: "What's your desired mood?",
    value: 'Relaxed & Creative',
  },
  {
    Icon: Music2,
    iconColor: 'text-[#ffc94a]',
    label: 'Preferred tempo?',
    value: 'Medium (80-120 BPM)',
  },
  {
    Icon: Guitar,
    iconColor: 'text-[#b18aff]',
    label: 'Preferred instruments?',
    tags:  ['Piano', 'Strings', 'Synth'],
  },
  {
    Icon: Clock,
    iconColor: 'text-[#5bdbc4]',
    label: 'Track duration?',
    value: '3-5 minutes',
  },
  {
    Icon: Star,
    iconColor: 'text-[#ffb056]',
    label: 'Complexity level?',
    value: 'Moderate',
  },
  {
    Icon: Target,
    iconColor: 'text-[#6aa8ff]',
    label: "What's the purpose?",
    value: 'Background Music',
  },
];

function PrefRow({ item }) {
  const Icon = item.Icon;
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#2a4375]/40 bg-[#0d1531]/70">
        <Icon size={13} strokeWidth={1.9} className={item.iconColor} />
      </div>
      <div className="flex-1 leading-snug">
        <div className="text-[12px] text-[#8b94b8]">{item.label}</div>
        {item.tags ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-[#2a4375]/50 bg-[#12224d]/80 px-2.5 py-1 text-[11px] font-medium text-[#6aa8ff]"
              >
                {t}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-0.5 text-[13px] font-semibold text-white">{item.value}</div>
        )}
      </div>
    </div>
  );
}

export default function PreferencesPanel() {
  return (
    <aside
      className="relative overflow-hidden rounded-2xl border p-6"
      style={{
        background: 'linear-gradient(180deg, rgba(16,25,55,0.80) 0%, rgba(10,16,38,0.80) 100%)',
        borderColor: 'rgba(60,85,155,0.22)',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#ffc94a] to-[#ff7a2d] text-white shadow-[0_4px_14px_rgba(255,176,86,0.4)]">
          <Star size={12} strokeWidth={0} fill="#fff" />
        </span>
        <h3 className="font-display text-[16px] font-semibold text-white">Your Preferences</h3>
      </div>
      <p className="mt-1 text-[11.5px] text-[#8b94b8]">Based on your initial setup</p>

      <div className="mt-5 space-y-4">
        {PREFS.map((p) => <PrefRow key={p.label} item={p} />)}
      </div>
    </aside>
  );
}
