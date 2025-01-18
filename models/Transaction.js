// This model will be used to track each order's payment details on our platform

// Why do you need it?
// Payment Tracking: It helps keep a record of every payment made by users for transparency.
// Error Handling: It tracks the status of transactions (Pending, Failed, or Success) to handle payment errors or delays.
// Integration with Payment Gateways: When using payment gateways like Razorpay, Stripe, or PayPal, each transaction generates a unique transaction_id for reference.
// Legal and Financial Reporting: The model ensures compliance with financial laws and generates data for accounting or audits.
// Example Use Case:
// A user purchases Ghee for ₹1000 using a credit card. The system creates a transaction with details like the payment method, amount, and status.
// If the payment fails, you can retry or show a message to the user.


const transactionSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  payment_method: {
    type: String,
    enum: ["Credit Card", "Debit Card", "Cash on Delivery"],
    required: true,
  },
  transaction_id: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Failed", "Success"],
    default: "Pending",
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
