const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true }, // Main image of the product
    images: [{ type: String }], // Updated to handle multiple images
    videoUrl: { type: String, trim: true }, // Video URL field added for product videos
    rating: { type: Number, min: 0, max: 5, required: true }, // Rating between 0 and 5
    reviews: { type: Number, min: 0, required: true }, // Number of reviews for the product
    price: { type: Number, min: 0, required: true }, // Current price of the product
    originalPrice: { type: Number, min: 0, required: true }, // Original price before any discount
    discount: { type: Number, min: 0, max: 100, required: true }, // Discount percentage
    sizes: [
      new mongoose.Schema(
        {
          value: { type: String, required: true }, // e.g., "1 litre", "500ml"
          price: { type: Number, min: 0, required: true }, // Price for this size
          quantityAvailable: { type: Number, min: 0, required: true }, // Stock for this size
        },
        { _id: false } // Prevents generating an `_id` for each embedded size document
      ),
    ],
    quantityAvailable: { type: Number, min: 0, required: true }, // Total available stock for the product
    seller: { type: String, required: true }, // Seller information (important for multi-seller support)
    description: { type: String, trim: true }, // Product description for better understanding
    category: { type: String, required: true, trim: true }, // Category of the product for filtering
    isDeleted: { type: Boolean, default: false }, // Soft delete for unavailable products (no permanent deletion)
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Product", productSchema);
