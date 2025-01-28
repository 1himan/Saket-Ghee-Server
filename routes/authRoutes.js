// Import necessary modules
const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");
const rateLimiter = require("../middlewares/rateLimit");
const authCheck = require("../middlewares/checkAuth");

const router = express.Router();

// Route to get user details (authenticated users only)
// This route handles GET requests to fetch authenticated user details
router.get("/user-details", authCheck, (req, res) => {
  console.log("User details retrieved successfully - on GET /user-details in authRoutes.js");
  res.status(200).json({
    isAuthenticated: true,
    message: "User details retrieved successfully",
    user: req.user,
  });
});

// Route to register a new user
// This route handles POST requests to register a new user
router.post("/register", rateLimiter, registerUser);

// Route to login a user
// This route handles POST requests to login a user
router.post("/login", rateLimiter, loginUser);

// Route to logout a user
// This route handles POST requests to logout a user
router.post("/logout", rateLimiter, logoutUser);

// Route to check if a user is authenticated
// This route handles GET requests to check if a user is authenticated
router.get("/check", authCheck, (req, res) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
});

// Export the router to be used in other parts of the application
module.exports = router;