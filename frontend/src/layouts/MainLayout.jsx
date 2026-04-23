import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05081a] text-white">
      <Navbar />
      <div className="relative z-10">{children}</div>
      <Footer />
    </main>
  );
}
