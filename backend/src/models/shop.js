import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  shopName: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  location: {
    type: String,
    required: true,
    lowercase: true
  },
  image: {
    type: String,
    required: true
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  isOpen: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;
