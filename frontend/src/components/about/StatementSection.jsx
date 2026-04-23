import StatementCard from './StatementCard';

const heroImage = 'https://www.figma.com/api/mcp/asset/fe5f03e1-44be-4dc3-b203-ff56d4379a62';

export default function StatementSection({ label, title, description, cards, imageFirst = false }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0a0e1c] p-6 md:p-10 lg:p-12">
      <div className={`flex flex-col gap-9 md:gap-12 lg:gap-14 ${imageFirst ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        <div className="md:w-[65%]">
          <div className="mb-5 inline-flex rounded-md bg-[rgba(42,97,186,0.2)] px-4 py-2">
            <span className="text-sm tracking-[0.08em] text-[#3f81ea] md:text-base">{label}</span>
          </div>

          <h2 className="mb-5 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-[#ecf4ff] to-[#3f81ea] bg-clip-text text-transparent">{title}</span>
          </h2>

          <p className="mb-8 text-lg leading-8 text-white/95 md:text-xl md:leading-[1.55]">{description}</p>

          <div className="flex flex-col gap-5 md:flex-row">
            {cards.map((card) => (
              <StatementCard key={card.text} {...card} />
            ))}
          </div>
        </div>

        <div className="flex justify-center md:w-[35%]">
          <div className="w-full max-w-[390px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
            <img src={heroImage} alt="B. R. Ambedkar portrait artwork" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
