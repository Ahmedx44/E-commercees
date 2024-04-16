// customerAssistanceController.js
exports.getUnreadChats = async (req, res) => {
  const chats = await Chat.find({
    participants: { $in: [req.user._id] },
    "messages.readByCustomerAssistance": false,
  })
    .populate("participants", "name")
    .sort({ updatedAt: -1 });
  res.status(200).json({ chats });
};
