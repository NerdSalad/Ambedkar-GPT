import BrandPanel from './BrandPanel';
import BackgroundDecorations from './BackgroundDecorations';

export default function AuthLayout({ children, brandSide = 'right', brandVariant = 'login' }) {
  const brandPanel = (
    <div className="w-full md:w-[52%] relative">
      <BrandPanel variant={brandVariant} />
    </div>
  );

  const formPanel = (
    <div className="w-full md:w-[48%] flex items-center justify-center px-6 py-10 md:px-12 lg:px-14">
      <div className="w-full max-w-xl p-2 md:p-3">
        {children}
      </div>
    </div>
  );

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#0a0e1b' }}
    >
      <BackgroundDecorations variant={brandVariant} />
      <div
        className="absolute left-0 right-0 bottom-0 h-28 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 100%, rgba(96,165,250,0.14) 0%, rgba(59,130,246,0.05) 35%, transparent 75%)',
        }}
      />
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen w-full">
        {brandSide === 'left' ? (
          <>
            {brandPanel}
            {formPanel}
          </>
        ) : (
          <>
            {formPanel}
            {brandPanel}
          </>
        )}
      </div>
    </div>
  );
}
