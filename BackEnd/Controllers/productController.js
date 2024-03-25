const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Product = require("./../Models/productModel");
const cloudinary = require("./../utils/cloudinary");

exports.addProduct = catchAsync(async (req, res, next) => {
  // const product = await Product.create(req.body);
  const { name, description, price, quantity, category, image } = req.body;
  const result = await cloudinary.uploader.upload(image, { folder: products });

  if (!product) {
    next(new AppError("no data entered"));
  }

  const product = await Product.create({
    name,
    description,
    price,
    quantity,
    category,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(201).json({
    status: "success",
    product,
  });
});

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
