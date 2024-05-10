const catchAsync = require("../utils/catchAsync");
const User = require("../Models/userModel");

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    total: users.length,
    data: {
      users,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUserData = req.body;

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
    });
  }
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
// controllers/userController.js

exports.updateUserChats = async (req, res, next) => {
  try {
    const { id, chatId } = req.body;

    // Update user's chats field
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $addToSet: { chats: chatId } }, // Add chatId to the chats array if it doesn't already exist
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Error updating user chats:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user chats",
    });
  }
};
exports.getUserChatId = catchAsync(async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Fetch user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Check if user has a chatId
    if (!user.chatId) {
      return res.status(404).json({
        status: "fail",
        message: "ChatId not found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        chatId: user.chatId,
      },
    });
  } catch (error) {
    console.error("Error fetching user chatId:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user chatId",
    });
  }
});

exports.getRetailers = catchAsync(async (req, res, next) => {
  const role = req.query.role || "retailer"; // Default to "retailer" if role is not provided in the query
  const retailers = await User.find({ role });
  res.status(200).json({
    status: "success",
    total: retailers.length,
    data: {
      retailers,
    },
  });
});
