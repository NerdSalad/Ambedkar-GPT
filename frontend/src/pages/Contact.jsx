import MainLayout from '../layouts/MainLayout';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import ContactForm from '../components/forms/ContactForm';

export default function Contact() {
  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-[91px]">
        <SectionHeading
          eyebrow="Connect"
          title="Contact"
          description="Reach out for collaborations, institutional adoption, or support. We will get back to you as soon as possible."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard className="md:p-8">
            <ContactForm />
          </GlassCard>
          <GlassCard className="h-full md:p-8">
            <h2 className="text-2xl font-medium text-white">Direct Channels</h2>
            <div className="mt-5 space-y-4 text-[#d0d9ea]">
              <p>Email: hello@ambedkargpt.in</p>
              <p>Support: support@ambedkargpt.in</p>
              <p>Partnerships: partner@ambedkargpt.in</p>
            </div>
          </GlassCard>
        </div>
      </section>
    </MainLayout>
  );
}
