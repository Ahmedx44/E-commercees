const express = require("express");
const chatController = require("../Controllers/chatController");
const Message = require("../Models/messageModel");

const router = express.Router();

// Route for fetching messages for a chat
router.post("/", chatController.createChat);
router.get("/:chatId", chatController.getChat);
router.get("/:chatId/messages", async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId }).populate("sender");
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
