import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  shopkeeperId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  vendorShopId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  totalAmount: Number,
  status: { type: String, enum: ["pending", "delivered"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
