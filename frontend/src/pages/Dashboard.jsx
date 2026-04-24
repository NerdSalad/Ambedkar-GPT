import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ImageIcon, Bookmark, Clock, LogOut } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

import Sidebar              from '../components/dashboard/Sidebar';
import Topbar               from '../components/dashboard/Topbar';
import StatCard             from '../components/dashboard/StatCard';
import SearchActivityChart  from '../components/dashboard/SearchActivityChart';
import DailyActivityChart   from '../components/dashboard/DailyActivityChart';
import CategoriesPieChart   from '../components/dashboard/CategoriesPieChart';
import ImageGenerationCard  from '../components/dashboard/ImageGenerationCard';
import ProfileCard          from '../components/dashboard/ProfileCard';
import PreferencesCard      from '../components/dashboard/PreferencesCard';
import RecentSearchesTable  from '../components/dashboard/RecentSearchesTable';
import SavedPromptsGrid     from '../components/dashboard/SavedPromptsGrid';
import AchievementsGrid     from '../components/dashboard/AchievementsGrid';
import DashboardFooter      from '../components/dashboard/DashboardFooter';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('dashboard');

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  // Derive a sensible display profile from the authenticated Firebase user,
  // with gentle fallbacks to the mock "Alex Morgan" shown in the mockup.
  const displayName =
    currentUser?.displayName?.trim() ||
    (currentUser?.email ? currentUser.email.split('@')[0] : null) ||
    'Alex Morgan';

  const displayEmail = currentUser?.email ?? 'alex.morgan@example.com';
  const joinedLabel  = (() => {
    const t = currentUser?.metadata?.creationTime;
    if (!t) return 'Joined March 2024';
    const d = new Date(t);
    return `Joined ${d.toLocaleString('en-US', { month: 'long', year: 'numeric' })}`;
  })();

  const topbarUser  = { name: displayName, tier: 'Premium' };
  const profileUser = {
    name:   displayName,
    email:  displayEmail,
    joined: joinedLabel,
    score:  '127',
  };

  const first = displayName.split(' ')[0];

  return (
    <div
      className="flex min-h-screen text-[#e5e7eb]"
      style={{ background: 'radial-gradient(1200px 700px at 20% 0%, #0d1636 0%, #070b1c 55%, #05081a 100%)' }}
    >
      <Sidebar active={active} onSelect={setActive} />

      <div className="relative flex-1 min-w-0 px-6 md:px-10">
        {/* ambient glows */}
        <div className="pointer-events-none fixed top-0 right-0 h-[420px] w-[420px] rounded-full bg-[#3f9fff]/10 blur-[130px]" />
        <div className="pointer-events-none fixed bottom-0 left-[22%] h-[360px] w-[360px] rounded-full bg-[#7b5cff]/10 blur-[130px]" />

        <Topbar user={topbarUser} />

        {/* ── Welcome ── */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[28px] md:text-[32px] font-bold leading-tight tracking-tight">
              <span className="text-white">Welcome back, </span>
              <span className="gradient-text-blue">{first}</span>
            </h1>
            <p className="mt-1.5 text-[13.5px] text-[#8b94b8]">
              Your AI journey continues. Let's make today productive and insightful!
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-[#1e3260]/70 bg-[#0d1531]/50 px-4 py-2 text-[12.5px] font-medium text-[#8b94b8] transition hover:border-[#3a6bc4]/60 hover:text-white"
          >
            <LogOut size={13} strokeWidth={1.9} />
            Log out
          </button>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Searches"
            value="1,234"
            delta="+12.5%"
            icon={<Search size={15} strokeWidth={2} />}
            iconGradient="bg-gradient-to-br from-[#3f9fff] to-[#2664d6]"
          />
          <StatCard
            label="Images Generated"
            value="1,248"
            delta="+8.3%"
            icon={<ImageIcon size={15} strokeWidth={2} />}
            iconGradient="bg-gradient-to-br from-[#a855f7] to-[#7b3fd4]"
          />
          <StatCard
            label="Saved Prompts"
            value="87"
            delta="+15.2%"
            icon={<Bookmark size={15} strokeWidth={2} />}
            iconGradient="bg-gradient-to-br from-[#22c55e] to-[#16a34a]"
          />
          <StatCard
            label="Hours on Platform"
            value="142"
            delta="+5.7%"
            icon={<Clock size={15} strokeWidth={2} />}
            iconGradient="bg-gradient-to-br from-[#ffb056] to-[#ff7a2d]"
          />
        </div>

        {/* ── Charts row ── */}
        <div className="mt-5 grid gap-5 grid-cols-1 lg:grid-cols-2">
          <SearchActivityChart />
          <DailyActivityChart />
        </div>

        {/* ── Categories pie + image generation ── */}
        <div className="mt-5 grid gap-5 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CategoriesPieChart />
          </div>
          <ImageGenerationCard />
        </div>

        {/* ── Profile + Preferences ── */}
        <div className="mt-5 grid gap-5 grid-cols-1 lg:grid-cols-3">
          <ProfileCard user={profileUser} />
          <div className="lg:col-span-2">
            <PreferencesCard />
          </div>
        </div>

        {/* ── Recent searches ── */}
        <div className="mt-5">
          <RecentSearchesTable />
        </div>

        {/* ── Saved prompts ── */}
        <div className="mt-5">
          <SavedPromptsGrid />
        </div>

        {/* ── Achievements ── */}
        <div className="mt-5">
          <AchievementsGrid />
        </div>

        <DashboardFooter />
      </div>
    </div>
  );
}
