const TONES = ['Professional', 'Casual', 'Friendly', 'Inspirational'];

export default function TonePills({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {TONES.map((t) => {
        const isActive = value === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={[
              'rounded-xl px-4 py-3 text-[13px] font-medium transition-all duration-200',
              isActive
                ? 'text-white shadow-[0_10px_28px_rgba(17,122,255,0.35)]'
                : 'border border-[rgba(60,85,155,0.25)] text-[#a3b0d4] hover:border-[#3f9fff]/40 hover:text-white',
            ].join(' ')}
            style={
              isActive
                ? { background: 'linear-gradient(90deg,#0a7dff 0%,#3a9fff 100%)' }
                : { background: 'linear-gradient(180deg, rgba(14,23,55,0.75) 0%, rgba(9,14,33,0.75) 100%)' }
            }
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export { TONES };
