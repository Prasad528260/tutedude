import express from "express";
import { userAuth, shopkeeperAuth } from "../middleware/userAuth.js";
import { 
    createOrder, 
    getVendorOrders, 
    getShopOrders
} from "../controllers/orderController.js";

const router = express.Router();

// Vendor routes
router.post("/orders", userAuth, createOrder);
router.get("/vendor/orders", userAuth, getVendorOrders);

// Shopkeeper routes
router.get("/shop/orders", userAuth, shopkeeperAuth, getShopOrders);

export default router;