const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: [
      "Electronics",
      "Fashion",
      "Home & Kitchen",
      "Sports",
      "Toys",
      "Books",
      "Health & Beauty",
      "Computers & Accessories",
      "Furniture",
      "Automotive",
      "Food & Beverages",
      "Garden & Tools",
      "Movies & Music",
      "Baby",
      "Pet Supplies",
      "Gifts",
      "Crafts",
      "Jewelry",
      "Musical Instruments",
      "Industrial & Scientific",
      "Outdoor Living",
      "Travel",
      "Watches",
      "Luggage",
      "Shoes",
      "Accessories",
      "Art",
      "Handbags",
      "Laptops",
      "Mobile Phones",
      "Tablets",
      "Monitors",
      "Office Products",
      "Tablets",
      "Video Games",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  retailer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [{ rating: Number, comment: String, name: String }],
});

productSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
