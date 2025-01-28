// orderController.js
const Order = require("../models/Order");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
};
