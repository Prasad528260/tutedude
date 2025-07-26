import express from "express";
import { userAuth } from "../middleware/userAuth";
import { addShop } from "../controllers/shopController";
const shopRouter = express.Router();


shopRouter.post("/addShop", userAuth, addShop);


export default shopRouter;
