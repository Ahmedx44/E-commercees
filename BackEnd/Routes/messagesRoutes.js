// messagesRoutes.js

const express = require("express");
const router = express.Router();
const messageController = require("../Controllers/messageController"); // Corrected file path
const { protect } = require("../Controllers/authController");

// Define routes
router.get("/users", protect, messageController.getUsersWithMessages);
router.get(
  "/user/:userId/messages",
  protect,
  messageController.getMessagesWithUser
);
router.post("/send", protect, messageController.sendMessage);

module.exports = router;
