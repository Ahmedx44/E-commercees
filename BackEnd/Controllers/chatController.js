const Chat = require("../Models/chatModel");

// Controller to fetch chat data
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
