import mongoose from "mongoose";
const shopSchema = new mongoose.Schema({
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, 
    shopName: String,
    description: String,
    location: {type: String},
    image: String,
    totalOrders: {type: Number, default: 0},
   
});

export default mongoose.model("Shop", shopSchema);