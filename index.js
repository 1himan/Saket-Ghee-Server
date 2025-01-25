// server/index.js

// Import required dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Import route modules
const authRoutes = require("./routes/authRoutes");

// Import models
const Product = require("./models/Product");

/**
 * Server Configuration and Initialization
 *
 * This module sets up an Express server with MongoDB integration,
 * configuring middleware, routes, and database connection.
 *
 * Key Features:
 * - Environment-based configuration
 * - CORS support
 * - JSON and cookie parsing
 * - MongoDB connection
 * - Product and authentication routes
 */
class ServerApp {
  constructor() {
    // Initialize Express application
    this.app = express();

    // Load environment variables
    this.loadEnvironmentConfig();

    // Configure middleware
    this.configureMiddleware();

    // Connect to database
    this.connectDatabase();

    // Setup routes
    this.setupRoutes();
  }

  /**
   * Load environment-specific configuration
   * Selects between production and development environment files
   */
  loadEnvironmentConfig() {
    dotenv.config({
      path:
        process.env.NODE_ENV === "production"
          ? ".env.production"
          : ".env.development",
    });
  }

  /**
   * Configure Express middleware
   * Sets up CORS, JSON parsing, and cookie handling
   */
  configureMiddleware() {
    // CORS configuration
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
      })
    );

    // Parse JSON request bodies
    this.app.use(express.json());

    // Parse cookies
    this.app.use(cookieParser());
  }

  /**
   * Establish MongoDB database connection
   * Handles successful and failed connection scenarios
   */
  connectDatabase() {
    mongoose
      .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/saketGhee")
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process on connection failure
      });
  }

  /**
   * Setup application routes
   * Defines API endpoints for different resources
   */
  setupRoutes() {
    // Root endpoint
    this.app.get("/", (req, res) => {
      res.send("Welcome to the Saket Ghee Server");
    });

    // Product routes
    this.app.use("/products", this.productRoutes());

    // Authentication routes
    this.app.use("/api/auth", authRoutes);
  }

  /**
   * Product route handler
   * Manages product-related API endpoints
   * @returns {express.Router} Configured product routes
   */
  productRoutes() {
    const router = express.Router();

    // Get all products with search and pagination
    router.get("/", async (req, res) => {
      console.log("This fucking runs says the - product route");
      const { search, page = 1, limit = 20 } = req.query;

      try {
        const query = search ? { name: { $regex: search, $options: "i" } } : {};

        const skip = (page - 1) * limit;

        const products = await Product.find(query)
          .skip(skip)
          .limit(Number(limit));

        const totalResults = await Product.countDocuments(query);

        res.status(200).json({ products, totalResults });
      } catch (error) {
        res.status(500).json({
          message: "Error fetching products",
          error: error.message,
        });
      }
    });

    // Get single product by ID
    router.get("/:id", async (req, res) => {
      try {
        const product = await Product.findOne({
          _id: req.params.id,
          $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
        });

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        const transformedProduct = this.transformProduct(product);
        res.status(200).json(transformedProduct);
      } catch (error) {
        this.handleProductError(res, error);
      }
    });

    // Admin routes (placeholder implementations)
    router.post("/", (req, res) => {
      res.status(501).json({ message: "Product creation not implemented" });
    });

    router.put("/:id", (req, res) => {
      res.status(501).json({ message: "Product update not implemented" });
    });

    router.delete("/:id", (req, res) => {
      res.status(501).json({ message: "Product deletion not implemented" });
    });

    return router;
  }

  /**
   * Transform product data to match frontend interface
   * @param {Object} product - MongoDB product document
   * @returns {Object} Transformed product data
   */
  transformProduct(product) {
    return {
      _id: product._id,
      name: product.name,
      description: product.description || "",
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      images: product.images || [product.image],
      videoUrl: product.videoUrl,
      sizes: product.size ? [product.size] : [],
      rating: product.rating,
      reviews: product.reviews,
      quantityAvailable: product.quantityAvailable,
    };
  }

  /**
   * Handle product-related errors
   * @param {express.Response} res - Express response object
   * @param {Error} error - Error object
   */
  handleProductError(res, error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }

  /**
   * Start the Express server
   */
  start() {
    const PORT = process.env.PORT || 5000;
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

// Initialize and start the server
const server = new ServerApp();
server.start();
