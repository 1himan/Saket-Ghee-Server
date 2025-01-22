const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");
const rateLimiter = require("../middlewares/rateLimit");
const authCheck = require("../middlewares/checkAuth");

const router = express.Router();

// Register Route
router.post("/register",rateLimiter, registerUser);

// Login Route
router.post("/login", rateLimiter,loginUser);

// Logout Route
router.post("/logout",rateLimiter, logoutUser);

router.get("/user-details",authCheck, (req, res) => {
  console.log("This fucking runs");
  res.status(200).json({ message: "User details", user: req.user });
});

router.get("/check", authCheck, (req, res) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
});

module.exports = router;
