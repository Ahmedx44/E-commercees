const Message = require("../Models/messageModel");

const User = require("../Models/userModel");

exports.sendMessage = async (req, res) => {
  try {
    const { sender, recipient, text } = req.body;
    // You might want to add additional validation here to ensure sender and recipient are valid

    const message = await Message.findOneAndUpdate(
      { sender: sender, recipient: recipient },
      { $push: { text: { sender: sender, message: text } } },
      { upsert: true, new: true }
    );
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
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
