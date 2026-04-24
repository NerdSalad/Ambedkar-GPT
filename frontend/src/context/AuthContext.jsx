import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function friendlyError(code) {
  const map = {
    'auth/email-already-in-use':   'An account with this email already exists.',
    'auth/invalid-email':          'Please enter a valid email address.',
    'auth/user-not-found':         'No account found with these credentials.',
    'auth/wrong-password':         'Incorrect password.',
    'auth/invalid-credential':     'Incorrect email or password.',
    'auth/weak-password':          'Password must be at least 6 characters.',
    'auth/too-many-requests':      'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-closed-by-user':   'Google sign-in was cancelled.',
    'auth/invalid-phone-number':   'Enter a valid phone number with country code (e.g. +91XXXXXXXXXX).',
    'auth/quota-exceeded':         'SMS quota exceeded. Please try again later.',
    'auth/missing-phone-number':   'Phone number is required.',
    'auth/code-expired':           'OTP has expired. Please request a new one.',
    'auth/invalid-verification-code': 'Invalid OTP. Please check and try again.',
  };
  return map[code] ?? 'Something went wrong. Please try again.';
}

export function isPhone(val) {
  const clean = val.trim();
  return /^\+?\d[\d\s\-()]{7,}$/.test(clean) && !clean.includes('@');
}

export function toE164(phone) {
  const stripped = phone.trim().replace(/[\s\-()]/g, '');
  if (stripped.startsWith('+')) return stripped;
  const digits = stripped.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  return `+${digits}`;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser]           = useState(null);
  const [loading, setLoading]                   = useState(true);
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function signupWithEmail(email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(cred.user);
    return cred;
  }

  async function sendPhoneOtp(phoneNumber) {
    // Always tear down any previous verifier before creating a new one
    if (window.recaptchaVerifier) {
      try { window.recaptchaVerifier.clear(); } catch (_) {}
      window.recaptchaVerifier = null;
    }

    const container = document.getElementById('recaptcha-container');
    if (!container) throw Object.assign(new Error(), { code: 'auth/internal-error' });

    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      'expired-callback': () => {
        try { window.recaptchaVerifier?.clear(); } catch (_) {}
        window.recaptchaVerifier = null;
      },
    });

    try {
      await window.recaptchaVerifier.render();
      const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(result);
      return result;
    } catch (err) {
      try { window.recaptchaVerifier?.clear(); } catch (_) {}
      window.recaptchaVerifier = null;
      throw err;
    }
  }

  async function verifyPhoneOtp(code) {
    if (!confirmationResult) throw new Error('auth/session-expired');
    return confirmationResult.confirm(code);
  }

  async function loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }

  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    loading,
    signupWithEmail,
    sendPhoneOtp,
    verifyPhoneOtp,
    loginWithEmail,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
