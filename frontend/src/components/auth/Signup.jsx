import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiChevronDown, FiUpload, FiUserCheck, FiMapPin, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdStorefront } from 'react-icons/md';

const roles = [
  { label: 'Join as Vendor', value: 'vendor', icon: <MdStorefront className="text-yellow-500 text-lg mr-2" /> },
  { label: 'Join as Shopkeeper', value: 'shopkeeper', icon: <FiUserCheck className="text-yellow-500 text-lg mr-2" /> },
];

const SignupForm = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-black mb-1">Create Account</h2>
        <p className="text-center text-gray-500 mb-2">Join our community</p>
        <form className="flex flex-col gap-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 shadow-sm"
              required
            />
          </div>
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
              placeholder="Create a password"
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
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="tel"
              placeholder="Enter your contact number"
              pattern="[0-9]*"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 shadow-sm"
              required
            />
          </div>
          <div className="relative">
            <button
              type="button"
              className={`w-full flex items-center pl-10 pr-4 py-3 rounded-xl bg-white border text-left focus:outline-none shadow-sm ${roleOpen ? 'border-yellow-400' : 'border-gray-200'}`}
              style={{ borderWidth: 1 }}
              onClick={() => setRoleOpen((v) => !v)}
              tabIndex={0}
            >
              <span className="flex items-center text-gray-400 text-lg absolute left-3">
                <MdStorefront className="text-yellow-500 text-lg" />
              </span>
              <span className={`ml-7 ${selectedRole ? 'text-black' : 'text-gray-400'}`}>
                {selectedRole ? selectedRole.label : 'Select your role'}
              </span>
              <FiChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {roleOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-10 overflow-hidden border border-gray-100"
                >
                  {roles.map((role) => (
                    <li
                      key={role.value}
                      className={`flex items-center px-6 py-3 cursor-pointer hover:bg-yellow-50 text-black ${selectedRole && selectedRole.value === role.value ? 'font-bold' : ''}`}
                      onClick={() => {
                        setSelectedRole(role);
                        setRoleOpen(false);
                      }}
                    >
                      {role.icon}
                      {role.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          {/* Location input after role selection */}
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Enter your location"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-0 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">Profile Image</label>
            <div
              className="w-full h-28 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400 shadow" />
              ) : (
                <>
                  <FiUpload className="text-2xl text-gray-400 mb-1" />
                  <span className="text-gray-400 text-sm">Click to upload profile image</span>
                </>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-xl bg-black text-white font-semibold shadow hover:bg-gray-900 transition-all duration-200"
          >
            Create Account
          </button>
        </form>
        <div className="text-center text-gray-700 mt-2">
          Already have an account?{' '}
          <button
            className="text-black hover:underline font-semibold"
            onClick={onSwitch}
          >
            Sign in
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm;