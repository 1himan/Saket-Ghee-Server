//checkAuth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const authCheck = async (req, res, next) => {
  console.log("Cookies verification", req.cookies);
  try {
    const token = req.cookies.authToken; // Extract the token from the cookie
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    const user = await User.findById(decoded.id).select("-password"); // Fetch the user without password

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token or user not found" });
    }

    req.user = user; // Attach user to the request object
    next(); // Continue to the next middleware/route
  } catch (error) {
    console.error("Authentication error:", error);
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = authCheck;
