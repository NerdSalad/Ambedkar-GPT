import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import AnimatedInput from '../components/AnimatedInput';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import GoogleButton from '../components/GoogleButton';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!identifier.trim()) e.identifier = 'Email or phone is required.';
    if (!password) e.password = 'Password is required.';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    console.log({ identifier, password });
    alert('Login submitted (frontend only)');
  }

  function handleGoogle() {
    console.log('Google OAuth not wired yet');
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

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <AnimatedInput
            placeholders={['Enter your Email', 'Enter your Phone No.']}
            value={identifier}
            onChange={(e) => { setIdentifier(e.target.value); setErrors((prev) => ({ ...prev, identifier: '' })); }}
            label="Email / Phone No."
            error={errors.identifier}
          />

          <div className="space-y-1">
            <PasswordInput
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })); }}
              error={errors.password}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => console.log('Forgot password clicked')}
                className="text-xs underline underline-offset-2 hover:opacity-80 transition-opacity"
                style={{ color: '#6b8aff' }}
              >
                Forgot password?
              </button>
            </div>
          </div>

          <PrimaryButton type="submit">Login</PrimaryButton>
        </form>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: '#2a3566' }} />
          <span className="text-xs" style={{ color: '#8b94b8' }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#2a3566' }} />
        </div>

        <GoogleButton onClick={handleGoogle} />

        <p className="text-center text-sm" style={{ color: '#8b94b8' }}>
          Don't have an account?{' '}
          <Link to="/signup" className="underline underline-offset-2 hover:opacity-80 transition-opacity font-medium"
            style={{ color: '#6b8aff' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
