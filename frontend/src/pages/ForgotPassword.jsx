import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { friendlyError } from '../context/AuthContext';
import AuthLayout    from '../components/AuthLayout';
import AnimatedInput from '../components/AnimatedInput';
import PrimaryButton from '../components/PrimaryButton';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/resend-otp`, {
        target:  email.trim().toLowerCase(),
        channel: 'email',
        purpose: 'signup_verify',
      });
      navigate('/otp', {
        state: {
          identifier: email.trim().toLowerCase(),
          type:       'email',
          mode:       'login',
          password:   '',
          devOtp:     data?.dev_otp || '',
        },
      });
    } catch (err) {
      setError(friendlyError(err));
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
            Enter your email and we&apos;ll send you a verification code to confirm it&apos;s you.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <AnimatedInput
            placeholders={['Enter your Email']}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            label="Email"
            error={error}
          />
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Sending…' : 'Send Verification Code'}
          </PrimaryButton>
        </form>

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
