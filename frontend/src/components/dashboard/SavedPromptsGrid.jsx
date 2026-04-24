import Card, { CardTitle } from './Card';
import { Bookmark, RotateCcw } from 'lucide-react';

const PROMPTS = [
  {
    title: 'Creative Writing Assistant',
    desc:  'Generate creative story ideas and plot structures',
    tag:   { label: 'Writing',   tint: 'yellow' },
  },
  {
    title: 'Code Review Helper',
    desc:  'Analyze code and suggest improvements',
    tag:   { label: 'Coding',    tint: 'purple' },
  },
  {
    title: 'Marketing Copy Generator',
    desc:  'Create compelling marketing content and headlines',
    tag:   { label: 'Marketing', tint: 'pink'   },
  },
  {
    title: 'Data Analysis Query',
    desc:  'Extract insights from datasets and visualizations',
    tag:   { label: 'Analytics', tint: 'teal'   },
  },
];

const TINTS = {
  yellow: 'bg-[#2e2614]/80 text-[#ffc94a] border-[#5a4a1a]/60',
  purple: 'bg-[#231738]/80 text-[#b18aff] border-[#4a3375]/60',
  pink:   'bg-[#3a1a2a]/80 text-[#ff80b5] border-[#6a2a46]/60',
  teal:   'bg-[#0e2e2d]/80 text-[#5bdbc4] border-[#1c4a48]/60',
};

function PromptCard({ p }) {
  return (
    <div
      className="group relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3f9fff]/40"
      style={{
        background: 'linear-gradient(180deg, rgba(14,23,55,0.85) 0%, rgba(9,14,33,0.85) 100%)',
        borderColor: 'rgba(60,85,155,0.22)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-[15px] font-semibold text-white">{p.title}</h3>
        <Bookmark size={15} strokeWidth={1.8} className="text-[#6aa8ff]" fill="#6aa8ff" />
      </div>

      <p className="mt-2.5 text-[12.5px] leading-snug text-[#8b94b8]">{p.desc}</p>

      <div className="mt-5 flex items-center justify-between">
        <span className={`rounded-lg border px-2.5 py-1 text-[11.5px] font-medium ${TINTS[p.tag.tint]}`}>
          {p.tag.label}
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6aa8ff] transition hover:text-[#9fc7ff]"
        >
          <RotateCcw size={12} strokeWidth={2} />
          Reuse
        </button>
      </div>
    </div>
  );
}

export default function SavedPromptsGrid() {
  return (
    <Card>
      <CardTitle>Saved Prompts</CardTitle>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {PROMPTS.map((p) => <PromptCard key={p.title} p={p} />)}
      </div>
    </Card>
  );
}
