// The Warehouse model is used to manage inventory across multiple storage locations.

// Why do you need it?
// Inventory Management: It helps track stock levels for products stored in different locations (warehouses).
// Efficient Delivery: By knowing the nearest warehouse to a customer's location, you can optimize shipping times and reduce delivery costs.
// Scaling: As your business grows, you might have multiple warehouses in different cities or regions. This model helps keep everything organized.
// Stock Replenishment: You can monitor low stock levels and replenish products before they run out.
// Example Use Case:
// You have warehouses in Delhi and Mumbai. When a customer from Delhi places an order, your system can prioritize fulfilling it from the Delhi warehouse to save time and costs.

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    street: String,
    city: String,
    state: String,
    postal_code: String,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
