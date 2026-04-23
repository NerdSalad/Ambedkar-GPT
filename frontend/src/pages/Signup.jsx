import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import AnimatedInput from '../components/AnimatedInput';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import GoogleButton from '../components/GoogleButton';

export default function Signup() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!identifier.trim()) e.identifier = 'Email or phone is required.';
    if (!password) e.password = 'Password is required.';
    if (!confirmPassword) e.confirmPassword = 'Please confirm your password.';
    else if (confirmPassword !== password) e.confirmPassword = 'Passwords do not match.';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    console.log({ identifier, password, subscribed });
    navigate('/otp', { state: { identifier } });
  }

  function handleGoogle() {
    console.log('Google OAuth not wired yet');
  }

  return (
    <AuthLayout brandSide="left" brandVariant="signup">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Create an Account</h1>
          <p className="mt-2 text-base" style={{ color: '#8b94b8' }}>
            Begin your journey towards knowledge and enlightenment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <AnimatedInput
            placeholders={['Enter your Email', 'Enter your Phone No.']}
            value={identifier}
            onChange={(e) => { setIdentifier(e.target.value); setErrors((prev) => ({ ...prev, identifier: '' })); }}
            label="Email / Phone No."
            error={errors.identifier}
          />

          <PasswordInput
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })); }}
            error={errors.password}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setErrors((prev) => ({ ...prev, confirmPassword: '' })); }}
            error={errors.confirmPassword}
          />

          {/* Subscription checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group rounded-md px-1">
            <input
              type="checkbox"
              checked={subscribed}
              onChange={(e) => setSubscribed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-blue-500 cursor-pointer"
            />
            <span className="text-xs leading-relaxed" style={{ color: '#8b94b8' }}>
              Send me educational content, updates and resources
            </span>
          </label>

          {/* Legal fine print */}
          <p className="text-xs leading-relaxed" style={{ color: '#8b94b8' }}>
            By signing up, you accept AmbedkarGPT{' '}
            <button
              type="button"
              onClick={() => console.log('Privacy policy clicked')}
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: '#6b8aff' }}
            >
              privacy policy
            </button>
            {' '}and{' '}
            <button
              type="button"
              onClick={() => console.log('Terms of service clicked')}
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: '#6b8aff' }}
            >
              terms of service
            </button>
            .
          </p>

          <PrimaryButton type="submit">Sign up</PrimaryButton>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: '#2a3566' }} />
          <span className="text-xs" style={{ color: '#8b94b8' }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#2a3566' }} />
        </div>

        <GoogleButton onClick={handleGoogle} />

        <p className="text-center text-sm" style={{ color: '#8b94b8' }}>
          Already have an account?{' '}
          <Link to="/login" className="underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
            style={{ color: '#6b8aff' }}>
            Log In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
