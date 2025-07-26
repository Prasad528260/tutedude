import express from "express";
const router = express.Router();
import {
  addProduct,
  getProducts,
  getProduct
} from "../controllers/productController";
import { userAuth, shopkeeperAuth } from "../middleware/userAuth";


// Shopkeeper creates a product
router.post("/shops/:shopId/products", userAuth, shopkeeperAuth, addProduct);

// Vendor views all products
router.get("/products", userAuth, getProducts);

// Get single product details
router.get("/products/:id", userAuth, getProduct);

export default router;
