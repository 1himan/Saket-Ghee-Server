const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");
const rateLimiter = require("../middlewares/rateLimit");
const authCheck = require("../middlewares/authCheck");

const router = express.Router();

router.get("/user-details", authCheck, (req, res) => {
  console.log("User details retrieved successfully - on GET /user-details in authRoutes.js");
  res.status(200).json({
    isAuthenticated: true,
    message: "User details retrieved successfully",
    user: req.user,
  });
});

// Register Route
router.post("/register", rateLimiter, registerUser);

// Login Route
router.post("/login", rateLimiter, loginUser);

// Logout Route
router.post("/logout", rateLimiter, logoutUser);

router.get("/check", authCheck, (req, res) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
});

module.exports = router;
