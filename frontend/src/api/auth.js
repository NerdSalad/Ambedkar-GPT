import client from './client';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export function saveTokens(tokens) {
  localStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('refresh_token', tokens.refresh_token);
}

export function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}

function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
}

// ── Signup with email + password ─────────────────────────────────────────────
export async function signupWithEmail({ username, email, password, political_party }) {
  const { data } = await axios.post(`${BASE_URL}/auth/signup`, {
    username,
    email,
    password,
    ...(political_party ? { political_party } : {}),
  });
  // Backend issues tokens on signup (user starts unverified); save them now.
  if (data.tokens) {
    saveTokens(data.tokens);
    saveUser(data.user);
  }
  return data; // includes dev_otp when AUTH_DEBUG_RETURN_OTP=true
}

// ── Signup with phone + password ──────────────────────────────────────────────
export async function signupWithPhone({ username, phone, password, political_party }) {
  const { data } = await axios.post(`${BASE_URL}/auth/signup`, {
    username,
    phone,
    password,
    ...(political_party ? { political_party } : {}),
  });
  if (data.tokens) {
    saveTokens(data.tokens);
    saveUser(data.user);
  }
  return data;
}

// ── Verify OTP ────────────────────────────────────────────────────────────────
// target: the email address or phone number
// channel: 'email' | 'phone'
// purpose: 'signup_verify' | 'login_verify'
export async function verifyOtp({ target, channel, otp_code, purpose }) {
  const { data } = await axios.post(`${BASE_URL}/auth/verify-otp`, {
    target,
    channel,
    otp_code,
    purpose,
  });
  return data; // { message: "OTP verified successfully." }
}

// ── Login with email/phone + password ────────────────────────────────────────
export async function login({ identifier, password }) {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, {
    identifier,
    password,
  });
  if (data.tokens) {
    saveTokens(data.tokens);
    saveUser(data.user);
  }
  return data; // may have otp_required: true + dev_otp if unverified
}

// ── Google OAuth ──────────────────────────────────────────────────────────────
export async function loginWithGoogle(googleAccessToken, politicalParty) {
  const { data } = await axios.post(`${BASE_URL}/auth/google-login`, {
    access_token: googleAccessToken,
    ...(politicalParty ? { political_party: politicalParty } : {}),
  });
  if (data.tokens) {
    saveTokens(data.tokens);
    saveUser(data.user);
  }
  return data;
}

// ── Resend OTP ────────────────────────────────────────────────────────────────
export async function resendOtp({ target, channel, purpose }) {
  const { data } = await axios.post(`${BASE_URL}/auth/resend-otp`, {
    target,
    channel,
    purpose,
  });
  return data; // { message, dev_otp? }
}

// ── Get current user from backend ────────────────────────────────────────────
export async function getMe() {
  const { data } = await client.get('/auth/me');
  saveUser(data);
  return data;
}

// ── Logout ────────────────────────────────────────────────────────────────────
export async function logout() {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    if (refreshToken) {
      await client.post('/auth/logout', { refresh_token: refreshToken });
    }
  } finally {
    clearTokens();
  }
}
