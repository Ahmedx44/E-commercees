const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
