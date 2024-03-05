const Order = require("./../Models/orderModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createOrder = catchAsync(async (req, res, next) => {
  const order = Order.create(req.body);

  if (!order) {
    next(new AppError("no order created", 400));
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.getOrdersByUserId = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.params.userId });

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

// Update an order by ID (Admin only)
exports.updateOrder = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  // Update the order
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError("No order with that id found", 400));
  }

  res.status(200).json({
    status: "success",
  });
});
