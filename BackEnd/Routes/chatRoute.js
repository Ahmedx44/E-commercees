const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/chatController");

// Define routes for chat operations
router.get("/:userId", chatController.getChat);
router.get("/:userId/messages", chatController.getChatMessages);
router.post("/:userId/chatId", chatController.saveChatIdToUser);
router.get("/messages/:chatId", chatController.getChatMessagesByChatId);

module.exports = router;
