import mongoose from "mongoose";
const vendorSchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
  shopName: String,
  foodType: {type: String},
  description: String,
  location: {type: String},
  images: String,
});

export default mongoose.model("Vendor", vendorSchema);
