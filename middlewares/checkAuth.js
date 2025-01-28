// Import necessary modules
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// JWT secret key (should be stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Middleware to check if the user is authenticated
const authCheck = async (req, res, next) => {
  console.log("Cookies verification", req.cookies);
  try {
    // Extract the token from the cookie
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Fetch the user without password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token or user not found" });
    }

    // Attach user to the request object
    req.user = user;
    // Continue to the next middleware/route
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};

// Export the authentication check middleware to be used in other parts of the application
module.exports = authCheck;