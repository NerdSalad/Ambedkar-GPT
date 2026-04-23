import { Check, Sparkles } from 'lucide-react';

export default function StatementCard({ icon, text }) {
  const Icon = icon === 'check' ? Check : Sparkles;

  return (
    <div className="w-full rounded-xl border border-[rgba(63,72,89,0.3)] bg-[rgba(13,26,43,0.6)] p-6 backdrop-blur-[10px] md:min-h-[182px] md:w-[241px]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded bg-[#18263b]">
        <Icon size={18} color="#64b5ff" />
      </div>
      <p className="text-sm leading-6 text-[#f1f6fd]">{text}</p>
    </div>
  );
}
