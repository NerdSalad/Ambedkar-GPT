import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090d19]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-[91px]">
        <div>
          <p className="text-2xl text-white [font-family:Alexandria,Inter,sans-serif]">AB AI</p>
          <p className="mt-2 text-sm text-[#95a8ca]">Empowering Minds with Knowledge and Equality.</p>
        </div>

        <nav className="flex flex-wrap items-center gap-4 text-sm text-[#c9d8f2]">
          <Link to="/about" className="hover:text-white">
            About
          </Link>
          <Link to="/solutions" className="hover:text-white">
            Solutions
          </Link>
          <Link to="/resources" className="hover:text-white">
            Resources
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
