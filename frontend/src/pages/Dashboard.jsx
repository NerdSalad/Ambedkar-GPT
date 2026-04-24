import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  const displayName =
    currentUser?.displayName ||
    currentUser?.email ||
    currentUser?.phoneNumber ||
    'User';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#05081a] px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#1e3260]/60 bg-[#0a1330]/80 p-10 text-center shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a2a5e] border border-[#2a4375]/60">
          <span className="text-2xl font-bold text-white">
            {displayName[0]?.toUpperCase()}
          </span>
        </div>

        <h1 className="font-display text-[32px] font-bold text-white">
          Welcome back!
        </h1>
        <p className="mt-2 text-sm text-[#8b94b8]">{displayName}</p>

        {currentUser?.email && !currentUser.emailVerified && (
          <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-xs text-yellow-300">
            Please verify your email — check your inbox for the verification link.
          </div>
        )}

        <p className="mt-6 text-[13px] text-[#6b80ab]">
          The AmbedkarGPT chat experience is coming soon.
        </p>

        <button
          onClick={handleLogout}
          className="mt-8 w-full rounded-xl border border-[#2a4375]/60 bg-[#0c1735] py-3 text-sm font-medium text-[#8b94b8] transition hover:bg-[#111f4a] hover:text-white"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
