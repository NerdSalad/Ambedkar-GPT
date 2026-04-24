import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { friendlyError } from '../context/AuthContext';
import AuthLayout    from '../components/AuthLayout';
import AnimatedInput from '../components/AnimatedInput';
import PrimaryButton from '../components/PrimaryButton';

export default function ForgotPassword() {
  const [email, setEmail]       = useState('');
  const [error, setError]       = useState('');
  const [sent, setSent]         = useState(false);
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout brandSide="right" brandVariant="login">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-[40px] font-bold leading-tight tracking-tight text-white md:text-[48px]">
            Forgot Password?
          </h1>
          <p className="mt-3 text-[14px]" style={{ color: '#8b94b8' }}>
            {sent
              ? 'Check your inbox for the reset link.'
              : "Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {sent ? (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            Password reset email sent to <span className="font-medium">{email}</span>. Click the link in your inbox to reset your password.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <AnimatedInput
              placeholders={['Enter your Email']}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              label="Email"
              error={error}
            />
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Sending…' : 'Send Reset Link'}
            </PrimaryButton>
          </form>
        )}

        <p className="text-center text-sm" style={{ color: '#8b94b8' }}>
          Remember your password?{' '}
          <Link to="/login" className="underline underline-offset-2 hover:opacity-80 transition-opacity font-medium" style={{ color: '#6b8aff' }}>
            Back to Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
