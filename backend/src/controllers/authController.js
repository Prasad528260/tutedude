import { validateSignup } from "../utils/validate.js";
import User from "../models/user.js";
import bcrypt from 'bcryptjs';


export const signup = async(req, res) => {
    try {
        const { name, email, password, role, contactNumber, location } = req.body;
        const validate = validateSignup(name, email, password, role, contactNumber, location);
        
        if (!validate) {
            return res.status(400).json({ message: "INVALID DATA" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Create user with plain password - hashing is handled by the pre-save hook
        const user = new User({
            name,
            email,
            password,  // Will be hashed by the pre-save hook
            role,
            contactNumber,
            location,
        });

        const savedUser = await user.save();
        
        // Generate JWT token
        const token = savedUser.generateAuthToken();
        if (!token) {
            return res.status(500).json({ message: "Error generating token" });
        }
        
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        
        return res.status(201).json({
            success: true,
            user: userResponse,
            token
        });
    } catch (error) {
        console.error("SIGNUP ERROR", error);
        return res.status(500).json({ message: "Error creating user" });
    }
};

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = user.generateAuthToken();
        if (!token) {
            return res.status(500).json({ message: "Error generating token" });
        }
        
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        
        return res.status(200).json({
            success: true,
            user: userResponse,
            token
        });
    } catch (error) {
        console.error("LOGIN ERROR", error);
        return res.status(500).json({ message: "Error logging in" });
    }
};
