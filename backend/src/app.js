import express from "express";
import connectDB from "./config/db.js";
import { PORT } from "./constants/constants.js";
import analyticsRouter from "./routes/analyticsRouter.js";
import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRouter.js";
import shopRouter from "./routes/shopRouter.js";
import vendorRouter from "./routes/vendorRouter.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/shops", shopRouter);
app.use("/api/vendors", vendorRouter);
app.use("/api/analytics", analyticsRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port : http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log("SERVER STARTING ERROR",error);
});
