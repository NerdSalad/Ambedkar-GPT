import MainLayout from '../layouts/MainLayout';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import { solutionCards } from '../utils/siteContent';

export default function Solutions() {
  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-[91px]">
        <SectionHeading
          eyebrow="Platform"
          title="Solutions"
          description="A complete learning platform for discovering, understanding, and applying Ambedkarite knowledge with clarity and confidence."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutionCards.map((card) => (
            <GlassCard key={card.title} className="h-full min-h-[220px]">
              <h2 className="text-xl font-medium text-white">{card.title}</h2>
              <p className="mt-3 leading-7 text-[#c7d5ee]">{card.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
