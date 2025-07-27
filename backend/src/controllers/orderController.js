import Order from "../models/order.js";
import Product from "../models/product.js";
import Shop from "../models/shop.js";
// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const vendorId = req.user._id;
        
        // Get product details
        const product = await Product.findById(productId);
        if (!product || !product.available) {
            return res.status(400).json({ message: "Product not available" });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        // Calculate total amount
        const totalAmount = product.price * quantity;

        // Create order
        const order = new Order({
            shopkeeperId: product.shopId,  // shopId is the owner of the product
            vendorId: vendorId,
            productId: productId,
            quantity,
            totalAmount,
            status: "pending"
        });

        // Save order
        const savedOrder = await order.save();
        
        // Update product stock
        product.stock -= quantity;
        product.available = product.stock > 0;
        await product.save();

        // Update shopkeeper's total orders
        const shopkeeper = await Shop.findById(product.shopId);
        if (shopkeeper) {
            shopkeeper.totalOrders += quantity;
            await shopkeeper.save();
        }

        res.status(201).json({
            message: "Order created successfully",
            order: savedOrder
        });

    } catch (error) {
        console.error("CREATE ORDER ERROR:", error);
        res.status(500).json({ 
            message: "Error creating order",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get orders for vendor with optional status filter
export const getVendorOrders = async (req, res) => {
    try {
        const vendorId = req.user._id;
        const { status } = req.query; // 'pending', 'completed', or undefined for all
        
        // Build query
        const query = { vendorId };
        
        // Add status filter if provided
        if (status === 'pending' || status === 'completed') {
            query.status = status;
        }
        
        const orders = await Order.find(query)
            .populate('productId', 'name price image')
            .populate('shopkeeperId', 'name')
            .sort({ createdAt: -1 });
            
        res.status(200).json(orders);
    } catch (error) {
        console.error("GET VENDOR ORDERS ERROR:", error);
        res.status(500).json({ 
            message: "Error fetching orders",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get orders for shopkeeper with optional status filter
export const getShopOrders = async (req, res) => {
    try {
        const shopkeeperId = req.user._id;
        const { status } = req.query; // 'pending', 'completed', or undefined for all
        
        // Build query
        const query = { shopkeeperId };
        
        // Add status filter if provided
        if (status === 'pending' || status === 'completed') {
            query.status = status;
        }
        
        const orders = await Order.find(query)
            .populate('productId', 'name price image')
            .populate('vendorId', 'name')
            .sort({ createdAt: -1 });
            
        res.status(200).json(orders);
    } catch (error) {
        console.error("GET SHOP ORDERS ERROR:", error);
        res.status(500).json({ 
            message: "Error fetching orders",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
