import Card, { CardTitle } from './Card';

const DATA = [
  { d: 'Mon', v: 45 },
  { d: 'Tue', v: 38 },
  { d: 'Wed', v: 52 },
  { d: 'Thu', v: 41 },
  { d: 'Fri', v: 68 },
  { d: 'Sat', v: 55 },
  { d: 'Sun', v: 39 },
];

const W = 520, H = 230, PAD_L = 36, PAD_R = 18, PAD_T = 18, PAD_B = 36;
const Y_TICKS = [20, 40, 60, 80];

function toPoints(data) {
  const max = 80;
  const step = (W - PAD_L - PAD_R) / (data.length - 1);
  return data.map((p, i) => {
    const x = PAD_L + i * step;
    const y = PAD_T + (1 - p.v / max) * (H - PAD_T - PAD_B);
    return { x, y, ...p };
  });
}

function catmullRomPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function SearchActivityChart() {
  const pts  = toPoints(DATA);
  const line = catmullRomPath(pts);
  const area = `${line} L ${pts[pts.length - 1].x} ${H - PAD_B} L ${pts[0].x} ${H - PAD_B} Z`;

  return (
    <Card>
      <CardTitle>Search Activity</CardTitle>

      <div className="mt-4 w-full overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px]">
          <defs>
            <linearGradient id="searchLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="#3f9fff" />
              <stop offset="100%" stopColor="#7b5cff" />
            </linearGradient>
            <linearGradient id="searchArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"   stopColor="#3f9fff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3f9fff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* grid lines + y-axis labels */}
          {Y_TICKS.map((t) => {
            const y = PAD_T + (1 - t / 80) * (H - PAD_T - PAD_B);
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

          {/* area + line */}
          <path d={area} fill="url(#searchArea)" />
          <path d={line} fill="none" stroke="url(#searchLine)" strokeWidth="2.4" strokeLinecap="round" />

          {/* dots + x labels */}
          {pts.map((p) => (
            <g key={p.d}>
              <circle cx={p.x} cy={p.y} r="4.5" fill="#0b1331" stroke="url(#searchLine)" strokeWidth="2" />
              <text
                x={p.x} y={H - 12}
                fontSize="11" fill="#6b7a9f" textAnchor="middle"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {p.d}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Card>
  );
}
