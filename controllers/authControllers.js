const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// JWT Secret and Expiration Time (Set these as environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Helper function to set cookie
const setTokenCookie = (res, token) => {
  res.cookie("authToken", token, {
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
    sameSite: "strict", // Prevent CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (7 days)
  });
};

// Register User
const registerUser = async (req, res) => {
  console.log("This fucking runs");
  const { name, email, password, phone_number } = req.body;
  const role = req.body.role ? req.body.role : "customer";
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Create new user
    const newUser = new User({ name, email, password, phone_number, role });
    await newUser.save();

    // Generate JWT
    const token = generateToken(newUser._id);

    // Set token in HTTP-only cookie
    setTokenCookie(res, token);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  console.log("This fucking runs");
  const { email, password } = req.body;
  try {
    // Find user with the provided email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Generate JWT
    const token = generateToken(user._id);

    // Set token in HTTP-only cookie
    setTokenCookie(res, token);

    res.status(200).json({ message: "Logged in successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
