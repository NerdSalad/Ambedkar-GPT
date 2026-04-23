import MainLayout from '../layouts/MainLayout';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import { resourceCards } from '../utils/siteContent';

export default function Resources() {
  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-[91px]">
        <SectionHeading
          eyebrow="Learning"
          title="Resources"
          description="Explore curated materials, notes, and study tracks to build deep understanding step-by-step."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {resourceCards.map((item) => (
            <GlassCard key={item.title} className="h-full min-h-[220px]">
              <p className="text-xs uppercase tracking-[0.12em] text-[#6daeff]">{item.type}</p>
              <h2 className="mt-2 text-2xl font-medium text-white">{item.title}</h2>
              <p className="mt-3 leading-7 text-[#c7d5ee]">{item.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
