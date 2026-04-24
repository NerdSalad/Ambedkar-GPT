import { useEffect } from 'react';
import { ShieldCheck, Sparkles, BookOpen, Library } from 'lucide-react';

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

import missionImg from '../assets/images/mission-jay-bhim.png';
import visionImg  from '../assets/images/vision-ambedkar.png';
import purposeImg from '../assets/images/purpose-ambedkar.png';

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

      {/* ── Mission ── */}
      <div id="about">
        <RevealOnScroll delayMs={60}>
          <MissionStatement
            label="MISSION STATEMENT"
            titlePrimary="Empowering with"
            titleAccent="Truth"
            description="Our mission is to deliver authentic, source-backed knowledge directly from original writings. Using advanced AI, we transform complex ideas into clear, reliable, and actionable insights. Every response is grounded in truth, ensuring transparency, trust, and intellectual integrity."
            image={missionImg}
            imageAlt="Jay Bhim poster featuring Dr. B.R. Ambedkar"
            banner="JAY BHIM"
            showBanner
            chips={[
              { icon: ShieldCheck, text: 'Verified insights with exact source citations' },
              { icon: Sparkles,    text: 'AI-powered simplification of complex knowledge' },
            ]}
          />
        </RevealOnScroll>
      </div>

      {/* ── Vision ── */}
      <RevealOnScroll delayMs={60}>
        <MissionStatement
          label="VISION STATEMENT"
          titlePrimary="AI-Powered Dalit"
          titleAccent="Literature Archive"
          description="We envision creating the Indian Dalit Literature Corpus (IDLC) — the world's first comprehensive digital archive dedicated to preserving and amplifying Dalit literature. By leveraging AI, we aim to transform fragmented and inaccessible works into a structured, searchable, and enduring knowledge system."
          image={visionImg}
          imageAlt="Portrait of Dr. B.R. Ambedkar holding the Constitution"
          imagePosition="object-[50%_22%]"
          chips={[
            { icon: Library,  text: 'Long-term preservation with accessible, searchable knowledge' },
            { icon: Sparkles, text: 'First AI-powered, structured archive of Dalit literature' },
          ]}
        />
      </RevealOnScroll>

      {/* ── Purpose ── */}
      <RevealOnScroll delayMs={60}>
        <MissionStatement
          label="PURPOSE STATEMENT"
          titlePrimary="Ambedkar's Legacy,"
          titleAccent="AI-Powered"
          description="Our purpose is to preserve and amplify the legacy of B. R. Ambedkar by transforming his writings into a searchable, accessible knowledge system. We go beyond digitization — democratizing knowledge to empower individuals and advance equality through education."
          image={purposeImg}
          imageAlt="Dr. B.R. Ambedkar with the Indian flag and Ashoka Chakra"
          chips={[
            { icon: ShieldCheck, text: 'Source-backed insights ensuring transparency, authenticity, and trust' },
            { icon: BookOpen,    text: "AI-powered transformation of Ambedkar's complete works into usable knowledge" },
          ]}
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
