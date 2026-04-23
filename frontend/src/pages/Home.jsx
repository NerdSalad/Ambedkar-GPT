import { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import RevealOnScroll from '../components/ui/RevealOnScroll';

import HeroSection        from '../components/landing/HeroSection';
import TrustedByStrip     from '../components/landing/TrustedByStrip';
import MissionStatement   from '../components/landing/MissionStatement';
import UseCasesGrid       from '../components/landing/UseCasesGrid';
import PillarsCarousel    from '../components/landing/PillarsCarousel';
import DalitCorpusSection from '../components/landing/DalitCorpusSection';
import TeamSection        from '../components/landing/TeamSection';

import ambedkarPortrait from '../assets/images/ambedkar-portrait.png';

export default function Home() {
  // support deep-linking to a section after navigating from another route
  useEffect(() => {
    const pending = sessionStorage.getItem('pending-section-scroll');
    if (!pending) return;
    const t = setTimeout(() => {
      const target = document.getElementById(pending);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      sessionStorage.removeItem('pending-section-scroll');
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <MainLayout>
      {/* Hero occupies full bleed — no outer container padding */}
      <HeroSection />

      <RevealOnScroll>
        <TrustedByStrip />
      </RevealOnScroll>

      <RevealOnScroll delayMs={60}>
        <MissionStatement
          label="MISSION STATEMENT"
          titlePrimary="Empowering with"
          titleAccent="Truth"
          description="Our mission is to deliver authentic, source-backed knowledge directly from original writings. Using advanced AI, we transform complex ideas into clear, reliable, and actionable insights. Every response is grounded in truth, ensuring transparency, trust, and intellectual integrity."
          image={ambedkarPortrait}
          imageLabel="JAY BHIM"
        />
      </RevealOnScroll>

      <RevealOnScroll delayMs={60}>
        <MissionStatement
          label="VISION STATEMENT"
          titlePrimary="AI-Powered Dalit"
          titleAccent="Literature Archive"
          description="We envision creating the Indian Dalit Literature Corpus (IDLC) — the world's first comprehensive digital archive dedicated to preserving and amplifying Dalit literature. By leveraging AI, we transform fragmented and inaccessible works into a structured, searchable, and enduring knowledge system."
          imageLabel="IDLC"
          imageFirst
        />
      </RevealOnScroll>

      <RevealOnScroll delayMs={60}>
        <UseCasesGrid />
      </RevealOnScroll>

      <RevealOnScroll delayMs={60}>
        <PillarsCarousel />
      </RevealOnScroll>

      <RevealOnScroll delayMs={60}>
        <DalitCorpusSection />
      </RevealOnScroll>

      <RevealOnScroll delayMs={60}>
        <TeamSection />
      </RevealOnScroll>
    </MainLayout>
  );
}
