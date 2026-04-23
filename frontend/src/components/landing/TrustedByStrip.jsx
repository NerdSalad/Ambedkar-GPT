import SectionLabel from './SectionLabel';
import Sparkle from './Sparkle';
import indiaAiLogo     from '../../assets/images/indiaai-logo.png';
import digitalIndiaLogo from '../../assets/images/digital-india-logo.png';

// "Trusted By" partners strip — centered pill label + logos with sparkle separators.
export default function TrustedByStrip() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2d7dfb]/12 blur-[120px]" />

      <div className="relative mx-auto max-w-[1180px] px-6">
        <SectionLabel>Trusted By</SectionLabel>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20">
          <Sparkle size={18} color="#8fbfff" className="opacity-70" />

          <img
            src={indiaAiLogo}
            alt="INDIAai"
            className="h-10 w-auto object-contain md:h-12"
          />

          <Sparkle size={18} color="#8fbfff" className="opacity-70" />

          <img
            src={digitalIndiaLogo}
            alt="Digital India"
            className="h-10 w-auto object-contain md:h-12"
          />

          <Sparkle size={18} color="#8fbfff" className="opacity-70" />
        </div>
      </div>
    </section>
  );
}
