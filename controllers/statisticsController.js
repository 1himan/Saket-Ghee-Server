// statisticsController.js
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

exports.getStatistics = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalOrders = await Order.countDocuments();
    const activeCustomers = await User.countDocuments({ isActive: true });
    const pendingDeliveries = await Order.countDocuments({ status: "Pending" });

    res.status(200).json({
      totalSales: totalSales[0]?.total || 0,
      totalOrders,
      activeCustomers,
      pendingDeliveries,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statistics." });
  }
};
