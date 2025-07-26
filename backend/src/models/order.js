import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shopkeeperId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  vendorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product",
    required: true 
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  isRepeat: {
    type: Boolean,
    default: false
  },
  originalOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries on vendor and status
orderSchema.index({ vendorId: 1, status: 1 });
orderSchema.index({ shopkeeperId: 1, status: 1 });

export const Order = mongoose.model("Order", orderSchema);
