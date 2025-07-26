import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["vendor", "shopkeeper"],
    default: "vendor",
    required: true,
  },
  contactNumber: { type: String, required: true },
  location: { type: String },
  image: { type: String },
  
  
});
userSchema.methods.getJwtToken=async function(){
  const token = jwt.sign({id:this._id,role:this.role},process.env.JWT_SECRET,{expiresIn:"1d"});
  return token;
}
export default mongoose.model("User", userSchema);
