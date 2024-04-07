// messageController.js

const Message = require("../Models/messageModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getUsersWithMessages = catchAsync(async (req, res, next) => {
  const usersWithMessages = await Message.find().distinct("sender");

  res.status(200).json({
    status: "success",
    data: {
      users: usersWithMessages,
    },
  });
});

exports.getMessagesWithUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const messages = await Message.find({
    $or: [{ sender: userId }, { recipient: userId }],
  }).populate("sender recipient");

  res.status(200).json({
    status: "success",
    data: {
      messages,
    },
  });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { recipientId, text } = req.body;
  const senderId = req.user._id; // Assuming the authenticated user is the customer assistance

  const message = await Message.create({
    sender: senderId,
    recipient: recipientId,
    text: text,
  });

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});
