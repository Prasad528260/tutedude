import Product from "../models/product";
import Shop from "../models/shop";

// Shopkeeper adds a new product to their shop
export const addProduct = async (req, res) => {
    try {
        const { shopId } = req.params;
        const { name, description, price, image, stock } = req.body;
        const shopkeeper=req.user;
        
        // Verify the shop exists and belongs to the shopkeeper
        const shop = await Shop.findOne({ _id: shopId, ownerId: shopkeeper._id });
        if (!shop) {
            return res.status(404).json({ message: "Shop not found or unauthorized" });
        }

        const product = new Product({ 
            shopId, 
            name, 
            description, 
            price, 
            image, 
            stock,
            available: stock > 0 
        });

        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("ADD PRODUCT ERROR:", error);
        res.status(500).json({ 
            message: "Error adding product",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all available products (for vendors)
export const getProducts = async (req, res) => {
    try {
        const { name, sort } = req.query;
        let query = { available: true };
        let sortOption = { createdAt: -1 }; // Default sort by newest

        // Filter by product name if provided
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        // Apply sorting if specified
        if (sort === 'price_asc') {
            sortOption = { price: 1 };
        } else if (sort === 'price_desc') {
            sortOption = { price: -1 };
        }

        const products = await Product.find(query)
            .populate('shopId', 'shopName image location')
            .sort(sortOption);
            
        res.status(200).json(products);
    } catch (error) {
        console.error("GET PRODUCTS ERROR:", error);
        res.status(500).json({ 
            message: "Error getting products",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get single product details
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate('shopId', 'shopName ownerId image location');
            
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(product);
    } catch (error) {
        console.error("GET PRODUCT ERROR:", error);
        res.status(500).json({ message: "Error getting product" });
    }
};
