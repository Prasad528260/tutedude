import Product from "../models/product";

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, image, stock  } = req.body;
        const { shopId } = req.params;
        const product = new Product({ shopId, name, description, price, image, stock,available: stock > 0 });
       const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("ADD PRODUCT ERROR", error);
        res.status(500).json({ message: "Error adding product" });
    }
};
export const getProducts = async (req, res) => {
    try {
        const { name, sort } = req.query;
        let query = { available: true };
        let sortOption = {};

        // Filter by exact product name if provided
        if (name) {
            query.name = {$regex: name, $options: 'i'};
        }

        // Set sort option based on query parameter
        if (sort === 'price_asc') {
            sortOption = { price: 1 }; // Sort by price low to high
        } else if (sort === 'price_desc') {
            sortOption = { price: -1 }; // Sort by price high to low
        }

        const products = await Product.find(query).sort(sortOption);
        res.status(200).json(products);
    } catch (error) {
        console.error("GET PRODUCTS ERROR", error);
        res.status(500).json({ message: "Error getting products" });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("shopId", "shopName ownerId image location");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("GET PRODUCT ERROR", error);
        res.status(500).json({ message: "Error getting product" });
    }
};
