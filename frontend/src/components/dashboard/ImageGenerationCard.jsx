import Card from './Card';
import { ImageIcon, Mountain } from 'lucide-react';

const THUMBS = [
  { type: 'letter', value: 'A', grad: 'from-[#3f9fff] to-[#7b5cff]' },
  { type: 'empty' },
  { type: 'empty' },
  { type: 'scenic' },
];

function Thumb({ thumb }) {
  if (thumb.type === 'letter') {
    return (
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${thumb.grad} font-display text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(63,159,255,0.35)]`}>
        {thumb.value}
      </div>
    );
  }
  if (thumb.type === 'scenic') {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6aa8ff] via-[#a47ef0] to-[#ff9d6a] text-white shadow-[0_4px_14px_rgba(164,126,240,0.35)]">
        <Mountain size={18} strokeWidth={1.8} />
      </div>
    );
  }
  return (
    <div className="h-11 w-11 rounded-xl border border-dashed border-[#2a3566]/70 bg-[#0e1633]/60" />
  );
}

// Circular progress: 68%
const R = 42, C = 2 * Math.PI * R;
const PCT = 68;

export default function ImageGenerationCard() {
  const offset = C - (PCT / 100) * C;

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <h2 className="font-display text-[16px] font-semibold leading-tight text-white tracking-tight">
          Image<br />Generation
        </h2>

        <div className="rounded-lg border border-[#2a4375]/60 bg-[#111f46]/80 px-3 py-1.5 text-right">
          <div className="font-count text-[15px] font-bold leading-none text-[#6aa8ff]">1,248</div>
          <div className="mt-0.5 text-[10px] font-medium text-[#6aa8ff]/80 tracking-wider">Total</div>
        </div>
      </div>

      {/* thumbnails */}
      <div className="mt-5 flex items-center gap-2.5">
        {THUMBS.map((t, i) => <Thumb key={i} thumb={t} />)}
      </div>

      {/* usage */}
      <div className="mt-6 flex items-center gap-5">
        <div className="relative flex h-[112px] w-[112px] items-center justify-center">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={R} fill="none" stroke="#152248" strokeWidth="7" />
            <circle
              cx="50" cy="50" r={R} fill="none"
              stroke="url(#imgUsage)" strokeWidth="7" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={offset}
            />
            <defs>
              <linearGradient id="imgUsage" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%"   stopColor="#3f9fff" />
                <stop offset="100%" stopColor="#7b5cff" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute font-display text-[20px] font-bold text-white">{PCT}%</span>
        </div>

        <div className="flex-1 leading-tight">
          <div className="text-[12px] text-[#8b94b8]">Monthly Usage</div>
          <div className="mt-0.5 font-count text-[22px] font-bold text-white tabular-nums">
            340 / 500
          </div>
          <div className="mt-1 text-[11px] text-[#6b78a0]">
            Images remaining this month
          </div>
        </div>
      </div>
    </Card>
  );
}
