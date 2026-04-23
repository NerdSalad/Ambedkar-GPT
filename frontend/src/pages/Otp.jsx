import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import PrimaryButton from '../components/PrimaryButton';

const OTP_LENGTH = 6;

// Detects whether the identifier looks like an email or phone number,
// and returns a masked display string + label for the subtitle.
function describeIdentifier(identifier = '') {
  const trimmed = identifier.trim();
  if (trimmed.includes('@')) {
    // Email: show first 2 chars + *** + domain
    const [local, domain] = trimmed.split('@');
    const masked = local.slice(0, 2) + '***@' + domain;
    return { label: 'email', masked };
  }
  // Phone: show last 4 digits
  const digits = trimmed.replace(/\D/g, '');
  const masked = '******' + digits.slice(-4);
  return { label: 'phone number', masked };
}

// Six individual digit boxes with auto-advance, backspace, and paste support.
function OtpBoxes({ value, onChange, error }) {
  const digits = value.split('').concat(Array(OTP_LENGTH).fill('')).slice(0, OTP_LENGTH);
  const inputRefs = useRef([]);

  function focusBox(index) {
    inputRefs.current[index]?.focus();
  }

  useEffect(() => { focusBox(0); }, []);

  function handleKeyDown(e, index) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = digits.map((d, i) => (i === index ? '' : d));
      onChange(next.join(''));
      if (index > 0) focusBox(index - 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusBox(index - 1);
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      focusBox(index + 1);
    }
  }

  function handleInput(e, index) {
    const char = e.target.value.replace(/\D/g, '').slice(-1); // digits only
    if (!char) return;
    const next = digits.map((d, i) => (i === index ? char : d));
    onChange(next.join(''));
    if (index < OTP_LENGTH - 1) focusBox(index + 1);
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    const next = Array(OTP_LENGTH).fill('').map((_, i) => pasted[i] || '');
    onChange(next.join(''));
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
            // Prevent onChange from fighting with onInput
            onChange={() => {}}
            className={`input-field w-full text-center text-xl font-bold rounded-xl py-3.5 ${error ? 'error' : ''}`}
            style={{ caretColor: '#4f6bff' }}
          />
        ))}
      </div>
      {error && (
        <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>
      )}
    </div>
  );
}

// Resend timer — counts down from 30s, then enables the resend button.
function ResendTimer({ onResend }) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  function handleResend() {
    setSeconds(30);
    onResend();
  }

  return (
    <p className="text-center text-sm" style={{ color: '#8b94b8' }}>
      Didn't receive the code?{' '}
      {seconds > 0 ? (
        <span style={{ color: '#6b7db3' }}>Resend in {seconds}s</span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
          style={{ color: '#6b8aff' }}
        >
          Resend OTP
        </button>
      )}
    </p>
  );
}

export default function Otp() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If someone lands here directly without going through signup, bounce them back.
  const identifier = state?.identifier || '';
  useEffect(() => {
    if (!identifier) navigate('/signup', { replace: true });
  }, [identifier, navigate]);

  const { label, masked } = describeIdentifier(identifier);

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (otp.length < OTP_LENGTH) {
      setOtpError('Please enter the complete 6-digit code.');
      return;
    }
    setOtpError('');
    console.log({ otp, identifier });
    alert(`OTP verified (frontend only): ${otp}`);
    // TODO: replace with real verification → navigate to dashboard
  }

  function handleResend() {
    setOtp('');
    setOtpError('');
    console.log('Resend OTP requested for', identifier);
    alert('A new OTP has been sent (frontend only)');
  }

  return (
    <AuthLayout brandSide="left" brandVariant="signup">
      <div className="space-y-7">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Verify Your Account</h1>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: '#8b94b8' }}>
            We've sent a 6-digit code to your {label}{' '}
            <span className="font-medium" style={{ color: '#c8d8ff' }}>{masked}</span>.
            Enter it below to continue.
          </p>
        </div>

        {/* OTP form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <OtpBoxes
            value={otp}
            onChange={(v) => { setOtp(v); setOtpError(''); }}
            error={otpError}
          />

          <PrimaryButton type="submit">Verify OTP</PrimaryButton>
        </form>

        <ResendTimer onResend={handleResend} />

        {/* Back link */}
        <p className="text-center text-sm" style={{ color: '#8b94b8' }}>
          Wrong account?{' '}
          <Link
            to="/signup"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
            style={{ color: '#6b8aff' }}
          >
            Go back
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
