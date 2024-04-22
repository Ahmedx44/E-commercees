const express = require("express");
const router = express.Router();
const messageController = require("../Controllers/messageController");

router.post("/send", messageController.sendMessage);
router.get("/user/:userId", messageController.getMessagesForUser);
router.get(
  "/customerAssistance",
  messageController.getMessagesForCustomerAssistance
);
router.get("/user/:userId/last", messageController.getLastMessageForUser);

module.exports = router;
