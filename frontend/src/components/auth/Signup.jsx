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
  // State for each field
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('Test@1234');
  const [contact, setContact] = useState('9876543210');
  const [location, setLocation] = useState('New Delhi');
  const [showPassword, setShowPassword] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) newErrors.email = 'Invalid email';
    if (!password) newErrors.password = 'Password is required';
    else if (!passwordRegex.test(password)) newErrors.password = 'Password must be 8+ chars, include uppercase, lowercase, number, special character';
    if (!contact.trim()) newErrors.contact = 'Contact number is required';
    else if (!/^\d{10}$/.test(contact)) newErrors.contact = 'Contact must be 10 digits';
    if (!selectedRole) newErrors.role = 'Role is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    return newErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Submit logic here (API call etc.)
      alert('Signup successful!');
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
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              placeholder="Enter your full name"
              className="signup-input"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          {errors.name && <div className="error-msg">{errors.name}</div>}
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              className="signup-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          {errors.email && <div className="error-msg">{errors.email}</div>}
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className="signup-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
          {errors.password && <div className="error-msg">{errors.password}</div>}
          <div className="input-group">
            <FiPhone className="input-icon" />
            <input
              type="tel"
              placeholder="Enter your contact number"
              pattern="[0-9]*"
              className="signup-input"
              value={contact}
              onChange={e => setContact(e.target.value)}
              required
            />
          </div>
          {errors.contact && <div className="error-msg">{errors.contact}</div>}
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
          {errors.role && <div className="error-msg">{errors.role}</div>}
          <div className="input-group">
            <FiMapPin className="input-icon" />
            <input
              type="text"
              placeholder="Enter your location"
              className="signup-input"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
            />
          </div>
          {errors.location && <div className="error-msg">{errors.location}</div>}
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