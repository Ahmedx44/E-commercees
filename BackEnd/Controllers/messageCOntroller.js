const Chat = require("../Models/chatModel");
const Message = require("../Models/messageModel");

// exports.sendMessage = async (req, res) => {
//   try {
//     const { chatId, sender, text } = req.body;

//     // Create the message
//     const message = await Message.create({
//       chat: chatId, // Associate the message with the chat document
//       sender,
//       text,
//     });

//     // Find the chat and update the messages array
//     const chat = await Chat.findById(chatId).exec();
//     if (!chat) {
//       return res.status(404).json({ error: "Chat not found" });
//     }

//     chat.messages.push(message._id); // Add the message's _id to the messages array of the chat
//     await chat.save();

//     // Emit the new message to the socket
//     io.emit("new_message", message);

//     res.status(201).json({ message });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.sendMessage = async (req, res) => {
  try {
    const { chatId, sender, text } = req.body;

    // Create the message
    const message = await Message.create({ chat: chatId, sender, text });

    // Find the chat and update the messages array
    const chat = await Chat.findById(chatId).exec();
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    chat.messages.push(message); // Push the message object into the messages array
    await chat.save();

    // Emit the new message to the socket
    io.emit("new_message", message);

    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
