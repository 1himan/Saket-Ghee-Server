// Import necessary modules
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");

// Route to get all products
// This route handles GET requests to fetch all products
router.get("/", productController.getAllProducts);

// Route to get a single product by ID
// This route handles GET requests to fetch a product by its ID
router.get("/:id", productController.getProductById);

// Route to create a new product (admin only)
// This route handles POST requests to create a new product
// dummy data for this route/endpoint/controller
// {
//   "name": "Organic Honey",
//   "image": "https://example.com/images/organic-honey-main.jpg",
//   "images": [
//     "https://example.com/images/organic-honey-1.jpg",
//     "https://example.com/images/organic-honey-2.jpg"
//   ],
//   "videoUrl": "https://example.com/videos/organic-honey.mp4",
//   "rating": 4.8,
//   "reviews": 102,
//   "price": 12.99,
//   "originalPrice": 15.99,
//   "discount": 20,
//   "sizes": [
//     {
//       "value": "500g",
//       "price": 12.99,
//       "quantityAvailable": 50
//     },
//     {
//       "value": "1kg",
//       "price": 24.99,
//       "quantityAvailable": 30
//     }
//   ],
//   "quantityAvailable": 80,
//   "seller": "Nature's Best Products",
//   "description": "Pure and natural honey sourced from organic farms. Packed with nutrients and antioxidants.",
//   "category": "Honey"
// }

router.post("/", productController.createProduct);

// Route to update an existing product (admin only)
// This route handles PUT requests to update a product by its ID
// {
//   "price": 10.99,
//   "originalPrice": 14.99,
//   "discount": 25,
//   "quantityAvailable": 150,
//   "description": "Updated: Premium organic honey with a richer flavor profile."
// }

router.put("/:id", productController.updateProduct);

// Route to delete a product (admin only)
// This route handles DELETE requests to delete a product by its ID
router.delete("/:id", productController.deleteProduct);

// Export the router to be used in other parts of the application
module.exports = router;