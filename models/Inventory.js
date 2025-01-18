const inventorySchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  warehouse_id: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
  stock: { type: Number, required: true },
  low_stock_threshold: { type: Number, default: 10 },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inventory", inventorySchema);
