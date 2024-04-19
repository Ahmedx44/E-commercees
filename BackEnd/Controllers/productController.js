const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Product = require("./../Models/productModel");

const cloudinary = require("cloudinary");

exports.createProduct = catchAsync(async (req, res, next) => {
  try {
    // Destructure the required fields from the request body
    const { name, description, price, quantity, category, image, retailer } =
      req.body;

    // Upload the image to Cloudinary and get the URL
    const uploadedImage = await cloudinary.uploader.upload(image, {
      upload_preset: "ecommerce",
    });

    // Create a new product instance with the details
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category,
      image: uploadedImage.secure_url, // Store the secure URL of the image
      retailer, // Include retailer ID
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product
    res.status(201).json(savedProduct);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
exports.createProductReview = async (req, res, next) => {
  const { rating, comment, name } = req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Add the new review to the product
    product.reviews.push({ rating, comment, name });
    await product.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const category = req.query.category;
  const price = req.query.price;

  const query = {};

  if (category) {
    query.category = category;
  }

  if (price) {
    const priceRange = price.split("-");
    const minPrice = priceRange[0] ? parseFloat(priceRange[0]) : 0;
    const maxPrice = priceRange[1] ? parseFloat(priceRange[1]) : Infinity;
    query.price = { $gte: minPrice, $lte: maxPrice };
  }

  const products = await Product.find(query).skip(skip).limit(limit).exec();
  const totalCount = await Product.countDocuments(query);

  res.status(200).json({
    status: "success",
    number: products.length,
    requestAt: req.requestTime,
    total: totalCount,
    limit: limit,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    data: products,
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    next(new AppError("No product found", 400));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    next(new AppError("no product is found", 404));
  }
  res.status(200).json({ status: "success" });
});
exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No product found", 404));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.getProductsByRetailerId = catchAsync(async (req, res, next) => {
  const retailerId = req.params.retailerId;

  // Find products based on retailer ID
  const products = await Product.find({ retailer: retailerId });

  // Check if any products were found
  if (products.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No products found for the given retailer ID",
    });
  }

  // Respond with the products
  res.status(200).json({
    status: "success",
    data: products,
  });
});
