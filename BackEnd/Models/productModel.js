const mongoose = require("mongoose");
const AppError = require("./../utils/appError");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  quantity: {
    type: Number,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  rating: {
    type: Number,
    default: 0, // Default rating to 0
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
  // retailerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", // Assuming your user model is named "User"
  // },
  createdAt: {
    type: Date,
    default: Date.now, // Default to current timestamp
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Default to current timestamp
  },
});

// Middleware to update the 'updatedAt' field before saving
productSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Middleware to ensure retailer role before saving
// productSchema.pre("save", function (next) {
//   // Assuming you have a 'role' field in your User model
//   mongoose.model("User").findById(this.retailerId, (err, user) => {
//     if (err || !user || user.role !== "retailer") {
//       return next(
//         new AppError("You are not allowed to perform this action", 400)
//       );
//     }
//     next();
//   });
// });
// productSchema.pre("save", async function (next) {
//   const retailer = await mongoose.model("User").findById(this.retailerId);
//   if (!retailer || retailer.role !== "retailer") {
//     return next(new AppError("Only retailers can create products", 403));
//   }
//   next();
// });
// Create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
