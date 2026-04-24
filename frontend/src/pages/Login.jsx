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

export default function Login() {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle, sendPhoneOtp } = useAuth();

  const [mode, setMode]         = useState('email'); // 'email' | 'phone'
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading]   = useState(false);

  function validate() {
    const e = {};
    if (mode === 'email') {
      if (!email.trim()) e.email = 'Email is required.';
      if (!password)     e.password = 'Password is required.';
    } else {
      if (!phone)                         e.phone = 'Phone number is required.';
      else if (!isValidPhoneNumber(phone)) e.phone = 'Please enter a valid phone number.';
    }
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
        navigate('/otp', { state: { identifier: phone, type: 'phone', mode: 'login' } });
      } else {
        await loginWithEmail(email.trim(), password);
        navigate('/dashboard', { replace: true });
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
      navigate('/dashboard', { replace: true });
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
    <AuthLayout brandSide="right" brandVariant="login">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-[44px] font-bold leading-tight tracking-tight text-white md:text-[52px]">
            Welcome Back
          </h1>
          <p className="mt-3 text-[14px]" style={{ color: '#8b94b8' }}>
            Login to continue your journey of knowledge!
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
              <div className="space-y-1">
                <PasswordInput
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
                  error={errors.password}
                />
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-xs underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: '#6b8aff' }}>
                    Forgot password?
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <PhoneField
              value={phone}
              onChange={(v) => { setPhone(v ?? ''); setErrors((p) => ({ ...p, phone: '' })); setAuthError(''); }}
              error={errors.phone}
            />
          )}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'phone' ? 'Send OTP' : 'Login'}
          </PrimaryButton>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: '#2a3566' }} />
          <span className="text-xs" style={{ color: '#8b94b8' }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#2a3566' }} />
        </div>

        <GoogleButton onClick={handleGoogle} disabled={loading} />

        <p className="text-center text-sm" style={{ color: '#8b94b8' }}>
          Don't have an account?{' '}
          <Link to="/signup" className="underline underline-offset-2 hover:opacity-80 transition-opacity font-medium" style={{ color: '#6b8aff' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
