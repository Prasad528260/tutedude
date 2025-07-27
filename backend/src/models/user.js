import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['vendor', 'shopkeeper'],
    required: true
  },
  contactNumber: { 
    type: String, 
    required: true
  },
  location: { 
    type: String,
    required: true,
    lowercase: true
  },
  image: { 
    type: String,
    default: 'default-avatar.png'
  }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function() {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    return null;
  }
  
  try {
    return jwt.sign(
      { 
        id: this._id, 
        role: this.role,
        email: this.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
  } catch (error) {
    console.error('Error generating auth token:', error);
    return null;
  }
};

// Hash password before saving if it was modified
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
