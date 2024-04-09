// messageController.js

const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllMessages = catchAsync(async (req, res, next) => {
  try {
    const messages = await Message.find();
    if (messages.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No messages found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        messages,
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return next(new AppError("Error fetching messages", 500));
  }
});

exports.getMessagesByUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new AppError("Error finding user", 500));
  }

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  let messages;
  try {
    messages = await Message.find({
      $or: [
        { $and: [{ sender: userId }, { recipient: { $ne: userId } }] },
        { $and: [{ sender: { $ne: userId } }, { recipient: userId }] },
      ],
    })
      .populate("sender", "userName email")
      .populate("recipient", "userName email");
  } catch (err) {
    return next(new AppError("Error fetching messages", 500));
  }

  if (!messages) {
    return next(new AppError("No messages found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
      messages,
    },
  });
});

exports.getMessagesByCustomer = catchAsync(async (req, res, next) => {
  const { customerId } = req.params;

  try {
    const messages = await Message.find({ recipient: customerId }).populate(
      "sender",
      "userName"
    );
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { recipientId, text } = req.body;
  const senderId = req.user._id; // Assuming the authenticated user is the sender

  try {
    const sender = await User.findById(senderId);
    if (!sender) {
      throw new Error("Sender not found");
    }

    const message = await Message.create({
      sender: senderId,
      recipient: recipientId,
      userName: userName, // Include the userName here
      text: text,
    });

    res.status(200).json({
      status: "success",
      data: {
        message,
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
