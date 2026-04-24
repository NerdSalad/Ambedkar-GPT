import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';
import { useAuth, friendlyError, toE164 } from '../context/AuthContext';
import { auth }       from '../firebase';
import AuthLayout     from '../components/AuthLayout';
import PrimaryButton  from '../components/PrimaryButton';

const OTP_LENGTH = 6;

function describeIdentifier(identifier = '') {
  const trimmed = identifier.trim();
  if (trimmed.includes('@')) {
    const [local, domain] = trimmed.split('@');
    return { label: 'email', masked: local.slice(0, 2) + '***@' + domain };
  }
  const digits = trimmed.replace(/\D/g, '');
  return { label: 'phone number', masked: '******' + digits.slice(-4) };
}

function OtpBoxes({ value, onChange, error }) {
  const digits    = value.split('').concat(Array(OTP_LENGTH).fill('')).slice(0, OTP_LENGTH);
  const inputRefs = useRef([]);

  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  function focusBox(i) { inputRefs.current[i]?.focus(); }

  function handleKeyDown(e, i) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      onChange(digits.map((d, j) => (j === i ? '' : d)).join(''));
      if (i > 0) focusBox(i - 1);
    } else if (e.key === 'ArrowLeft'  && i > 0)            focusBox(i - 1);
    else if   (e.key === 'ArrowRight' && i < OTP_LENGTH - 1) focusBox(i + 1);
  }

  function handleInput(e, i) {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    if (!char) return;
    onChange(digits.map((d, j) => (j === i ? char : d)).join(''));
    if (i < OTP_LENGTH - 1) focusBox(i + 1);
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    onChange(Array(OTP_LENGTH).fill('').map((_, i) => pasted[i] || '').join(''));
    focusBox(Math.min(pasted.length, OTP_LENGTH - 1));
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-2.5 justify-between">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onInput={(e) => handleInput(e, i)}
            onPaste={handlePaste}
            onChange={() => {}}
            className={`input-field w-full text-center text-xl font-bold rounded-xl py-3.5 ${error ? 'error' : ''}`}
            style={{ caretColor: '#4f6bff' }}
          />
        ))}
      </div>
      {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}
    </div>
  );
}

function ResendTimer({ onResend }) {
  const [seconds, setSeconds] = useState(30);
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);
  return (
    <p className="text-center text-sm" style={{ color: '#8b94b8' }}>
      Didn't receive it?{' '}
      {seconds > 0 ? (
        <span style={{ color: '#6b7db3' }}>Resend in {seconds}s</span>
      ) : (
        <button type="button" onClick={() => { setSeconds(30); onResend(); }}
          className="underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
          style={{ color: '#6b8aff' }}>
          Resend
        </button>
      )}
    </p>
  );
}

// ── Email verification sub-page ──────────────────────────────────────────────
function EmailVerify({ masked, mode }) {
  const navigate = useNavigate();
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [resendMsg, setResendMsg] = useState('');

  async function handleCheckVerified() {
    setLoading(true);
    setError('');
    try {
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        navigate(mode === 'signup' ? '/questionnaire' : '/dashboard', { replace: true });
      } else {
        setError('Email not verified yet — please click the link in your inbox first.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    try {
      await sendEmailVerification(auth.currentUser);
      setResendMsg('Verification email resent!');
      setTimeout(() => setResendMsg(''), 4000);
    } catch (_) {}
  }

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-white">Check Your Email</h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: '#8b94b8' }}>
          We've sent a verification link to{' '}
          <span className="font-medium" style={{ color: '#c8d8ff' }}>{masked}</span>.
          Click the link to verify your account, then come back here.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}
      {resendMsg && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">{resendMsg}</div>
      )}

      <PrimaryButton onClick={handleCheckVerified} disabled={loading}>
        {loading ? 'Checking…' : "I've verified — continue"}
      </PrimaryButton>

      <p className="text-center text-sm" style={{ color: '#8b94b8' }}>
        Didn't receive it?{' '}
        <button type="button" onClick={handleResend}
          className="underline underline-offset-2 hover:opacity-80 font-medium"
          style={{ color: '#6b8aff' }}>
          Resend email
        </button>
      </p>

      <p className="text-center text-sm">
        <Link to="/signup" className="underline underline-offset-2 hover:opacity-80" style={{ color: '#6b8aff' }}>
          Go back
        </Link>
      </p>
    </div>
  );
}

// ── Main OTP page ─────────────────────────────────────────────────────────────
export default function Otp() {
  const { state }   = useLocation();
  const navigate    = useNavigate();
  const { verifyPhoneOtp, sendPhoneOtp } = useAuth();

  const identifier = state?.identifier || '';
  const type       = state?.type       || 'phone';
  const mode       = state?.mode       || 'signup';

  useEffect(() => {
    if (!identifier) navigate('/signup', { replace: true });
  }, [identifier, navigate]);

  const { label, masked } = describeIdentifier(identifier);
  const [otp, setOtp]         = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading]   = useState(false);

  if (type === 'email') {
    return (
      <AuthLayout brandSide="left" brandVariant="signup">
        <EmailVerify masked={masked} mode={mode} />
      </AuthLayout>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (otp.length < OTP_LENGTH) { setOtpError('Please enter the complete 6-digit code.'); return; }
    setOtpError('');
    setLoading(true);
    try {
      await verifyPhoneOtp(otp);
      navigate(mode === 'signup' ? '/questionnaire' : '/dashboard', { replace: true });
    } catch (err) {
      setOtpError(friendlyError(err.code ?? err.message));
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setOtp('');
    setOtpError('');
    try {
      await sendPhoneOtp(toE164(identifier));
    } catch (err) {
      setOtpError(friendlyError(err.code));
    }
  }

  return (
    <AuthLayout brandSide="left" brandVariant="signup">
      <div className="space-y-7">
        <div>
          <h1 className="text-3xl font-bold text-white">Verify Your Phone</h1>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: '#8b94b8' }}>
            We've sent a 6-digit code to your {label}{' '}
            <span className="font-medium" style={{ color: '#c8d8ff' }}>{masked}</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <OtpBoxes value={otp} onChange={(v) => { setOtp(v); setOtpError(''); }} error={otpError} />
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Verifying…' : 'Verify OTP'}
          </PrimaryButton>
        </form>

        <ResendTimer onResend={handleResend} />

        <p className="text-center text-sm" style={{ color: '#8b94b8' }}>
          Wrong number?{' '}
          <Link to={mode === 'login' ? '/login' : '/signup'}
            className="underline underline-offset-2 hover:opacity-80 font-medium"
            style={{ color: '#6b8aff' }}>
            Go back
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
