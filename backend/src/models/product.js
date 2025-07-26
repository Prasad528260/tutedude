import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    shop: {type: mongoose.Schema.Types.ObjectId, ref: "Shop"},
    name: String,
    description: String,
    price: Number,
    images: String,
    stock: {type: Number,validate: {validator: (v) => v >= 0, message: "Stock cannot be negative"}},
    available: {type: Boolean, 
        default: true},
});

productSchema.pre("save", function (next) {
    this.available = this.stock > 0;
    next();
});

export default mongoose.model("Product", productSchema);