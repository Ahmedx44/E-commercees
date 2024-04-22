const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/chatController");

// Route to create a chat
router.post("/", chatController.createChat);

// Route to get user chats
router.get("/:userId", chatController.getUserChats);

module.exports = router;
