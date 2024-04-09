const express = require("express");
const router = express.Router();
const messageController = require("../Controllers/messageController");
const { protect } = require("../Controllers/authController");

// Define routes
router.get("/", messageController.getAllMessages);
router.post("/send", messageController.sendMessage);
router.get("/:userId", messageController.getMessagesByUser);
router.get("/customer/:customerId", messageController.getMessagesByCustomer);

module.exports = router;
