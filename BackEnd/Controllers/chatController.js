const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");

exports.getChatMessagesByChatId = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId).populate("messages");
    res.json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getChat = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Assuming you have a method to find chat by user ID
    const chat = await Chat.findOne({ participants: userId }).populate(
      "messages"
    );
    res.json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
exports.getChatMessages = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch the chatId associated with the user
    const user = await User.findById(userId);
    const chatId = user.chatId;

    // Fetch messages associated with the chatId
    const chat = await Chat.findById(chatId).populate("messages");
    res.json({ chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.saveChatIdToUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { chatId } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user document with the new chatId
    user.chatId = chatId;
    await user.save();

    res.status(200).json({ message: "ChatId updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
