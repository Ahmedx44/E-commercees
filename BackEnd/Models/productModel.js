const mongoose = require("mongoose");
const AppError = require("./../utils/appError");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: [],
  //   retailerId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
});

// productSchema.pre("save", (next) => {
//   if (this.retailerId.role === "retailer") {
//     next();
//   } else {
//     next(new AppError("You are not allowed to perform this action", 400));
//   }
// });
// Create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
