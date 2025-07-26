import express from "express";
import connectDB from "./config/db";
import { PORT } from "./constants/constants";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port : http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log("SERVER STARTING ERROR",error);
});
