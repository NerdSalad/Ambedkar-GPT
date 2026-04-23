import MainLayout from '../layouts/MainLayout';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';

const plans = [
  { name: 'Starter', price: 'Free', summary: 'Explore core features and basic question workflows.' },
  { name: 'Pro', price: 'INR 499/mo', summary: 'Advanced research features and richer contextual responses.' },
  { name: 'Institution', price: 'Custom', summary: 'Multi-user access, governance controls, and support.' },
];

export default function Pricing() {
  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-[91px]">
        <SectionHeading
          eyebrow="Plans"
          title="Pricing"
          description="Simple plans for learners, researchers, and institutions."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <GlassCard key={plan.name} className="h-full min-h-[220px] md:p-8">
              <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
              <p className="mt-2 text-2xl font-semibold text-[#64b5ff]">{plan.price}</p>
              <p className="mt-4 leading-7 text-[#c7d5ee]">{plan.summary}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
