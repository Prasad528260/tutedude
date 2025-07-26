import express from "express";
import { userAuth, shopkeeperAuth } from "../middleware/userAuth";
import { 
    createOrder, 
    getVendorOrders, 
    getShopOrders
} from "../controllers/orderController";

const router = express.Router();

// Vendor routes
router.post("/orders", userAuth, createOrder);
router.get("/vendor/orders", userAuth, getVendorOrders);

// Shopkeeper routes
router.get("/shop/orders", userAuth, shopkeeperAuth, getShopOrders);

export default router;