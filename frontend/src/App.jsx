import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute   from './components/ProtectedRoute';

import Home       from './pages/Home';
import About      from './pages/About';
import Solutions  from './pages/Solutions';
import Pricing    from './pages/Pricing';
import Resources  from './pages/Resources';
import Contact    from './pages/Contact';
import Login      from './pages/Login';
import Signup     from './pages/Signup';
import Otp        from './pages/Otp';
import Dashboard       from './pages/Dashboard';
import ForgotPassword  from './pages/ForgotPassword';
import Questionnaire   from './pages/Questionnaire';
import ServiceSelection          from './pages/ServiceSelection';
import SocialMediaPostGenerator  from './pages/SocialMediaPostGenerator';

import CustomCursor        from './components/CustomCursor';
import ScrollProgress      from './components/ScrollProgress';
import OpeningSplash       from './components/OpeningSplash';
import TransitionCurtain   from './components/TransitionCurtain';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* invisible reCAPTCHA mount point for phone auth */}
        <div id="recaptcha-container" />

        {!splashDone && <OpeningSplash onDone={() => setSplashDone(true)} />}
        <TransitionCurtain />
        <ScrollProgress />
        <CustomCursor />

        <Routes>
          {/* public */}
          <Route path="/"          element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/pricing"   element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/signup"    element={<Signup />} />
          <Route path="/otp"              element={<Otp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* protected */}
          <Route path="/questionnaire" element={
            <ProtectedRoute><Questionnaire /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/generate" element={
            <ProtectedRoute><ServiceSelection /></ProtectedRoute>
          } />
          <Route path="/generate/social-media" element={
            <ProtectedRoute><SocialMediaPostGenerator /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
