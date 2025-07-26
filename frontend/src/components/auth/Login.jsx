import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const LoginForm = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center text-black mb-1">Welcome Back</h2>
      <p className="text-center text-gray-500 mb-2">Sign in to your account</p>
      <form className="flex flex-col gap-4">
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 shadow-sm"
            required
          />
        </div>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="w-full pl-10 pr-12 py-3 rounded-xl bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 shadow-sm"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-lg"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <button
          type="submit"
          className="mt-2 w-full py-3 rounded-xl bg-black text-white font-semibold shadow hover:bg-gray-900 transition-all duration-200"
        >
          Sign In
        </button>
      </form>
      <div className="text-center text-gray-700 mt-2">
        Don't have an account?{' '}
        <button
          className="text-black hover:underline font-semibold"
          onClick={onSwitch}
        >
          Sign up
        </button>
      </div>
    </motion.div>
  );
};

export default LoginForm;