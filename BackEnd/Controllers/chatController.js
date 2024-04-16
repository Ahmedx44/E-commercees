const Chat = require("../Models/chatModel");
const Message = require("../Models/messageModel");
const updateUserChats = require("../Controllers/userController");

exports.createChat = async (req, res) => {
  try {
    const { userIds } = req.body;
    const chat = await Chat.create({ participants: userIds, messages: [] });

    // Update user's chats
    await updateUserChats(userIds, chat._id);

    res.status(201).json({ chat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addMessageToChat = async (req, res) => {
  try {
    const { chatId, sender, text } = req.body;

    // Create the message
    const message = await Message.create({
      chat: chatId,
      sender,
      text,
    });

    // Find the chat and update the messages array
    const chat = await Chat.findById(chatId).exec();
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    chat.messages.push(message._id); // Add the message ID to the messages array of the chat
    await chat.save();

    // Update the user's chats array
    const user = await User.findById(sender);
    if (user) {
      user.chats.addToSet(chatId); // Add chatId to the chats array if it doesn't already exist
      await user.save();
    }

    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId)
      .populate({
        path: "messages",
        select: "text sender createdAt",
        populate: { path: "sender", select: "name" }, // Optionally populate sender details
      })
      .populate("participants", "name");
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
