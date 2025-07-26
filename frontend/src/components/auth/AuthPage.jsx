import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginForm from './Login';
import SignupForm from './Signup';

const AuthPage = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-4">
        <AnimatePresence mode="wait" initial={false}>
          {showSignup ? (
            <SignupForm key="signup" onSwitch={() => setShowSignup(false)} />
          ) : (
            <LoginForm key="login" onSwitch={() => setShowSignup(true)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage; 