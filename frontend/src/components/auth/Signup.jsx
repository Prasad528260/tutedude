import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiChevronDown, FiUpload, FiUserCheck, FiMapPin, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdStorefront } from 'react-icons/md';
import './Signup.css';

const roles = [
  { label: 'Join as Vendor', value: 'vendor', icon: <MdStorefront className="role-icon" /> },
  { label: 'Join as Shopkeeper', value: 'shopkeeper', icon: <FiUserCheck className="role-icon" /> },
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
    <div className="signup-outer">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        className="signup-container"
      >
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join our community</p>
        <form className="signup-form">
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              placeholder="Enter your full name"
              className="signup-input"
              required
            />
          </div>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              className="signup-input"
              required
            />
          </div>
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className="signup-input"
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="input-group">
            <FiPhone className="input-icon" />
            <input
              type="tel"
              placeholder="Enter your contact number"
              pattern="[0-9]*"
              className="signup-input"
              required
            />
          </div>
          <div className="input-group role-group">
            <button
              type="button"
              className={`role-select-btn${roleOpen ? ' open' : ''}`}
              style={{ borderWidth: 1 }}
              onClick={() => setRoleOpen((v) => !v)}
              tabIndex={0}
            >
              <span className="role-select-icon">
                <MdStorefront className="role-icon" />
              </span>
              <span className={`role-select-label${selectedRole ? ' selected' : ''}`}>
                {selectedRole ? selectedRole.label : 'Select your role'}
              </span>
              <FiChevronDown className={`role-chevron${roleOpen ? ' open' : ''}`} />
            </button>
            <AnimatePresence>
              {roleOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="role-dropdown"
                >
                  {roles.map((role) => (
                    <li
                      key={role.value}
                      className={`role-option${selectedRole && selectedRole.value === role.value ? ' selected' : ''}`}
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
          <div className="input-group">
            <FiMapPin className="input-icon" />
            <input
              type="text"
              placeholder="Enter your location"
              className="signup-input"
              required
            />
          </div>
          <div className="profile-image-group">
            <label className="profile-image-label">Profile Image</label>
            <div
              className="profile-image-drop"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                className="profile-image-input"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="profile-image-preview" />
              ) : (
                <>
                  <FiUpload className="profile-upload-icon" />
                  <span className="profile-upload-text">Click to upload profile image</span>
                </>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="signup-submit-btn"
          >
            Create Account
          </button>
        </form>
        <div className="signup-switch">
          Already have an account?{' '}
          <button
            className="switch-btn"
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