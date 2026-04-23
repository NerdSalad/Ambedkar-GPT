import MainLayout from '../layouts/MainLayout';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import { teamHighlights } from '../utils/siteContent';

export default function About() {
  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-[91px]">
        <SectionHeading
          eyebrow="Identity"
          title="About AmbedkarGPT"
          description="AmbedkarGPT preserves, structures, and democratizes access to foundational Ambedkarite thought through trustworthy AI."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {teamHighlights.map((point) => (
            <GlassCard key={point} className="h-full min-h-[140px]">
              <h2 className="text-xl font-medium text-white">{point}</h2>
            </GlassCard>
          ))}
        </div>

        <div className="mt-5">
          <GlassCard className="md:p-10">
            <h3 className="text-2xl font-medium text-white">Our Purpose</h3>
            <p className="mt-4 max-w-4xl leading-8 text-[#d0d9ea]">
              We are building a long-term, AI-assisted knowledge infrastructure where Ambedkar&apos;s legacy remains
              searchable, understandable, and actionable for future generations.
            </p>
          </GlassCard>
        </div>
      </section>
    </MainLayout>
  );
}
