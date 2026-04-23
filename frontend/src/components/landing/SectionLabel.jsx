import Sparkle from './Sparkle';

// Centered pill-style section label like "✦ Trusted By ✦".
// The two sparkles rotate + pulse out of phase for subtle motion.
export default function SectionLabel({ children, size = 'md' }) {
  const isLg = size === 'lg';
  return (
    <div className="flex justify-center">
      <div
        className={`inline-flex items-center gap-2.5 rounded-full border border-[#2f5ba0]/60 bg-[#0d1a36]/70 shadow-[0_0_36px_rgba(43,126,255,0.22)] backdrop-blur-sm ${
          isLg ? 'px-6 py-2.5' : 'px-5 py-2'
        }`}
      >
        <span className="sparkle-twinkle inline-flex">
          <Sparkle size={isLg ? 14 : 12} color="#4fb4ff" />
        </span>
        <span
          className={`font-medium uppercase tracking-[0.22em] text-[#9dc3ff] ${
            isLg ? 'text-[13px]' : 'text-[11.5px]'
          }`}
        >
          {children}
        </span>
        <span className="sparkle-twinkle-delay inline-flex">
          <Sparkle size={isLg ? 14 : 12} color="#4fb4ff" />
        </span>
      </div>
    </div>
  );
}
