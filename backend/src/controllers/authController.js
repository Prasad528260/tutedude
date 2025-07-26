import { validateSignup } from "../utils/validate";
import User from "../models/user";
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

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

        // Hash password with 10 salt rounds
        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            contactNumber,
            location,
        });

        const savedUser = await user.save();
        
        // Generate JWT token
        const token = savedUser.getJwtToken();
        if (!token) {
            return res.status(500).json({ message: "Error generating token" });
        }
        res.cookie("token", token);
        return res.status(200).json(user);
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

        const token = user.getJwtToken();
        if (!token) {
            return res.status(500).json({ message: "Error generating token" });
        }
        res.cookie("token", token);
        return res.status(200).json(user);
    } catch (error) {
        console.error("LOGIN ERROR", error);
        return res.status(500).json({ message: "Error logging in" });
    }
};
