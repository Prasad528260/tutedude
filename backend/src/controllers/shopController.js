import { Shop } from "../models/shop.js";

export const addShop = async (req, res) => {
    try {
        const { shopName, description,image, location } = req.body;
        const shop = new Shop({
            shopName,
            description,
            image,
            location,
            ownerId: req.user._id,
        });
        const newShop = await shop.save();
        res.status(201).json(newShop);
    } catch (error) {
        console.error("ADD SHOP ERROR", error);
        res.status(500).json({ message: "Error adding shop" });
    }
};
