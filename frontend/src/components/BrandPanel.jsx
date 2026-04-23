import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

const imageModules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true });
const portraitSrc = imageModules['../assets/images/ambedkar-portrait.png']?.default ?? null;
const statueSrc   = imageModules['../assets/images/ambedkar-statue.png']?.default ?? null;
const authLogoSrc = imageModules['../assets/images/auth-logo.png']?.default ?? null;

function Logo({ variant = 'login' }) {
  const isSignup = variant === 'signup';

  return (
    <div className={`flex items-center ${isSignup ? 'gap-3' : 'gap-3.5'}`}>
      <div className={`${isSignup ? 'w-11 h-11' : 'w-14 h-14'} rounded-full overflow-hidden`}>
        {authLogoSrc ? (
          <img src={authLogoSrc} alt="AmbedkarGPT Logo" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a2654, #2a3566)' }}>
            <span className="text-xs font-bold" style={{ color: '#6b8aff' }}>AG</span>
          </div>
        )}
      </div>
      <span className={`${isSignup ? 'text-[48px]' : 'text-[40px]'} font-bold leading-none`}>
        <span className="text-white">Ambedkar</span>
        <span className="gradient-text">GPT</span>
      </span>
    </div>
  );
}

function ImageSlot({ src, label, variant = 'login' }) {
  const [imgError, setImgError] = useState(false);
  const isSignup = variant === 'signup';

  return (
    <div className="w-full aspect-4/5 rounded-2xl overflow-hidden">
      {src && !imgError ? (
        <img
          src={src}
          alt={label}
          onError={() => setImgError(true)}
          className={`w-full h-full ${isSignup ? 'object-contain p-1.5' : 'object-cover'}`}
          style={isSignup ? { objectPosition: 'center bottom' } : undefined}
        />
      ) : (
        <ImagePlaceholder label={label} />
      )}
    </div>
  );
}

export default function BrandPanel({ variant = 'login' }) {
  const isSignup = variant === 'signup';

  return (
    <div className={`flex flex-col h-full ${isSignup ? 'px-10 pt-8 pb-10' : 'px-10 pt-8 pb-10'}`}>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">

        <div className={`w-full ${isSignup ? 'max-w-[500px] gap-2' : 'max-w-[500px] gap-4'} flex flex-col`}>
          <Logo variant={variant} />
          {/* Glow wrapper — the radial gradient bleeds ~55px beyond the card
              on every side. overflow-visible lets it escape the container. */}
          <div className="relative" style={{ overflow: 'visible' }}>
            {/* Soft ambient glow — only here, nowhere else on the page */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: '-55px',
                background: 'radial-gradient(ellipse at center, rgba(200,215,255,0.09) 0%, rgba(200,215,255,0.04) 40%, transparent 70%)',
                zIndex: 0,
              }}
            />
            <div className="relative" style={{ zIndex: 1 }}>
              <ImageSlot
                src={variant === 'signup' ? statueSrc : portraitSrc}
                label={variant === 'signup' ? 'Ambedkar Statue' : 'Ambedkar Portrait'}
                variant={isSignup ? 'login' : variant}
              />
            </div>
          </div>
        </div>

        <div className={`text-center ${isSignup ? 'space-y-3' : 'space-y-5'}`}>
          <div>
            <p className="italic text-sm leading-snug" style={{ color: '#8b94b8' }}>
              "Educate, Agitate, Organize"
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#6b7db3' }}>— Dr. B.R. Ambedkar</p>
          </div>
          <div>
            <p className="text-4xl font-bold leading-tight text-white">Empowering Minds with</p>
            <p className="text-4xl font-bold leading-tight gradient-text">Knowledge &amp; Equality</p>
          </div>
        </div>
      </div>
    </div>
  );
}
