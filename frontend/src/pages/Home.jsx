import { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import RevealOnScroll from '../components/ui/RevealOnScroll';

import HeroSection         from '../components/landing/HeroSection';
import TrustedByStrip      from '../components/landing/TrustedByStrip';
import MissionStatement    from '../components/landing/MissionStatement';
import UseCasesGrid        from '../components/landing/UseCasesGrid';
import DalitHistoryMakers  from '../components/landing/DalitHistoryMakers';
import DalitCorpusSection  from '../components/landing/DalitCorpusSection';
import TeamSection         from '../components/landing/TeamSection';
import ContactSection      from '../components/landing/ContactSection';

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
        <UseCasesGrid />
      </RevealOnScroll>

      <RevealOnScroll delayMs={60}>
        <DalitHistoryMakers />
      </RevealOnScroll>

      <RevealOnScroll delayMs={60}>
        <DalitCorpusSection />
      </RevealOnScroll>

      <RevealOnScroll delayMs={60}>
        <TeamSection />
      </RevealOnScroll>

      <RevealOnScroll delayMs={60}>
        <ContactSection />
      </RevealOnScroll>
    </MainLayout>
  );
}
