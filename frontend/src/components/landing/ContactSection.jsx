import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SectionLabel from './SectionLabel';

const CHANNELS = [
  { icon: Mail,   label: 'Email',    value: 'hello@ambedkargpt.in',     href: 'mailto:hello@ambedkargpt.in' },
  { icon: Phone,  label: 'Support',  value: '+91 90000 00000',          href: 'tel:+919000000000' },
  { icon: MapPin, label: 'Location', value: 'New Delhi, India',         href: '#' },
];

function Input({ label, type = 'text', placeholder, name, rows }) {
  const base =
    'w-full rounded-xl border border-[#1e3260]/70 bg-[#0a1330]/80 px-4 py-3 text-[14px] text-white placeholder:text-[#6f85a8] outline-none transition focus:border-[#3f6bd4] focus:shadow-[0_0_0_3px_rgba(63,107,212,0.18)]';
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#7aa6e5]">
        {label}
      </span>
      {rows ? (
        <textarea name={name} rows={rows} placeholder={placeholder} className={`${base} resize-none`} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} className={base} />
      )}
    </label>
  );
}

// Contact section — centered header, glass card with form on left + direct channels on right.
export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-64 max-w-4xl bg-[radial-gradient(circle_at_center,rgba(63,120,255,0.15),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1180px] px-6">
        <SectionLabel>Contact</SectionLabel>

        <h2 className="mx-auto mt-8 max-w-[760px] text-center font-display text-[38px] font-semibold leading-[1.08] text-white md:text-[52px]">
          Let’s Build the Future of{' '}
          <span className="italic gradient-text-blue">Knowledge</span>
        </h2>

        <p className="mx-auto mt-6 max-w-[640px] text-center text-[15px] leading-7 text-[#a6b9d6]">
          Reach out for collaborations, partnerships, or platform support —
          we read every message.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass-card relative overflow-hidden p-6 md:p-8"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#3f9fff]/15 blur-3xl" />

            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Name"    name="name"    placeholder="Jane Doe" />
              <Input label="Email"   name="email"   type="email" placeholder="you@example.com" />
              <div className="md:col-span-2">
                <Input label="Subject" name="subject" placeholder="How can we help?" />
              </div>
              <div className="md:col-span-2">
                <Input label="Message" name="message" rows={5} placeholder="Tell us what you need…" />
              </div>
            </div>

            <button
              type="submit"
              className="btn-gradient mt-6 inline-flex h-12 items-center gap-2 rounded-xl px-7 text-[14px] font-semibold text-white"
            >
              Send Message
              <Send size={15} strokeWidth={2.2} />
            </button>
          </form>

          {/* Direct channels */}
          <div className="glass-card relative overflow-hidden p-6 md:p-8">
            <h3 className="font-display text-[22px] font-semibold text-white">
              Direct Channels
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#9fb2d1]">
              Prefer a quicker route? Use any of the channels below.
            </p>

            <ul className="mt-6 space-y-4">
              {CHANNELS.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-start gap-3 rounded-xl border border-[#1e3260]/60 bg-[#0a1330]/60 p-3 transition hover:border-[#3a6bc4]/80 hover:bg-[#0d1a3f]/80"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#2a4375]/70 bg-[#0c1735]/80 text-[#5fa5ff] shadow-[0_0_14px_rgba(63,159,255,0.25)]">
                      <Icon size={15} strokeWidth={1.8} />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#7aa6e5]">
                        {label}
                      </span>
                      <span className="mt-0.5 text-[14px] text-white transition group-hover:text-[#9dc3ff]">
                        {value}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-[#1e3260]/60 bg-[#0a1330]/60 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7aa6e5]">
                Response time
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#aec0de]">
                We respond to most inquiries within 24 hours on business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
