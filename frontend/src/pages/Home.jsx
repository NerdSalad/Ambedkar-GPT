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
          <section
            id="home"
            className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_5%,rgba(41,108,255,0.18),rgba(6,11,26,0.98)_42%),linear-gradient(180deg,#050a18_0%,#030611_100%)] px-4 pb-12 pt-8 md:min-h-[700px] md:px-10 md:pb-14 md:pt-11"
          >
            <div className="pointer-events-none absolute inset-x-0 top-[122px] h-px bg-[linear-gradient(90deg,transparent,rgba(33,183,255,0.48),transparent)] blur-[0.4px]" />
            <div className="pointer-events-none absolute -left-10 -top-16 h-[420px] w-[420px] rounded-full bg-[#2d7dfb]/20 blur-[130px]" />
            <div className="pointer-events-none absolute -right-16 top-0 h-[420px] w-[420px] rounded-full bg-[#1d66de]/20 blur-[120px]" />
            <div
              className="hero-line-scroll pointer-events-none absolute -left-20 top-[252px] h-[320px] w-[1320px] rounded-[100%] border-t border-[#1d4d9a]/70"
              style={{ transform: `translateX(${Math.min(scrollY * 0.035, 28)}px)` }}
            />
            <div
              className="hero-line-scroll pointer-events-none absolute -left-24 top-[280px] h-[360px] w-[1380px] rounded-[100%] border-t border-[#1d4d9a]/62"
              style={{ transform: `translateX(${Math.min(scrollY * 0.03, 24)}px)` }}
            />
            <div
              className="hero-line-scroll pointer-events-none absolute -left-28 top-[308px] h-[400px] w-[1440px] rounded-[100%] border-t border-[#1d4d9a]/56"
              style={{ transform: `translateX(${Math.min(scrollY * 0.024, 20)}px)` }}
            />
            <div
              className="hero-line-scroll pointer-events-none absolute -left-32 top-[336px] h-[440px] w-[1500px] rounded-[100%] border-t border-[#1d4d9a]/50"
              style={{ transform: `translateX(${Math.min(scrollY * 0.02, 16)}px)` }}
            />
            <div className="float-slow pulse-glow absolute left-[13%] top-[21%] flex h-10 w-10 items-center justify-center rounded-xl border border-[#2d73c8]/80 bg-[#0b2148]/75 text-[#79c4ff] shadow-[0_0_28px_rgba(50,142,255,0.42)]">⌂</div>
            <div className="float-slow-delayed pulse-glow absolute right-[14%] top-[19%] flex h-10 w-10 items-center justify-center rounded-xl border border-[#2d73c8]/80 bg-[#0b2148]/75 text-[#79c4ff] shadow-[0_0_28px_rgba(50,142,255,0.42)]">◫</div>
            <div className="float-slow absolute left-[22%] top-[63%] flex h-10 w-10 items-center justify-center rounded-xl border border-[#2d73c8]/70 bg-[#0b2148]/65 text-[#79c4ff] shadow-[0_0_24px_rgba(50,142,255,0.34)]">🛡</div>
            <div className="float-slow-delayed absolute right-[15%] top-[52%] flex h-10 w-10 items-center justify-center rounded-xl border border-[#2d73c8]/70 bg-[#0b2148]/65 text-[#79c4ff] shadow-[0_0_24px_rgba(50,142,255,0.34)]">⚡</div>

            <div className="relative z-10 mx-auto flex max-w-[1150px] flex-col items-center text-center md:pt-10">
              <div className="mb-11 inline-flex items-center gap-2 rounded-full border border-[#3a5e94] bg-[#0f1d3b]/75 px-5 py-2 text-sm text-[#d3e4ff] shadow-[0_0_22px_rgba(43,126,255,0.2)]">
                <span className="text-[#4ea7ff]">✦</span>
                Trusted by AI Power Users Worldwide
              </div>
              <h1 className="max-w-[1020px] text-[50px] font-semibold leading-[1.02] text-white md:text-[72px]">
                Empower Through <span className="bg-gradient-to-r from-[#c9dcff] to-[#3f86ff] bg-clip-text text-transparent">Knowledge.</span>
                <br />
                Scale with Intelligent AI
              </h1>
              <p className="mt-8 max-w-[860px] text-base leading-7 text-[#cad9f3] md:text-[31px] md:leading-[1.45] md:[font-size:31px]">
                Where broken parenting systems meet intelligent AI.
                <br />
                Get instant answers, personalized guidance, and expert-backed insights - so every parent can
                <br />
                make confident decisions.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                <button className="h-12 rounded-lg border border-[#5f8cd2] bg-transparent px-8 text-base text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#84b0f1] hover:shadow-[0_10px_30px_rgba(59,145,255,0.24)]">
                  Watch Demo ▷
                </button>
                <button className="h-12 rounded-lg bg-gradient-to-r from-[#0a7dff] to-[#3a9fff] px-8 text-base text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_12px_36px_rgba(17,122,255,0.46)]">
                  BheemBot
                </button>
              </div>
              <div className="mt-9 flex items-center gap-10 md:hidden">
                <div>
                  <p className="text-3xl font-semibold text-[#3f9fff]">4.8+</p>
                  <p className="mt-1 text-xs text-[#90a8cc]">Stars Rating</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-[#3f9fff]">24k+</p>
                  <p className="mt-1 text-xs text-[#90a8cc]">Satisfied Customer</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 left-8 hidden items-end gap-11 md:flex">
              <div>
                <p className="text-[42px] font-semibold leading-none text-[#3f9fff]">4.8+</p>
                <p className="mt-1 text-xs text-[#90a8cc]">Stars Rating</p>
              </div>
              <div>
                <p className="text-[42px] font-semibold leading-none text-[#3f9fff]">24k+</p>
                <p className="mt-1 text-xs text-[#90a8cc]">Satisfied Customer</p>
              </div>
            </div>

            <div className="absolute bottom-1 right-7 hidden w-[252px] rounded-xl border border-[#466399]/45 bg-[rgba(16,24,45,0.45)] px-4 py-3 backdrop-blur-md shadow-[0_0_30px_rgba(48,104,201,0.22)] md:block">
              <p className="text-[31px] font-semibold leading-none text-white">BEST AI TOOLS</p>
              <p className="mt-2 text-[10px] leading-relaxed text-[#b8c3d8]">
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
