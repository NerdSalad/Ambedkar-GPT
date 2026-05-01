import { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function friendlyError(err) {
  const detail = err?.response?.data?.detail || err?.message || String(err);
  const msg = detail.toLowerCase();
  if (msg.includes('already') || msg.includes('duplicate'))
    return 'An account with this email already exists.';
  if ((msg.includes('invalid') && msg.includes('credential')) || msg.includes('wrong password'))
    return 'Incorrect email or password.';
  if (msg.includes('not found') || msg.includes('does not exist'))
    return 'No account found with these credentials.';
  if (msg.includes('expired') && msg.includes('otp'))
    return 'OTP has expired. Please request a new one.';
  if (msg.includes('invalid') && msg.includes('otp'))
    return 'Invalid OTP. Please check and try again.';
  if (msg.includes('too many') || msg.includes('rate limit'))
    return 'Too many attempts. Please try again later.';
  if (msg.includes('network') || msg.includes('failed to fetch'))
    return 'Network error. Check your connection.';
  return detail || 'Something went wrong. Please try again.';
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(authApi.getStoredUser());
  const [loading, setLoading]         = useState(true);

  // On mount verify the stored token is still valid
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      authApi.getMe()
        .then((user) => setCurrentUser(user))
        .catch(() => {
          authApi.clearTokens();
          setCurrentUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ── Email signup → returns data including dev_otp in dev mode ─────────────
  async function signupWithEmail(email, password, politicalParty) {
    const username = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 50);
    return authApi.signupWithEmail({
      username,
      email,
      password,
      political_party: politicalParty || undefined,
    });
  }

  // ── Phone signup ───────────────────────────────────────────────────────────
  async function signupWithPhone(phone, _password, politicalParty) {
    const username = 'user_' + phone.replace(/\D/g, '').slice(-8);
    return authApi.signupWithPhone({
      username,
      phone,
      political_party: politicalParty || undefined,
    });
  }

  // ── OTP verification ───────────────────────────────────────────────────────
  // target: the email or phone that received the OTP
  // channel: 'email' | 'phone'
  // purpose: 'signup_verify' | 'login_verify'
  async function verifyOtp(code, target, channel, purpose) {
    const data = await authApi.verifyOtp({ target, channel, otp_code: code, purpose });
    // Tokens were already saved on signup/login. Refresh user to get verified state.
    const user = await authApi.getMe().catch(() => authApi.getStoredUser());
    if (user) setCurrentUser(user);
    return data;
  }

  // ── Email / phone + password login ────────────────────────────────────────
  async function loginWithEmail(identifier, password) {
    const data = await authApi.login({ identifier, password });
    if (data?.user && !data.otp_required) setCurrentUser(data.user);
    return data; // caller checks data.otp_required to decide next route
  }

  // ── Google OAuth login ─────────────────────────────────────────────────────
  async function loginWithGoogle(googleAccessToken, politicalParty) {
    const data = await authApi.loginWithGoogle(googleAccessToken, politicalParty);
    if (data?.user) setCurrentUser(data.user);
    return data;
  }

  async function logout() {
    await authApi.logout();
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      signupWithEmail,
      signupWithPhone,
      verifyOtp,
      loginWithEmail,
      loginWithGoogle,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
