import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0e1b]">
      <div className="pointer-events-none absolute left-[-280px] top-[-180px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.25)_0%,rgba(30,64,175,0.12)_35%,transparent_68%)] blur-[80px]" />
      <div className="pointer-events-none absolute bottom-[-300px] right-[-220px] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22)_0%,rgba(30,58,138,0.10)_38%,transparent_70%)] blur-[90px]" />
      <Navbar />
      <div className="relative z-10">{children}</div>
      <Footer />
    </main>
  );
}
