// customerAssistanceRoutes.js
const express = require("express");
const router = express.Router();
const customerAssistanceController = require("../Controllers/customerAssistanceController");

router.get("/unread-chats", customerAssistanceController.getUnreadChats);

module.exports = router;
