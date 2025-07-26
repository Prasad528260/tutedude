import mongoose from "mongoose";
import { MONGO_URL } from "../constants/constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MONGODB CONNECTION ERROR",error);
    }
};

export default connectDB;
