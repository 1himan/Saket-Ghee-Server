const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent_category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Category", categorySchema);
