//server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
require("dotenv").config({
  path:
    process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});
const Product = require("./models/Product");

// middlewares and configurations
// Create an Express app
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Enable sending cookies
  })
);
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/saketGhee")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, it's me");
});

// to get all of the products
app.get("/products", async (req, res) => {
  const { search, page = 1, limit = 20 } = req.query;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(req.query);
  try {
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const skip = (page - 1) * limit;

    // Fetch products with pagination
    const products = await Product.find(query).skip(skip).limit(Number(limit));

    // Get the total count of matching products
    const totalResults = await Product.countDocuments(query);

    res.status(200).json({ products, totalResults });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Get single product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Transform the data to match the frontend interface
    const transformedProduct = {
      _id: product._id,
      name: product.name,
      description: product.description || "",
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      images: product.images || [product.image],
      videoUrl: product.videoUrl || undefined,
      sizes: product.size ? [product.size] : [],
      rating: product.rating,
      reviews: product.reviews,
      quantityAvailable: product.quantityAvailable,
    };
    console.log(transformedProduct);
    res.status(200).json(transformedProduct);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
});

// Use the authentication routes
app.use("/api/auth", authRoutes);

// Admin Routes
app.post("/products", (req, res) => {
  // Create a new product in the database
  res.send("Hello, it's me");
});
app.put("/products/:id", (req, res) => {
  // Update a product in the database
  res.send("Hello, it's me");
});
app.delete("/products/:id", (req, res) => {
  // Delete a product from the database
  res.send("Hello, it's me");
});