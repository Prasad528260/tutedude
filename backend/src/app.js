import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
import analyticsRouter from "./routes/analyticsRouter.js";
import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRouter.js";
import shopRouter from "./routes/shopRouter.js";
import vendorRouter from "./routes/vendorRouter.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    credentials: true
}));
const _dirname = path.resolve();

app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/shops", shopRouter);
app.use("/api/vendors", vendorRouter);
app.use("/api/analytics", analyticsRouter);


if (process.env.NODE_ENV==='production') {
    app.use(express.static(path.join(_dirname,"../frontend/dist")))
    app.get(/(.*)/,(req,res)=>{
      res.sendFile(path.join(_dirname,"../frontend","dist","index.html"));
    })
  }

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port : http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log("SERVER STARTING ERROR",error);
});
