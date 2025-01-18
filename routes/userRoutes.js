const express = require("express");
const passport = require("passport");
const User = require("../models/User"); // Adjust path if necessary

const router = express.Router();

// Signup Route (Create a new user)
router.post("/signup", async (req, res) => {
  const { name, email, password, phone_number } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Create new user
    const newUser = new User({ name, email, password, phone_number });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

// Login Route (Authenticate using Passport)
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Logged in successfully", user: req.user });
});

// Logout Route (Destroy session)
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
