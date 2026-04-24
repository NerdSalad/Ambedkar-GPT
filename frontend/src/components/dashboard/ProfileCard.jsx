import Card from './Card';
import { Pencil, Star } from 'lucide-react';

export default function ProfileCard({ user }) {
  const name    = user?.name   ?? 'Alex Morgan';
  const email   = user?.email  ?? 'alex.morgan@example.com';
  const joined  = user?.joined ?? 'Joined March 2024';
  const score   = user?.score  ?? '127';
  const initial = (name?.[0] ?? 'A').toUpperCase();

  return (
    <Card className="h-full">
      {/* avatar */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-[3px] border-[#3f9fff]/60 bg-gradient-to-br from-[#3f7fff] via-[#6a6af0] to-[#8b5cf6] font-display text-[28px] font-bold text-white shadow-[0_0_24px_rgba(63,159,255,0.35)]">
            {initial}
          </div>
          <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-[#0d1226] bg-[#22c55e]" />
        </div>

        <h3 className="mt-3.5 font-display text-[18px] font-semibold text-white">{name}</h3>
        <p className="mt-1 text-[12.5px] text-[#8b94b8]">{email}</p>
        <p className="mt-0.5 text-[11px] text-[#6b78a0]">{joined}</p>
      </div>

      {/* stats tiles */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#1e3260]/70 bg-[#0d1737]/80 px-3 py-3 text-center">
          <div className="font-count text-[20px] font-bold text-[#6aa8ff] tabular-nums">
            {score}
          </div>
          <div className="mt-1 text-[10.5px] text-[#8b94b8]">Activity Score</div>
        </div>
        <div className="rounded-xl border border-[#3a2b55]/80 bg-[#231738]/80 px-3 py-3 text-center">
          <div className="inline-flex items-center gap-1 font-display text-[17px] font-bold text-[#ffc94a]">
            <Star size={12} strokeWidth={0} fill="#ffc94a" /> Pro
          </div>
          <div className="mt-1 text-[10.5px] text-[#b39ddb]">Subscription</div>
        </div>
      </div>

      {/* edit button */}
      <button
        type="button"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl btn-gradient py-3 text-[13.5px] font-semibold text-white shadow-[0_6px_22px_rgba(17,122,255,0.35)]"
      >
        <Pencil size={14} strokeWidth={2} />
        Edit Profile
      </button>
    </Card>
  );
}
