import { Link } from 'react-router-dom';
import {
  BarChart2, Users, Sliders, Activity,
  Zap, Target, CheckCircle2, ShieldCheck, Layers,
} from 'lucide-react';
import Sparkle  from './Sparkle';
import CountUp  from './CountUp';
import creator1 from '../../assets/images/creator1.png';
import creator2 from '../../assets/images/creator2.png';
import creator3 from '../../assets/images/creator3.png';

const FEATURE_CARDS = [
  { icon: BarChart2, title: 'Analytics',       sub: 'Real-time insights'   },
  { icon: Users,     title: 'Audience Growth', sub: 'AI-powered tools'     },
  { icon: Sliders,   title: 'Optimization',    sub: 'Better content'       },
  { icon: Activity,  title: 'Tracking',        sub: 'Performance metrics'  },
  { icon: Zap,       title: 'Automation',      sub: 'Save time'            },
  { icon: Target,    title: 'Goal Setting',    sub: 'Track milestones'     },
];

const STATS = [
  { end: 500,  format: (v) => `${Math.round(v)}K+`, label: 'Active Creators'  },
  { end: 98,   format: (v) => `${Math.round(v)}%`,  label: 'Growth Rate'      },
  { end: 10,   format: (v) => `${Math.round(v)}M+`, label: 'Content Pieces'   },
  { end: 150,  format: (v) => `${Math.round(v)}+`,  label: 'Countries'        },
];

const CHECKLIST = [
  'Increase engagement by up to 300%',
  'Save 15+ hours per week with automation',
  'Grow your audience 10x faster',
];

const PILLARS = [
  { icon: Zap,        label: 'Lightning Fast'   },
  { icon: ShieldCheck, label: 'Secure Platform' },
  { icon: Layers,     label: 'Expert Support'   },
];

const IMAGES = [creator1, creator2, creator3];

export default function KnowledgeSection() {
  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-28">
      {/* ambient glows */}
      <div className="pointer-events-none absolute left-[20%] top-[30%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2d7dfb]/8 blur-[140px]" />
      <div className="pointer-events-none absolute right-[10%] bottom-[20%] h-[380px] w-[380px] rounded-full bg-[#1a5fff]/6 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1180px] items-start gap-12 px-6 md:grid-cols-[1fr_1.18fr] md:gap-10">

        {/* ─── LEFT COLUMN ─── */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2a4a8a]/70 bg-[#0c1735]/80 px-4 py-1.5 text-[12px] text-[#7ab0ff]">
            <Sparkle size={12} color="#6b9fff" />
            Trusted by 500K+ creators worldwide
          </div>

          {/* Headline */}
          <h2 className="mt-6 font-display text-[40px] font-bold leading-[1.1] tracking-tight text-white md:text-[50px]">
            Grow Your Content
            <br />
            <span className="gradient-text-blue italic">Creator Journey</span>
          </h2>

          {/* Description */}
          <p className="mt-5 text-[14.5px] leading-[1.85] text-[#9fb8dc]">
            Transform your passion into a thriving career with powerful analytics,
            automation, and growth tools designed for modern content creators.
          </p>

          {/* Stats with CountUp */}
          <div className="mt-9 grid grid-cols-2 gap-x-10 gap-y-6">
            {STATS.map(({ end, format, label }) => (
              <div key={label}>
                <p className="font-display text-[32px] font-bold leading-none text-[#4d94ff]">
                  <CountUp end={end} format={format} durationMs={1600} />
                </p>
                <p className="mt-1 text-[13px] text-[#7a98bc]">{label}</p>
              </div>
            ))}
          </div>

          {/* Checklist */}
          <ul className="mt-8 space-y-3.5">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-[#aec3e0]">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#4d94ff]" />
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/signup"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#2d6fff] px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_0_24px_rgba(45,111,255,0.4)] transition-all duration-300 hover:bg-[#3d7fff] hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(45,111,255,0.6)]"
          >
            Get Started Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="flex flex-col gap-3">

          {/* Feature cards 2×3 */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURE_CARDS.map(({ icon: Icon, title, sub }, i) => (
              <div
                key={title}
                className="hover-lift rounded-xl border border-[#1e3260]/70 bg-[#070f24]/80 p-4 transition-all duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2a4375]/60 bg-[#0c1a3e]/80 text-[#5fa5ff]">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <p className="mt-3 text-[13.5px] font-semibold text-white">{title}</p>
                <p className="mt-0.5 text-[11.5px] text-[#5a7a9e]">{sub}</p>
              </div>
            ))}
          </div>

          {/* Image strip */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {IMAGES.map((src, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl border border-[#1e3260]/60 bg-[#070f24]">
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="rounded-xl border border-[#1e3260]/70 bg-[#070f24]/80 p-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="#f5a623" aria-hidden="true">
                  <path d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885 3.91 10.51l.59-3.44L2 4.632l3.455-.502z" />
                </svg>
              ))}
            </div>
            <p className="mt-2.5 text-[12.5px] italic leading-relaxed text-[#a8c0de]">
              "This platform helped me grow from 10K to 500K subscribers in just 8 months.
              The analytics are game-changing!"
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2d6fff] to-[#6b9fff] text-[12px] font-bold text-white">
                S
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-white">Sarah Martinez</p>
                <p className="text-[11px] text-[#5a7a9e]">YouTube Creator</p>
              </div>
            </div>
          </div>

          {/* Bottom pillars */}
          <div className="grid grid-cols-3 gap-3">
            {PILLARS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl border border-[#1e3260]/60 bg-[#070f24]/60 py-3">
                <Icon size={18} className="text-[#f5a623]" />
                <span className="text-[11.5px] text-[#7a98bc]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
