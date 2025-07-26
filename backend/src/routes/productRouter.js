import express from "express";
const productRouter = express.Router();
import {
  addProduct,
  getProducts,
  getProduct,
} from "../controllers/productController";
import { userAuth } from "../middleware/userAuth";

productRouter.post("/addProduct/:shopId", userAuth, addProduct);
productRouter.get("/getProducts", userAuth, getProducts);
productRouter.get("/getProduct/:id", userAuth, getProduct);

export default productRouter;
