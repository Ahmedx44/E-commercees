const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: [true, "required"],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  totalAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed"],
    default: "pending",
  },
  location: {
    type: [Number],
    index: "2dsphere",
  },
});

// Pre-save middleware to calculate totalAmount based on product prices
orderSchema.pre("save", async function (next) {
  try {
    let totalAmount = 0;
    // Populate products to access their prices
    await this.populate("products");
    // Sum up the prices of all products
    this.products.forEach((product) => {
      totalAmount += product.price;
    });
    // Set the totalAmount for the order
    this.totalAmount = totalAmount;
    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
