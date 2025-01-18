// The Promotion model is used to manage discounts, offers, or special deals on your e-commerce platform.

// Why do you need it?
// Customer Attraction: Promotions like discounts on specific products or categories help attract more customers and increase sales.
// Flexible Offers: This allows you to create time-limited offers, such as "10% off on all products in the Dairy category from December 5 to December 10."
// Target Specific Products or Categories: The schema supports applying promotions to either specific products or categories.
// Automation: You can use this model to apply discounts automatically during checkout if a product or category qualifies.
// Example Use Case:
// A promotion named "Festive Sale" offers 15% off on Ghee and Honey products during a specific period.
// Customers see the discounted price automatically during checkout.

const promotionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  discount_percentage: { type: Number, required: true },
  valid_from: { type: Date, required: true },
  valid_to: { type: Date, required: true },
  applicable_categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  ],
  applicable_products: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  ],
});

module.exports = mongoose.model("Promotion", promotionSchema);
