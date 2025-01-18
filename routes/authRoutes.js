const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");
const rateLimiter = require("../middlewares/rateLimit");

const router = express.Router();

// Register Route
router.post("/register",rateLimiter, registerUser);

// Login Route
router.post("/login", rateLimiter,loginUser);

// Logout Route
router.post("/logout",rateLimiter, logoutUser);

module.exports = router;
