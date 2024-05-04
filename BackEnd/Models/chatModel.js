const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Participants of the chat
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], // Messages in the chat
  name: { type: String },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
