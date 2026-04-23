import MainLayout from '../layouts/MainLayout';
import StatementSection from '../components/about/StatementSection';
import GlassCard from '../components/ui/GlassCard';
import ContactForm from '../components/forms/ContactForm';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { resourceCards, solutionCards } from '../utils/siteContent';
import { useEffect, useState } from 'react';

const statementSections = [
  {
    label: 'MISSION STATEMENT',
    title: 'Empowering with Truth',
    description:
      'Our mission is to deliver authentic, source-backed knowledge directly from original writings. Using advanced AI, we transform complex ideas into clear, reliable, and actionable insights. Every response is grounded in truth, ensuring transparency, trust, and intellectual integrity.',
    cards: [
      { icon: 'check', text: 'Verified insights with exact source citations' },
      { icon: 'sparkles', text: 'AI-powered simplification of complex knowledge' },
    ],
  },
  {
    label: 'VISION STATEMENT',
    title: 'AI-Powered Dalit Literature Archive',
    description:
      'We envision creating the Indian Dalit Literature Corpus (IDLC)—the world’s first comprehensive digital archive dedicated to preserving and amplifying Dalit literature. By leveraging AI, we aim to transform fragmented and inaccessible works into a structured, searchable, and enduring knowledge system.',
    cards: [
      { icon: 'check', text: 'Long-term preservation with accessible, searchable knowledge' },
      { icon: 'sparkles', text: 'First AI-powered, structured archive of Dalit literature' },
    ],
  },
  {
    label: 'PURPOSE STATEMENT',
    title: "Ambedkar's Legacy, AI-Powered",
    description:
      'Our purpose is to preserve and amplify the legacy of B. R. Ambedkar by transforming his writings into a searchable, accessible knowledge system. We go beyond digitization—democratizing knowledge to empower individuals and advance equality through education.',
    cards: [
      { icon: 'check', text: 'Source-backed insights ensuring transparency, authenticity, and trust' },
      { icon: 'sparkles', text: "AI-powered transformation of Ambedkar's complete works into usable knowledge" },
    ],
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const pendingSection = sessionStorage.getItem('pending-section-scroll');
    if (!pendingSection) return;
    const timeout = setTimeout(() => {
      const target = document.getElementById(pendingSection);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      sessionStorage.removeItem('pending-section-scroll');
    }, 120);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1440px] space-y-12 px-6 pb-20 pt-10 md:px-[72px] md:pt-[52px]">
        <RevealOnScroll>
          <section id="home" className="relative overflow-hidden rounded-2xl border border-[#1d2f52] bg-[radial-gradient(circle_at_20%_-10%,rgba(59,130,246,0.26),transparent_45%),#070d1f] px-5 pb-12 pt-8 md:min-h-[700px] md:px-10 md:pb-16 md:pt-11">
          <div className="pointer-events-none absolute inset-x-0 top-[116px] h-px bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.55),transparent)]" />
          <div
            className="hero-line-scroll pointer-events-none absolute -left-24 top-[230px] h-[320px] w-[1300px] rounded-[100%] border-t border-[#1f4a8a]/70"
            style={{ transform: `translateX(${Math.min(scrollY * 0.035, 28)}px)` }}
          />
          <div
            className="hero-line-scroll pointer-events-none absolute -left-28 top-[258px] h-[360px] w-[1360px] rounded-[100%] border-t border-[#1f4a8a]/65"
            style={{ transform: `translateX(${Math.min(scrollY * 0.03, 24)}px)` }}
          />
          <div
            className="hero-line-scroll pointer-events-none absolute -left-32 top-[286px] h-[400px] w-[1420px] rounded-[100%] border-t border-[#1f4a8a]/55"
            style={{ transform: `translateX(${Math.min(scrollY * 0.024, 20)}px)` }}
          />
          <div
            className="hero-line-scroll pointer-events-none absolute -left-36 top-[314px] h-[440px] w-[1480px] rounded-[100%] border-t border-[#1f4a8a]/45"
            style={{ transform: `translateX(${Math.min(scrollY * 0.02, 16)}px)` }}
          />
          <div className="float-slow pulse-glow absolute left-[12%] top-[19%] flex h-10 w-10 items-center justify-center rounded-lg border border-[#2d73c8]/80 bg-[#0c1f44]/70 text-[#79c4ff]">
            ⌂
          </div>
          <div className="float-slow-delayed pulse-glow absolute right-[15%] top-[21%] flex h-10 w-10 items-center justify-center rounded-lg border border-[#2d73c8]/80 bg-[#0c1f44]/70 text-[#79c4ff]">
            ✦
          </div>
          <div className="float-slow absolute left-[20%] top-[51%] flex h-10 w-10 items-center justify-center rounded-lg border border-[#2d73c8]/70 bg-[#0c1f44]/60 text-[#79c4ff]">
            ○
          </div>
          <div className="float-slow-delayed absolute right-[18%] top-[47%] flex h-10 w-10 items-center justify-center rounded-lg border border-[#2d73c8]/70 bg-[#0c1f44]/60 text-[#79c4ff]">
            ⚡
          </div>

          <div className="relative z-10 mx-auto flex max-w-[1120px] flex-col items-center text-center md:pt-8">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2a4d86] bg-[#0c1935]/75 px-4 py-2 text-sm text-[#d3e4ff]">
              <span className="text-[#4ea7ff]">✦</span>
              Trusted by AI Power Users Worldwide
            </div>

            <h1 className="max-w-[980px] text-[46px] font-semibold leading-[1.05] text-white md:text-[66px]">
              Empower Through <span className="text-[#75b7ff]">Knowledge.</span>
              <br />
              Scale with Intelligent AI
            </h1>

            <p className="mt-5 max-w-[840px] text-base leading-7 text-[#cad9f3] md:text-lg md:leading-[1.45]">
              Where broken parenting systems meet intelligent AI. Get instant answers, personalized guidance, and
              expert-backed insights - so every parent can make confident decisions.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button className="h-11 rounded-md border border-[#4675bb] bg-[#0b152b] px-7 text-base text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#5c94e6] hover:shadow-[0_8px_24px_rgba(52,128,255,0.28)]">
                Watch Demo
              </button>
              <button className="h-11 rounded-md bg-gradient-to-r from-[#0078ff] to-[#2d9dff] px-7 text-base text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_28px_rgba(23,130,255,0.42)]">
                BheemBot
              </button>
            </div>

            <div className="mt-9 flex items-center gap-10 md:hidden">
              <div>
                <p className="text-3xl font-semibold text-[#66b1ff]">4.8+</p>
                <p className="text-sm text-[#8fa9cf]">Store Rating</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-[#66b1ff]">24k+</p>
                <p className="text-sm text-[#8fa9cf]">Satisfied Customers</p>
              </div>
            </div>

          </div>

          <div className="absolute bottom-7 left-8 hidden items-end gap-9 md:flex">
            <div>
              <p className="text-[44px] font-semibold leading-none text-[#3f9fff]">4.8+</p>
              <p className="mt-1 text-xs text-[#90a8cc]">Stars Rating</p>
            </div>
            <div>
              <p className="text-[44px] font-semibold leading-none text-[#3f9fff]">24k+</p>
              <p className="mt-1 text-xs text-[#90a8cc]">Satisfied Customer</p>
            </div>
          </div>

          <div className="absolute bottom-5 right-7 hidden w-[260px] rounded-xl border border-[#2b3d66] bg-[linear-gradient(135deg,rgba(15,20,35,0.95),rgba(11,16,32,0.88))] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.45)] md:block">
            <p className="text-[26px] font-semibold text-white">BEST AI TOOLS</p>
            <p className="mt-1 text-[10px] leading-relaxed text-[#a7b4cc]">
              Using AI to democratize parenting knowledge and
              create equal beginnings
            </p>
          </div>
          </section>
        </RevealOnScroll>

        <section id="about" className="space-y-10">
          {statementSections.map((section, index) => (
            <RevealOnScroll key={section.label} delayMs={index * 80}>
              <StatementSection {...section} imageFirst={index % 2 === 1} />
            </RevealOnScroll>
          ))}
        </section>

        <RevealOnScroll delayMs={60}>
          <section id="solutions" className="rounded-2xl border border-white/10 bg-[#091022] p-6 md:p-10">
            <h2 className="text-3xl font-semibold text-white md:text-5xl">Dream Curator Solutions</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c7d5ee]">
              Intelligent experiences crafted to provide source-backed answers, guided exploration, and meaningful
              educational outcomes.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {solutionCards.map((item) => (
                <RevealOnScroll key={item.title} delayMs={40} yOffset={16}>
                  <GlassCard className="hover-lift h-full min-h-[220px]">
                  <h3 className="text-xl font-medium text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#c7d5ee]">{item.description}</p>
                  </GlassCard>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delayMs={90}>
          <section id="charity" className="rounded-2xl border border-white/10 bg-[#091022] p-6 md:p-10">
            <h2 className="text-3xl font-semibold text-white md:text-5xl">Charity</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c7d5ee]">
              Support digital preservation, educational access, and inclusive knowledge ecosystems for future
              generations.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <GlassCard className="hover-lift h-full min-h-[210px]">
                <h3 className="text-xl font-semibold text-white">Sponsor Access</h3>
                <p className="mt-3 leading-7 text-[#c7d5ee]">Fund student and community access programs.</p>
              </GlassCard>
              <GlassCard className="hover-lift h-full min-h-[210px]">
                <h3 className="text-xl font-semibold text-white">Archive Preservation</h3>
                <p className="mt-3 leading-7 text-[#c7d5ee]">Help preserve source materials in structured formats.</p>
              </GlassCard>
              <GlassCard className="hover-lift h-full min-h-[210px]">
                <h3 className="text-xl font-semibold text-white">Institution Grants</h3>
                <p className="mt-3 leading-7 text-[#c7d5ee]">Enable NGOs and schools to adopt the platform.</p>
              </GlassCard>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <section id="ambedkarverse" className="rounded-2xl border border-white/10 bg-[#091022] p-6 md:p-10">
            <h2 className="text-3xl font-semibold text-white md:text-5xl">Ambedkarverse Resources</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c7d5ee]">
              Collections, pathways, and practical study tools for structured learning and long-term retention.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {resourceCards.map((item) => (
                <GlassCard key={item.title} className="hover-lift h-full min-h-[220px]">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#6daeff]">{item.type}</p>
                  <h3 className="mt-2 text-2xl font-medium text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#c7d5ee]">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll delayMs={160}>
          <section id="contact" className="rounded-2xl border border-white/10 bg-[#091022] p-6 md:p-10">
            <h2 className="text-3xl font-semibold text-white md:text-5xl">Contact</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c7d5ee]">
              Reach out for collaborations, partnerships, and platform support.
            </p>
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <GlassCard className="md:p-8">
                <ContactForm />
              </GlassCard>
              <GlassCard className="h-full md:p-8">
                <h3 className="text-2xl font-medium text-white">Direct Channels</h3>
                <div className="mt-5 space-y-4 text-[#d0d9ea]">
                  <p>Email: hello@ambedkargpt.in</p>
                  <p>Support: support@ambedkargpt.in</p>
                  <p>Partnerships: partner@ambedkargpt.in</p>
                </div>
              </GlassCard>
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </MainLayout>
  );
}
