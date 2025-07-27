import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { addShop } from "../controllers/shopController.js";
const shopRouter = express.Router();


shopRouter.post("/addShop", userAuth, addShop);


export default shopRouter;
