// Import the Product model
const Product = require("../models/Product");

// Controller to get all products with search and pagination
exports.getAllProducts = async (req, res) => {
  const { search, page = 1, limit = 20 } = req.query;

  try {
    const query = search
      ? { name: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    const skip = (page - 1) * limit;

    const products = await Product.find(query).skip(skip).limit(Number(limit));
    const totalResults = await Product.countDocuments(query);

    res.status(200).json({ products, totalResults });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// Controller to get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    handleProductError(res, error);
  }
};

// Controller to create a new product (Admin Only)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      discount,
      image,
      images,
      videoUrl,
      sizes,
      rating,
      reviews,
      quantityAvailable,
      seller,
      category,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      originalPrice,
      discount,
      image,
      images,
      videoUrl,
      sizes,
      rating,
      reviews,
      quantityAvailable,
      seller,
      category,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

// Controller to update a product (Admin Only)
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    handleProductError(res, error);
  }
};

// Controller to delete a product (Admin Only)
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndUpdate(
      productId,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
  } catch (error) {
    handleProductError(res, error);
  }
};

// Helper function to handle errors related to product operations
function handleProductError(res, error) {
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid product ID format" });
  }
  res.status(500).json({
    message: "Error processing request",
    error: error.message,
  });
}
