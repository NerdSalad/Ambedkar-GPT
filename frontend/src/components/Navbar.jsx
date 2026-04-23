import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'HOME', sectionId: 'home' },
  { label: 'ABOUT', sectionId: 'about' },
  { label: 'DREAM CURATOR', sectionId: 'solutions' },
  { label: 'CONTACT', sectionId: 'contact' },
  { label: 'CHARITY', sectionId: 'charity' },
  { label: 'AMBEDKARVERSE', sectionId: 'ambedkarverse' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleSectionNav(sectionId) {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
      return;
    }
    sessionStorage.setItem('pending-section-scroll', sectionId);
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-20 border-b border-black/60 bg-[rgba(11,15,28,0.95)] backdrop-blur-md">
      <div className="mx-auto flex h-[82px] w-full max-w-[1440px] items-center justify-between px-6 md:h-[100px] md:px-20">
        <Link to="/" className="text-[34px] leading-none text-white [font-family:Alexandria,Inter,sans-serif]">
          <span className="text-white">Amb</span>
          <span className="text-[#2f9dff]">AI</span>
        </Link>

        <nav className="hidden items-center gap-7 text-xs tracking-wide text-white md:flex">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              type="button"
              onClick={() => handleSectionNav(item.sectionId)}
              className="text-white transition hover:text-[#9bc6ff]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            to="/login"
            className="inline-flex h-10 items-center justify-center rounded-[8px] border border-white/10 px-5 text-sm text-white"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-10 items-center justify-center rounded-[8px] bg-gradient-to-r from-[#00b8db] to-[#2b7fff] px-5 text-sm text-white"
          >
            Get Started
          </Link>
        </div>
      </div>
      <nav className="mx-auto flex w-full max-w-[1440px] items-center gap-4 overflow-x-auto px-6 pb-3 text-sm text-[#d6e3fa] md:hidden">
        {navItems.map((item) => (
          <button
            key={item.sectionId}
            type="button"
            onClick={() => handleSectionNav(item.sectionId)}
            className="whitespace-nowrap rounded-full border border-white/15 px-3 py-1.5 text-[#d6e3fa]"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
