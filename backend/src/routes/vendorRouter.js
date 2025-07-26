import express from "express";
import { userAuth } from "../middleware/userAuth";
import { 
    getNearbyVendors,
    getVendorOrderHistory,
    repeatOrder 
} from "../controllers/vendorController";

const vendorRouter = express.Router();

// Vendor routes
vendorRouter.get("/nearby-vendors", userAuth, getNearbyVendors);
vendorRouter.get("/orders/history", userAuth, getVendorOrderHistory);
vendorRouter.post("/orders/repeat/:orderId", userAuth, repeatOrder);

export default vendorRouter;