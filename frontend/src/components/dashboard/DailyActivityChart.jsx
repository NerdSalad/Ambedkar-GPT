import Card, { CardTitle } from './Card';

const DATA = [
  { d: 'Mon', v: 8  },
  { d: 'Tue', v: 12 },
  { d: 'Wed', v: 6  },
  { d: 'Thu', v: 15 },
  { d: 'Fri', v: 18 },
  { d: 'Sat', v: 10 },
  { d: 'Sun', v: 13 },
];

const W = 520, H = 230, PAD_L = 36, PAD_R = 18, PAD_T = 18, PAD_B = 36;
const Y_TICKS = [5, 10, 15, 20];
const MAX = 20;

export default function DailyActivityChart() {
  const count = DATA.length;
  const slotW = (W - PAD_L - PAD_R) / count;
  const barW  = Math.min(34, slotW * 0.52);

  return (
    <Card>
      <CardTitle>Daily Activity</CardTitle>

      <div className="mt-4 w-full overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px]">
          <defs>
            <linearGradient id="barFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"   stopColor="#6aa8ff" />
              <stop offset="100%" stopColor="#3168dd" />
            </linearGradient>
          </defs>

          {/* grid */}
          {Y_TICKS.map((t) => {
            const y = PAD_T + (1 - t / MAX) * (H - PAD_T - PAD_B);
            return (
              <g key={t}>
                <line
                  x1={PAD_L} x2={W - PAD_R} y1={y} y2={y}
                  stroke="rgba(60,85,155,0.18)" strokeDasharray="3 4"
                />
                <text
                  x={PAD_L - 10} y={y + 3}
                  fontSize="10" fill="#5a6789" textAnchor="end"
                  style={{ fontFamily: 'Count, Anybody, monospace' }}
                >
                  {t}
                </text>
              </g>
            );
          })}

          {/* bars */}
          {DATA.map((p, i) => {
            const cx = PAD_L + slotW * i + slotW / 2;
            const h  = (p.v / MAX) * (H - PAD_T - PAD_B);
            const y  = H - PAD_B - h;
            return (
              <g key={p.d}>
                <rect
                  x={cx - barW / 2}
                  y={y}
                  width={barW}
                  height={h}
                  rx="4"
                  fill="url(#barFill)"
                  opacity="0.95"
                />
                <text
                  x={cx} y={H - 12}
                  fontSize="11" fill="#6b7a9f" textAnchor="middle"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {p.d}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
