const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/chatController");

// Define routes for chat operations
router.get("/:userId", chatController.getChat);

module.exports = router;
