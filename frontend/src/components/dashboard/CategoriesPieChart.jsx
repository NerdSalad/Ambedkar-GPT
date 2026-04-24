import Card, { CardTitle } from './Card';

const SLICES = [
  { label: 'Technology', pct: 25, color: '#6aa8ff' },
  { label: 'AI Tools',   pct: 21, color: '#4f8dff' },
  { label: 'Education',  pct: 17, color: '#86bbff' },
  { label: 'Coding',     pct: 15, color: '#2d5fd1' },
  { label: 'Design',     pct: 13, color: '#3a76e0' },
  { label: 'Research',   pct: 10, color: '#1e449c' },
];

const CX = 250, CY = 200, R = 130;

function polar(angle) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

function labelPos(angle) {
  const rad = ((angle - 90) * Math.PI) / 180;
  const dist = R + 28;
  return { x: CX + dist * Math.cos(rad), y: CY + dist * Math.sin(rad) };
}

export default function CategoriesPieChart() {
  const arcs = SLICES.reduce((acc, s) => {
    const start = acc.angle;
    const end   = start + (s.pct / 100) * 360;
    const p1 = polar(start);
    const p2 = polar(end);
    const large = end - start > 180 ? 1 : 0;
    const mid = start + (end - start) / 2;
    acc.items.push({
      ...s,
      d: `M ${CX} ${CY} L ${p1.x} ${p1.y} A ${R} ${R} 0 ${large} 1 ${p2.x} ${p2.y} Z`,
      mid,
    });
    acc.angle = end;
    return acc;
  }, { angle: 0, items: [] }).items;

  return (
    <Card className="h-full">
      <CardTitle>Most Searched Categories</CardTitle>

      <div className="mt-2 flex items-center justify-center">
        <svg viewBox="0 0 500 400" className="w-full max-w-[520px] h-[340px]">
          {/* slices */}
          {arcs.map((a) => (
            <path
              key={a.label}
              d={a.d}
              fill={a.color}
              stroke="#0a1130"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          ))}

          {/* labels */}
          {arcs.map((a) => {
            const { x, y } = labelPos(a.mid);
            const anchor = x < CX - 10 ? 'end' : x > CX + 10 ? 'start' : 'middle';
            return (
              <text
                key={a.label + '-lbl'}
                x={x} y={y}
                fontSize="12"
                fontWeight="500"
                fill="#6aa3ff"
                textAnchor={anchor}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {a.label} {a.pct}%
              </text>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
