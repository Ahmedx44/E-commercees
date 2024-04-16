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
