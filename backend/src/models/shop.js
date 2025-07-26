import mongoose from "mongoose";
const shopSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
    shopName: String,
    description: String,
    location: {type: String},
    images: String,
});

export default mongoose.model("Shop", shopSchema);