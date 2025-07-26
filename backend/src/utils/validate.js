export const validateSignup = (name, email, password, role, contactNumber, location) => {
    if (!name || !email || !password || !role || !contactNumber || !location) {
        throw new Error("All fields are required");
    }
    if (role !== "vendor" && role !== "shopkeeper") {
        throw new Error("Invalid role");
    }
    if (contactNumber.length !== 10) {
        throw new Error("Invalid contact number");
    }
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }
    if (!email.includes("@")) {
        throw new Error("Invalid email");
    }
    return true;
};

export const validateLogin = (email, password) => {
    
};
