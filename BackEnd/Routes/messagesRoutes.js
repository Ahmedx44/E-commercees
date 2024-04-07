// messagesRoutes.js

const express = require("express");
const router = express.Router();
const messageController = require("../Controllers/messageController"); // Corrected file path
const { protect } = require("../Controllers/authController");

// Define routes
router.get("/", messageController.getMessages);
router.get("/users", messageController.getUsersWithMessages);

router.post("/send", protect, messageController.sendMessage);
router.get("/:userId", messageController.getMessagesByUser);

module.exports = router;
