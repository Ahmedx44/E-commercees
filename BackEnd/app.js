const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Message = require("./Models/messageModel");
const usersRoute = require("./Routes/userRoute");
const productsRoute = require("./Routes/productsRoute");
const ordersRoute = require("./Routes/ordersRoutes");
const User = require("./Models/userModel");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const messageRoutes = require("./Routes/messageRoute");
const chatRoute = require("./Routes/chatRoute");
const Chat = require("./Models/chatModel");
const cors = require("cors");
const cloudinary = require("./utils/cloudinaryy"); // Assuming cloudinary is used for image uploads/storage

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://e-commercees-a4ree09vw-ahmedx44s-projects.vercel.app",
    methods: ["GET", "POST"],
    Credential: true,
  },
});

// Set a larger size limit for raw request bodies (e.g., 50MB)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(cookieParser());

// Set a larger size limit for request bodies (e.g., 50MB)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Routes
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoute);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages
  socket.on("sendMessage", async (messageData) => {
    try {
      // Check if a chat already exists between sender and recipient
      let chat = await Chat.findOne({
        participants: { $all: [messageData.sender, messageData.recipient] },
      });

      // If chat doesn't exist, create a new one
      if (!chat) {
        chat = new Chat({
          participants: [messageData.sender, messageData.recipient],
          messages: [],
        });
      }

      // Save the message to the database
      const message = new Message({
        sender: messageData.sender,
        recipient: messageData.recipient,
        name: messageData.name,
        text: messageData.text,
      });
      const savedMessage = await message.save();

      // Add the message to the chat
      chat.messages.push(savedMessage);
      await chat.save();

      // Emit the new message to all connected clients
      io.emit("newMessage", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
