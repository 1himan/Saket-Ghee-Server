const mongoose = require("mongoose");
const Product = require("./models/Product");
const products = require("./data/products");

async function initializeData() {
  try {
    await mongoose.connect("mongodb://localhost:27017/saketGhee", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear the existing collection
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert dummy data
    await Product.insertMany(products);
    console.log("Inserted dummy data");

    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error initializing data:", error);
    mongoose.connection.close();
  }
}

initializeData();
