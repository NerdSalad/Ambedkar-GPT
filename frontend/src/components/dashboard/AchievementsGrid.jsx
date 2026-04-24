import Card, { CardTitle } from './Card';
import { Trophy, Target, Zap, Award } from 'lucide-react';

const ITEMS = [
  {
    Icon: Trophy,
    title: '100 Searches Completed',
    desc:  "You've completed 100 successful searches",
    pct:   100,
    iconBg: 'bg-gradient-to-br from-[#ffb056] to-[#ff7a2d]',
    bar:    'from-[#ffb056] to-[#ff7a2d]',
  },
  {
    Icon: Target,
    title: '50 Images Generated',
    desc:  'Created 50 AI-generated images',
    pct:   100,
    iconBg: 'bg-gradient-to-br from-[#c254ff] to-[#ff4fb5]',
    bar:    'from-[#c254ff] to-[#ff4fb5]',
  },
  {
    Icon: Zap,
    title: 'Top AI Explorer',
    desc:  'Reached top 10% of active users',
    pct:   85,
    iconBg: 'bg-gradient-to-br from-[#3f9fff] to-[#5bc0ff]',
    bar:    'from-[#3f9fff] to-[#5bc0ff]',
  },
  {
    Icon: Award,
    title: '7-Day Streak',
    desc:  'Used the platform for 7 consecutive days',
    pct:   70,
    iconBg: 'bg-gradient-to-br from-[#22c55e] to-[#16a34a]',
    bar:    'from-[#22c55e] to-[#16a34a]',
  },
];

function AchievementTile({ item }) {
  const { Icon } = item;
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: 'linear-gradient(180deg, rgba(14,23,55,0.85) 0%, rgba(9,14,33,0.85) 100%)',
        borderColor: 'rgba(60,85,155,0.22)',
      }}
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-[0_6px_16px_rgba(0,0,0,0.35)] ${item.iconBg}`}>
          <Icon size={19} strokeWidth={2} />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-[14.5px] font-semibold text-white leading-tight">
            {item.title}
          </h3>
          <p className="mt-1 text-[12px] text-[#8b94b8] leading-snug">{item.desc}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#111a3a]">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${item.bar}`}
            style={{ width: `${item.pct}%` }}
          />
        </div>
        <div className="mt-2 font-count text-[11px] text-[#8b94b8]">{item.pct}% Complete</div>
      </div>
    </div>
  );
}

export default function AchievementsGrid() {
  return (
    <Card>
      <CardTitle>Achievements &amp; Insights</CardTitle>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {ITEMS.map((i) => <AchievementTile key={i.title} item={i} />)}
      </div>
    </Card>
  );
}
