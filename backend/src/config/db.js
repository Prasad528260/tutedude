import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MONGODB CONNECTION ERROR",error);
    }
};

export default connectDB;
