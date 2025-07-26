import User from "../models/user.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

// Get vendor's order history
export const getVendorOrderHistory = async (req, res) => {
    try {
        const vendorId = req.user._id;
        
        const orders = await Order.find({ vendorId })
            .populate('productId', 'name price image')
            .populate('shopkeeperId', 'name')
            .sort({ createdAt: -1 });
            
        res.status(200).json(orders);
        
    } catch (error) {
        console.error("GET ORDER HISTORY ERROR:", error);
        res.status(500).json({ 
            message: "Error fetching order history",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Repeat a previous order
export const repeatOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const vendorId = req.user._id;

        // Find the original order
        const originalOrder = await Order.findById(orderId)
            .populate('productId','name price image')
            .populate('shopkeeperId','name');
            
        if (!originalOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        if (originalOrder.vendorId.toString() !== vendorId.toString()) {
            return res.status(403).json({ message: "Not authorized to repeat this order" });
        }

        // Check if product is still available
        const product = await Product.findById(originalOrder.productId);
        if (!product || !product.available) {
            return res.status(400).json({ message: "Product is no longer available" });
        }
        
        if (product.stock < originalOrder.quantity) {
            return res.status(400).json({ 
                message: `Only ${product.stock} items available, but ${originalOrder.quantity} requested` 
            });
        }

        // Create new order
        const newOrder = new Order({
            shopkeeperId: originalOrder.shopkeeperId,
            vendorId: vendorId,
            productId: originalOrder.productId._id,
            quantity: originalOrder.quantity,
            totalAmount: originalOrder.quantity * product.price,
            status: "pending",
            isRepeat: true,
            originalOrderId: originalOrder._id
        });

        // Save the new order
        let savedOrder = await newOrder.save();
        
        // Update product stock
        product.stock -= originalOrder.quantity;
        product.available = product.stock > 0;
        savedOrder = await product.save();

        res.status(201).json( savedOrder);

    } catch (error) {
        console.error("REPEAT ORDER ERROR:", error);
        res.status(500).json({ 
            message: "Error repeating order",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const getNearbyVendors = async (req, res) => {
    try {
        const vendorId = req.user._id;
        
        // Get the current vendor's area
        const currentVendor = await User.findById(vendorId);
        if (!currentVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        
        if (!currentVendor.location) {
            return res.status(400).json({ message: "Vendor's location not set" });
        }
        
        // Find other vendors in the same area
        const vendors = await User.find({
            _id: { $ne: vendorId }, // Exclude the current vendor
            role: "vendor",
            location: currentVendor.location
        }).select('-password'); // Exclude password from the response
        
        res.status(200).json(vendors);
        
    } catch (error) {
        console.error("GET NEARBY VENDORS ERROR:", error);
        res.status(500).json({ 
            message: "Error fetching nearby vendors",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
