export default function GlassCard({ children, className = '' }) {
  return (
    <article
      className={`rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(13,22,42,0.92),rgba(10,14,28,0.88))] p-6 shadow-[0_16px_45px_rgba(2,8,22,0.45)] md:p-7 ${className}`}
    >
      {children}
    </article>
  );
}
