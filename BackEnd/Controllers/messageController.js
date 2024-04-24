// messageController.js

const Message = require("../Models/messageModel");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

exports.sendMessage = async (req, res) => {
  try {
    const { sender, recipient, text, name } = req.body;

    // Check if a chat already exists between sender and recipient
    let chat = await Chat.findOne({
      participants: { $all: [sender, recipient] },
    });

    // If chat doesn't exist, create a new one
    if (!chat) {
      chat = new Chat({
        participants: [sender, recipient],
        messages: [],
      });
    }

    // Save the message to the database
    const message = new Message({
      sender,
      recipient,
      name,
      text,
    });
    const savedMessage = await message.save();

    // Add the message to the chat
    chat.messages.push(savedMessage);
    await chat.save();

    // Update the userModel with the chatId
    const user = await User.findOne({ _id: sender });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If it's the first message, save the chatId in the userModel
    if (!user.chatId) {
      user.chatId = chat._id;
      await user.save();
    }

    // Emit the new message to all connected clients (if using Socket.IO)
    // io.emit("newMessage", savedMessage);

    res.status(201).json({ message: savedMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMessagesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const messages = await Message.find({ recipient: userId });
    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getLastMessageForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const lastMessage = await Message.findOne({ recipient: userId })
      .sort({ timestamp: -1 })
      .limit(1);
    res.json({ message: lastMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMessagesForCustomerAssistance = async (req, res) => {
  try {
    const messages = await Message.find({
      recipient: "Customer Assistance ID",
    });
    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
