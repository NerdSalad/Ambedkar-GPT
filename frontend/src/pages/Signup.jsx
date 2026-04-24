import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useAuth, friendlyError } from '../context/AuthContext';
import AuthLayout    from '../components/AuthLayout';
import AnimatedInput from '../components/AnimatedInput';
import PasswordInput from '../components/PasswordInput';
import PhoneField    from '../components/PhoneField';
import PrimaryButton from '../components/PrimaryButton';
import GoogleButton  from '../components/GoogleButton';
import LegalModal    from '../components/LegalModal';

export default function Signup() {
  const navigate = useNavigate();
  const { signupWithEmail, sendPhoneOtp, loginWithGoogle } = useAuth();

  const [mode, setMode]                       = useState('email'); // 'email' | 'phone'
  const [email, setEmail]                     = useState('');
  const [phone, setPhone]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscribed, setSubscribed]           = useState(false);
  const [termsAccepted, setTermsAccepted]     = useState(false);
  const [modal, setModal]                     = useState(null); // 'terms' | 'privacy' | null
  const [errors, setErrors]                   = useState({});
  const [authError, setAuthError]             = useState('');
  const [loading, setLoading]                 = useState(false);

  function validate() {
    const e = {};
    if (mode === 'email') {
      if (!email.trim())          e.email = 'Email is required.';
      if (!password)              e.password = 'Password is required.';
      else if (password.length < 6) e.password = 'Password must be at least 6 characters.';
      if (!confirmPassword)       e.confirmPassword = 'Please confirm your password.';
      else if (confirmPassword !== password) e.confirmPassword = 'Passwords do not match.';
    } else {
      if (!phone)                         e.phone = 'Phone number is required.';
      else if (!isValidPhoneNumber(phone)) e.phone = 'Please enter a valid phone number.';
    }
    if (!termsAccepted) e.terms = 'You must accept the Terms of Service and Privacy Policy.';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setAuthError('');
    setLoading(true);
    try {
      if (mode === 'phone') {
        await sendPhoneOtp(phone);
        navigate('/otp', { state: { identifier: phone, type: 'phone', mode: 'signup' } });
      } else {
        await signupWithEmail(email.trim(), password);
        navigate('/otp', { state: { identifier: email.trim(), type: 'email', mode: 'signup' } });
      }
    } catch (err) {
      setAuthError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setAuthError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/questionnaire', { replace: true });
    } catch (err) {
      setAuthError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  function switchMode(m) {
    setMode(m);
    setErrors({});
    setAuthError('');
  }

  return (
    <AuthLayout brandSide="left" brandVariant="signup">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-[40px] font-bold leading-tight tracking-tight text-white md:text-[48px]">
            Create an Account
          </h1>
          <p className="mt-3 text-[14px]" style={{ color: '#8b94b8' }}>
            Begin your journey towards knowledge and enlightenment.
          </p>
        </div>

        {/* Email / Phone toggle */}
        <div className="flex rounded-xl p-1" style={{ backgroundColor: '#0a1128', border: '1px solid #1e3260' }}>
          {['email', 'phone'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className="flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: mode === m ? '#1a2a5e' : 'transparent',
                color: mode === m ? '#ffffff' : '#8b94b8',
                boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
              }}
            >
              {m === 'email' ? 'Email' : 'Phone Number'}
            </button>
          ))}
        </div>

        {authError && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {mode === 'email' ? (
            <>
              <AnimatedInput
                placeholders={['Enter your Email']}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); setAuthError(''); }}
                label="Email"
                error={errors.email}
              />
              <PasswordInput
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
                error={errors.password}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: '' })); }}
                error={errors.confirmPassword}
              />
            </>
          ) : (
            <PhoneField
              value={phone}
              onChange={(v) => { setPhone(v ?? ''); setErrors((p) => ({ ...p, phone: '' })); setAuthError(''); }}
              error={errors.phone}
            />
          )}

          <label className="flex items-start gap-3 cursor-pointer rounded-md px-1">
            <input type="checkbox" checked={subscribed} onChange={(e) => setSubscribed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-blue-500 cursor-pointer" />
            <span className="text-xs leading-relaxed" style={{ color: '#8b94b8' }}>
              Send me educational content, updates and resources
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer rounded-md px-1">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                setErrors((p) => ({ ...p, terms: '' }));
              }}
              className="mt-0.5 w-4 h-4 rounded accent-blue-500 cursor-pointer shrink-0"
            />
            <span className="text-xs leading-relaxed" style={{ color: '#8b94b8' }}>
              I have read and agree to AmbedkarGPT's{' '}
              <button
                type="button"
                onClick={() => setModal('privacy')}
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: '#6b8aff' }}
              >
                Privacy Policy
              </button>
              {' '}and{' '}
              <button
                type="button"
                onClick={() => setModal('terms')}
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: '#6b8aff' }}
              >
                Terms of Service
              </button>
            </span>
          </label>
          {errors.terms && (
            <p className="text-xs mt-0.5 px-1" style={{ color: '#ef4444' }}>{errors.terms}</p>
          )}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'phone' ? 'Send OTP' : 'Sign up'}
          </PrimaryButton>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: '#2a3566' }} />
          <span className="text-xs" style={{ color: '#8b94b8' }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#2a3566' }} />
        </div>

        <GoogleButton onClick={handleGoogle} disabled={loading} />

        <p className="text-center text-sm" style={{ color: '#8b94b8' }}>
          Already have an account?{' '}
          <Link to="/login" className="underline underline-offset-2 hover:opacity-80 transition-opacity font-medium" style={{ color: '#6b8aff' }}>
            Log In
          </Link>
        </p>
      </div>
      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}
    </AuthLayout>
  );
}
