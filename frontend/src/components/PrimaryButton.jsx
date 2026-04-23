import { Sparkles } from 'lucide-react';

export default function PrimaryButton({ children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn-gradient w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 cursor-pointer"
    >
      {children}
      <Sparkles size={17} strokeWidth={2} />
    </button>
  );
}
