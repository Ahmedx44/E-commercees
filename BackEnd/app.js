const express = require("express");
const usersRoute = require("./Routes/userRoute");
const productsRoute = require("./Routes/productsRoute");
const ordersRoute = require("./Routes/ordersRoutes");
const User = require("./Models/userModel");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Chat = require("./Models/chatModel");
const chatRoutes = require("./Routes/chatRoute");
const customerAssistanceRoutes = require("./Routes/customerAssistanceRoute");
const messageRoute = require("./Routes/messageRoute");
const Message = require("./Models/messageModel");
const cors = require("cors");
const cloudinary = require("./utils/cloudinaryy"); // Assuming cloudinary is used for image uploads/storage
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // Allow all origins, or specify your frontend URL if needed
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
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
app.use("/api/messages", messageRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/chats", chatRoutes);
app.use("/api/customer-assistance", customerAssistanceRoutes);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("send_message", async (message) => {
    try {
      // Check if the chat already exists for the sender and assistance
      const { sender, text } = message;
      const assistanceId = "66100272885b8ec4444466ea"; // Replace with actual assistance ID
      const chat = await Chat.findOne({
        participants: { $all: [sender, assistanceId] },
      }).exec();

      // If chat doesn't exist, create a new one
      if (!chat) {
        const newChat = await Chat.create({
          participants: [sender, assistanceId],
          lastMessage: null,
        });
        // Assign the newly created chat to the message
        message.chat = newChat._id;
      } else {
        // Assign existing chat to the message
        message.chat = chat._id;
      }

      // Save the message in the database
      await Message.create(message);

      // Broadcast the new message to all connected clients
      io.emit("new_message", message);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
