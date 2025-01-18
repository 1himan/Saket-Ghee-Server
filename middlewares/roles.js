const User = require("../models/User"); // Your user model

// Middleware to check for user role
const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // Ensure the user is authenticated (e.g., through a token)
      const token =
        req.cookies.authToken || req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
      }

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id); // Find user from decoded token

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has the required role
      if (user.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Access denied: Insufficient role" });
      }

      // Attach the user to the request object for use in the route handler
      req.user = user;
      next(); // Proceed to the next middleware/route handler
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = checkRole;
