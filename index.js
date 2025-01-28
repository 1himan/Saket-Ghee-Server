// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

class ServerApp {
  constructor() {
    // initialize express app
    this.app = express();
    // load environment variables - function call:1
    this.loadEnvironmentConfig();
    // configure middleware - function call:2
    this.configureMiddleware();
    // connect to database - function call:3
    this.connectDatabase();
    // setup routes - function call:4
    this.setupRoutes();
  }
  // function definition:1
  loadEnvironmentConfig() {
    dotenv.config({
      path:
        process.env.NODE_ENV === "production"
          ? ".env.production"
          : ".env.development",
    });
  }
  // function definition:2
  configureMiddleware() {
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
      })
    );

    this.app.use(express.json());
    this.app.use(cookieParser());
  }
  // function definition:3
  connectDatabase() {
    mongoose
      .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/saketGhee")
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
      });
  }
  // function definition:4
  setupRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Welcome to the Saket Ghee Server");
    });

    this.app.use("/products", productRoutes);
    this.app.use("/api/auth", authRoutes);
  }

  start() {
    const PORT = process.env.PORT || 5000;
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

// Initialize and start the server
const server = new ServerApp();``
server.start();

// can we see that what the final code of this server file looks like after importing all of modules
// and resolving all of the function calls, classes initialization etc? - If yes, then how?