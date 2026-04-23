import { Mail, Phone, MapPin, Send, Clock, ArrowUpRight } from 'lucide-react';
import SectionLabel from './SectionLabel';

const CHANNELS = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'hello@ambedkargpt.in',
    href:  'mailto:hello@ambedkargpt.in',
  },
  {
    icon: Phone,
    label: 'Call us',
    value: '+91 90000 00000',
    href:  'tel:+919000000000',
  },
  {
    icon: MapPin,
    label: 'Visit us',
    value: 'New Delhi, India',
    href:  '#',
  },
];

function Field({ label, type = 'text', placeholder, rows, colSpan = 1 }) {
  const span = colSpan === 2 ? 'md:col-span-2' : '';
  return (
    <label className={`flex flex-col gap-2 ${span}`}>
      <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#7aa6e5]">
        {label}
      </span>
      {rows ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          className="w-full resize-none rounded-xl border border-[#1e3260]/70 bg-[#0a1330]/80 px-4 py-3 text-[14px] text-white placeholder:text-[#6f85a8] outline-none transition focus:border-[#3f6bd4] focus:bg-[#0c1735]/90 focus:shadow-[0_0_0_3px_rgba(63,107,212,0.18)]"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[#1e3260]/70 bg-[#0a1330]/80 px-4 py-3 text-[14px] text-white placeholder:text-[#6f85a8] outline-none transition focus:border-[#3f6bd4] focus:bg-[#0c1735]/90 focus:shadow-[0_0_0_3px_rgba(63,107,212,0.18)]"
        />
      )}
    </label>
  );
}

function ChannelRow({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-4 rounded-xl border border-[#1e3260]/60 bg-[#0a1330]/60 p-4 transition hover:-translate-y-0.5 hover:border-[#3a6bc4]/80 hover:bg-[#0d1a3f]/80"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2a4375]/70 bg-[#0c1735]/80 text-[#5fa5ff] shadow-[0_0_14px_rgba(63,159,255,0.25)]">
          <Icon size={16} strokeWidth={1.8} />
        </span>
        <div className="flex flex-col">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#7aa6e5]">
            {label}
          </span>
          <span className="mt-0.5 text-[14px] text-white transition group-hover:text-[#9dc3ff]">
            {value}
          </span>
        </div>
      </div>
      <ArrowUpRight
        size={16}
        className="shrink-0 text-[#7aa6e5] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
      />
    </a>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-64 max-w-4xl bg-[radial-gradient(circle_at_center,rgba(63,120,255,0.16),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1180px] px-6">
        {/* ── Centered header ── */}
        <SectionLabel>Contact</SectionLabel>

        <h2 className="mx-auto mt-8 max-w-[760px] text-center font-display text-[38px] font-semibold leading-[1.08] text-white md:text-[52px]">
          Let’s Build the Future of{' '}
          <span className="italic gradient-text-blue">Knowledge</span>
        </h2>

        <p className="mx-auto mt-6 max-w-[620px] text-center text-[15px] leading-7 text-[#a6b9d6]">
          Reach out for collaborations, partnerships, or platform support —
          we read every message and typically reply within one business day.
        </p>

        {/* ── Form + channels ── */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
          {/* Form card */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass-card relative overflow-hidden p-6 md:p-9"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#3f9fff]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#7b5cff]/10 blur-3xl" />

            <h3 className="font-display text-[22px] font-semibold text-white md:text-[24px]">
              Send us a message
            </h3>
            <p className="mt-1.5 text-[13px] text-[#9fb2d1]">
              Fill out the form and our team will get back to you shortly.
            </p>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Field label="Full Name" placeholder="Jane Doe" />
              <Field label="Email" type="email" placeholder="you@example.com" />
              <Field label="Subject" placeholder="How can we help?" colSpan={2} />
              <Field label="Message" rows={5} placeholder="Tell us what you need…" colSpan={2} />
            </div>

            <div className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-[11.5px] text-[#7aa6e5]">
                We never share your details with third parties.
              </p>
              <button
                type="submit"
                className="btn-gradient inline-flex h-12 items-center gap-2 rounded-xl px-7 text-[14px] font-semibold text-white"
              >
                Send Message
                <Send size={15} strokeWidth={2.2} />
              </button>
            </div>
          </form>

          {/* Channels card */}
          <div className="glass-card relative overflow-hidden p-6 md:p-8">
            <h3 className="font-display text-[22px] font-semibold text-white md:text-[24px]">
              Direct Channels
            </h3>
            <p className="mt-1.5 text-[13px] text-[#9fb2d1]">
              Prefer a faster route? Reach us on any of the channels below.
            </p>

            <ul className="mt-6 space-y-3">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <ChannelRow {...c} />
                </li>
              ))}
            </ul>

            {/* Response-time callout */}
            <div className="mt-7 flex items-start gap-3 rounded-xl border border-[#1e3260]/60 bg-gradient-to-br from-[#0a1330]/80 via-[#0d1a3f]/80 to-[#0a1330]/80 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2a4375]/70 bg-[#0c1735]/80 text-[#5fa5ff]">
                <Clock size={14} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7aa6e5]">
                  Response time
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#aec0de]">
                  Most inquiries answered within <span className="text-white">24 hours</span> on business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
