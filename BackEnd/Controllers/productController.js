const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Product = require("./../Models/productModel");

const cloudinary = require("cloudinary");

exports.createProduct = async (req, res, next) => {
  try {
    // Destructure the required fields from the request body
    const { name, description, price, quantity, category, image } = req.body;

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
};

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const product = await Product.find();

  res.status(200).json({
    status: "success",
    number: product.length,
    requestAt: req.requestTime,
    data: product,
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
