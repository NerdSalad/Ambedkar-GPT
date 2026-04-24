import { useState } from 'react';
import { Sparkles, ChevronDown, RotateCcw } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────
// 7 onboarding questions (same ones from the Questionnaire page), shown
// here as dropdowns so the user can tweak their generation profile
// without leaving the generator.
// ─────────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'profile_user_role',
    label: 'Your role',
    hint: 'Voice & authority layer',
    options: [
      'Student / Researcher',
      'Activist / Advocate',
      'Educator / Teacher',
      'Content Creator',
      'Journalist / Writer',
      'General Public',
    ],
  },
  {
    id: 'profile_tone',
    label: 'Preferred tone',
    hint: 'Word choice & emotional energy',
    options: [
      'Academic & Formal',
      'Conversational & Friendly',
      'Passionate & Motivational',
      'Analytical & Objective',
    ],
  },
  {
    id: 'profile_target_audience',
    label: 'Target audience',
    hint: 'How the message is framed',
    options: [
      'General Public',
      'Students & Youth',
      'Academic Community',
      'Policy Makers',
      'Social Media Followers',
      'Activists & Organizers',
    ],
  },
  {
    id: 'profile_primary_focus',
    label: 'Primary focus',
    hint: 'What the post is about',
    options: [
      'Constitutional Rights',
      'Social Justice',
      'Education & Learning',
      'History & Legacy',
      'Political Thought',
      'Economic Equality',
    ],
  },
  {
    id: 'profile_ambedkarite_perspective',
    label: 'Perspective',
    hint: 'Your core ideological anchor',
    options: [
      'Radical Ambedkarite',
      'Reformist Ambedkarite',
      'Structural Analyst',
      'Institutional Advocate',
    ],
  },
  {
    id: 'profile_content_length',
    label: 'Content length',
    hint: 'Controls output size',
    options: [
      'Short & Concise (tweets / captions)',
      'Medium (paragraphs)',
      'Long-form (essays / articles)',
      'Detailed & Comprehensive',
    ],
  },
  {
    id: 'profile_call_to_action',
    label: 'Call to action',
    hint: 'Ending & intent of post',
    options: [
      'Passive Awareness',
      'Mobilizing & Action-Oriented',
      'Institutional Change',
      'Educational & Informative',
    ],
  },
];

const DEFAULTS = Object.freeze({
  profile_user_role:              'Content Creator',
  profile_tone:                   'Conversational & Friendly',
  profile_target_audience:        'Social Media Followers',
  profile_primary_focus:          'Social Justice',
  profile_ambedkarite_perspective:'Reformist Ambedkarite',
  profile_content_length:         'Medium (paragraphs)',
  profile_call_to_action:         'Educational & Informative',
});

// ─────────────────────────────────────────────────────────────────────
// Dropdown — styled <select> with a custom chevron so it blends with
// the rest of the dark UI on every browser.
// ─────────────────────────────────────────────────────────────────────
function Dropdown({ value, options, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-[#1e3260]/70 bg-[#0a1130]/80 py-2.5 pl-3 pr-9 text-[12.5px] font-medium text-white outline-none transition focus:border-[#3f9fff]/70 focus:shadow-[0_0_0_3px_rgba(63,159,255,0.15)] hover:border-[#3f9fff]/50"
      >
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            className="bg-[#0a1130] text-white"
          >
            {opt}
          </option>
        ))}
      </select>

      <ChevronDown
        size={13}
        strokeWidth={2}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8b94b8]"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Main sidebar — mirrors the Claude / ChatGPT left-sidebar aesthetic:
// flush-edge, no outer card border on the right, single divider on the
// left, sticky to the viewport so the user can tweak preferences while
// the main content scrolls.
// ─────────────────────────────────────────────────────────────────────
export default function PreferencesPanel({ value, onChange }) {
  // Uncontrolled fallback so the component still works stand-alone.
  const [local, setLocal] = useState(DEFAULTS);
  const current = value ?? local;

  function setField(id, v) {
    const next = { ...current, [id]: v };
    if (onChange) onChange(next); else setLocal(next);
  }

  function reset() {
    if (onChange) onChange({ ...DEFAULTS }); else setLocal({ ...DEFAULTS });
  }

  return (
    <aside
      className="relative flex h-full w-full flex-col border-l border-[#141d3a]/80 bg-gradient-to-b from-[#0a1024]/95 to-[#070b1c]/95"
    >
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-[#141d3a]/70 bg-[#070b1c]/90 px-5 py-5 backdrop-blur">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#3f9fff] to-[#7b5cff] text-white shadow-[0_4px_14px_rgba(63,159,255,0.4)]">
              <Sparkles size={11} strokeWidth={2.2} />
            </span>
            <h3 className="font-display text-[15px] font-semibold text-white tracking-tight">
              Your Preferences
            </h3>
          </div>
          <p className="mt-1 text-[11px] text-[#8b94b8]">
            Tune the voice behind every post
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          title="Reset to defaults"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#1e3260]/70 text-[#8b94b8] transition hover:border-[#3f9fff]/60 hover:text-white"
        >
          <RotateCcw size={11} strokeWidth={2} />
        </button>
      </header>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {QUESTIONS.map((q, i) => (
          <div key={q.id}>
            <div className="flex items-baseline justify-between gap-2">
              <label className="text-[11.5px] font-semibold uppercase tracking-wider text-[#6aa8ff]">
                <span className="font-count text-[#8b94b8] mr-1">{i + 1}.</span>
                {q.label}
              </label>
            </div>
            <p className="mt-0.5 text-[10.5px] text-[#6b78a0] leading-snug">
              {q.hint}
            </p>
            <div className="mt-2">
              <Dropdown
                value={current[q.id]}
                options={q.options}
                onChange={(v) => setField(q.id, v)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer / summary */}
      <footer className="border-t border-[#141d3a]/70 bg-[#070b1c]/85 px-5 py-4 text-[10.5px] text-[#6b78a0] leading-snug">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          7 signals active
        </span>
      </footer>
    </aside>
  );
}

export { QUESTIONS as PREFERENCE_QUESTIONS, DEFAULTS as PREFERENCE_DEFAULTS };
