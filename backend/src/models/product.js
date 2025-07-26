import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    shopId: {type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true},
    name: String,
    description: String,
    price: Number,
    image: String,
    stock: {type: Number,validate: {validator: (v) => v >= 0, message: "Stock cannot be negative"}},
    available: {type: Boolean, 
        default: true},
});

productSchema.pre("save", function (next) {
    this.available = this.stock > 0;
    next();
});

export default mongoose.model("Product", productSchema);