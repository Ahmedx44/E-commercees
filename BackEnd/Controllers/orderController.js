const Order = require("./../Models/orderModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const Product = require("./../Models/productModel");

exports.createOrder = catchAsync(async (req, res, next) => {
  try {
    const { userId, products, totalAmount, userName, location } = req.body;

    const order = new Order({
      userId,
      products,
      totalAmount,
      userName,
      location,
    });

    await order.save();

    // Update product quantities
    products.forEach(async (productId) => {
      const product = await Product.findById(productId);
      if (product) {
        await product.updateOne({ $inc: { quantity: -1 } });
      }
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

exports.updateOrder = catchAsync(async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
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

exports.getAllOrdersByUser = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ userId: req.params.id });

  if (!orders) {
    return next(new AppError("No orders found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

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
