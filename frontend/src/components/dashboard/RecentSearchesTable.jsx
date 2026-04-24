import Card, { CardTitle } from './Card';
import { Clock } from 'lucide-react';

const ROWS = [
  { q: 'Lorem Epsum Lorem Espum Lorem', date: 'Apr 17, 2026', cat: 'Coding',     mins: 5,  status: 'Completed' },
  { q: 'Lorem Epsum Lorem Espum Lorem', date: 'Apr 16, 2026', cat: 'Design',     mins: 8,  status: 'Completed' },
  { q: 'Lorem Epsum Lorem Espum Lorem', date: 'Apr 16, 2026', cat: 'AI Tools',   mins: 12, status: 'Completed' },
  { q: 'Lorem Epsum Lorem Espum Lorem', date: 'Apr 15, 2026', cat: 'Coding',     mins: 6,  status: 'Completed' },
  { q: 'Lorem Epsum Lorem Espum Lorem', date: 'Apr 15, 2026', cat: 'Technology', mins: 9,  status: 'Completed' },
];

const CAT_TINTS = {
  Coding:     'bg-[#231738]/80 text-[#b18aff] border-[#4a3375]/60',
  Design:     'bg-[#3a1a2a]/80 text-[#ff80b5] border-[#6a2a46]/60',
  'AI Tools': 'bg-[#0f2a3d]/80 text-[#6ad6ff] border-[#1d4a66]/60',
  Technology: 'bg-[#0e2e2d]/80 text-[#5bdbc4] border-[#1c4a48]/60',
};

export default function RecentSearchesTable() {
  return (
    <Card>
      <CardTitle>Recent Searches</CardTitle>

      <div className="mt-5 w-full overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="text-[11.5px] uppercase tracking-wider text-[#6b78a0]">
              <th className="py-3 pr-4 font-medium">Search Query</th>
              <th className="py-3 pr-4 font-medium">Date</th>
              <th className="py-3 pr-4 font-medium">Category</th>
              <th className="py-3 pr-4 font-medium">Time Spent</th>
              <th className="py-3 pr-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr
                key={i}
                className="border-t border-[#1a254a]/40 text-[13px] text-[#c3ccea] transition-colors hover:bg-[#0e1736]/60"
              >
                <td className="py-3.5 pr-4 font-medium text-white">{r.q}</td>
                <td className="py-3.5 pr-4 text-[#8b94b8]">{r.date}</td>
                <td className="py-3.5 pr-4">
                  <span className={`rounded-lg border px-2.5 py-1 text-[11.5px] font-medium ${CAT_TINTS[r.cat] ?? CAT_TINTS.Technology}`}>
                    {r.cat}
                  </span>
                </td>
                <td className="py-3.5 pr-4">
                  <span className="inline-flex items-center gap-1.5 text-[#8b94b8]">
                    <Clock size={12} strokeWidth={1.8} />
                    {r.mins} min
                  </span>
                </td>
                <td className="py-3.5 pr-4">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1c4a33]/70 bg-[#0e2a1d]/80 px-2.5 py-1 text-[11.5px] font-medium text-[#5bdb90]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
