import User from "../models/user";
import jwt from "jsonwebtoken";
export const userAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.log("TOKEN NOT FOUND AT USER AUTH");
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {id,role} = decoded;
    const user = User.findById(id);
    if (!user) {
        console.log("USER NOT FOUND AT USER AUTH");
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
};
export const vendorAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.log("TOKEN NOT FOUND AT VENDOR AUTH");
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {id,role} = decoded;
    const user = User.findOne({id, role});
    if (!user) {
        console.log("USER NOT FOUND AT VENDOR AUTH");
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
};
export const shopkeeperAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.log("TOKEN NOT FOUND AT SHOPKEEPER AUTH");
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {id,role} = decoded;
    const user = User.findOne({id, role});
    if (!user) {
        console.log("USER NOT FOUND AT SHOPKEEPER AUTH");
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
};

