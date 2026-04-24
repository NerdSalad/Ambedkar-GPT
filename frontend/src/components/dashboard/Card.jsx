/**
 * Shared dashboard panel (card) wrapper. Provides the consistent
 * rounded + bordered + dark-gradient surface used across every panel.
 */
export default function Card({ children, className = '', padded = true }) {
  return (
    <section
      className={[
        'relative overflow-hidden rounded-2xl border',
        padded ? 'p-5 md:p-6' : '',
        className,
      ].join(' ')}
      style={{
        background: 'linear-gradient(180deg, rgba(16,25,55,0.80) 0%, rgba(10,16,38,0.80) 100%)',
        borderColor: 'rgba(60,85,155,0.22)',
      }}
    >
      {children}
    </section>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display text-[16px] font-semibold text-white tracking-tight ${className}`}>
      {children}
    </h2>
  );
}
