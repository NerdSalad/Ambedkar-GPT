import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

// eager-load image assets so the build bundles them
const imageModules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', {
  eager: true,
});
const portraitSrc = imageModules['../assets/images/ambedkar-portrait.png']?.default ?? null;
const statueSrc   = imageModules['../assets/images/ambedkar-statue.png']?.default ?? null;
const logoSrc     = imageModules['../assets/images/logo-animation.png']?.default ?? null;

// Radar-ring logo image sourced from the design asset
function LogoMark({ size = 44 }) {
  return (
    <span
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {logoSrc ? (
        <img
          src={logoSrc}
          alt="AmbedkarGPT"
          className="h-full w-full object-contain drop-shadow-[0_0_18px_rgba(63,159,255,0.55)]"
        />
      ) : (
        <span className="h-3 w-3 rounded-full bg-[#3f9fff]" />
      )}
    </span>
  );
}

function BrandLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[26px] font-semibold leading-none tracking-tight md:text-[30px]">
        <span className="text-white">Ambedkar</span>
        <span className="ml-1 gradient-text-cyan">GPT</span>
      </span>
    </div>
  );
}

// Framed image with a soft blue border glow.
// `variant` lets us tune the blend for the signup statue (whose native beige/stone
// background would otherwise clash with the dark card).
function FramedImage({ src, label, variant = 'login' }) {
  const [error, setError] = useState(false);
  const isSignup = variant === 'signup';

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* ambient glow behind the frame */}
      <div className="pointer-events-none absolute -inset-8 rounded-[30px] bg-[radial-gradient(circle,rgba(95,140,255,0.22)_0%,transparent_70%)] blur-xl" />

      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#2a4375]/60 bg-[#0a1430] shadow-[0_26px_68px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(115,160,240,0.08)]">
        {src && !error ? (
          <img
            src={src}
            alt={label}
            onError={() => setError(true)}
            className="h-full w-full object-cover object-center"
            style={{
              // statue photo is flatter / lighter — nudge it toward the card tones
              filter: isSignup
                ? 'brightness(0.88) saturate(1.15) contrast(1.05) hue-rotate(-8deg)'
                : 'brightness(0.98) saturate(1.05)',
            }}
          />
        ) : (
          <ImagePlaceholder label={label} />
        )}

        {/* Full-frame navy tint — kills the signup statue's beige background and
            gives the portrait a tiny extra warmth of the card palette. Heavier
            on signup than login. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isSignup
              ? 'linear-gradient(180deg, rgba(10,20,48,0.35) 0%, rgba(10,20,48,0.15) 45%, rgba(5,10,28,0.55) 100%)'
              : 'linear-gradient(180deg, rgba(10,20,48,0.12) 0%, rgba(10,20,48,0) 45%, rgba(5,10,28,0.45) 100%)',
          }}
        />

        {/* edge highlights */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/5 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050a18]/70 to-transparent" />
      </div>
    </div>
  );
}

export default function BrandPanel({ variant = 'login' }) {
  const isSignup = variant === 'signup';
  const src = isSignup ? statueSrc : portraitSrc;
  const label = isSignup ? 'Ambedkar Statue' : 'Ambedkar Portrait';

  return (
    <div className="relative flex h-full flex-col px-8 pt-10 pb-10 md:px-10 md:pt-12 md:pb-12">
      <div className="flex justify-center md:justify-start">
        <BrandLogo />
      </div>

      <div className="mt-8 flex flex-1 items-center justify-center">
        <FramedImage src={src} label={label} variant={variant} />
      </div>

      <div className="mt-10 text-center">
        <p className="font-serif text-[15px] italic text-[#9fb5e0]">
          “Educate, Agitate, Organize”
        </p>
        <p className="mt-1 text-[11.5px] tracking-[0.18em] uppercase text-[#6b80ab]">
          — Dr. B.R. Ambedkar
        </p>
        <div className="mt-6">
          <p className="font-display text-[30px] font-semibold leading-[1.1] text-white md:text-[34px]">
            Empowering Minds with
          </p>
          <p className="font-display text-[30px] font-semibold italic leading-[1.1] gradient-text-cyan md:text-[34px]">
            Knowledge &amp; Equality
          </p>
        </div>
      </div>
    </div>
  );
}
