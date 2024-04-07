// messageController.js

const Message = require("../Models/messageModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getMessagesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Fetching messages for user:", userId);
    const messages = await Message.find({ sender: userId });
    console.log("Fetched messages:", messages);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// messageController.js
exports.getUsersWithMessages = catchAsync(async (req, res, next) => {
  try {
    const usersWithMessages = await Message.find({
      recipient: req.user.id,
    }).distinct("sender");
    const users = await User.find({ _id: { $in: usersWithMessages } });
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.error("Error fetching users with messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
