const express = require("express");
const usersRoute = require("./Routes/userRoute");
const productsRoute = require("./Routes/productsRoute");
const messageRoute = require("./Routes/messagesRoutes");
const ordersRoute = require("./Routes/ordersRoutes");
const messageModel = require("./Models/messageModel");
const User = require("./Models/userModel");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Message = require("./Models/messageModel");
const cors = require("cors");
const cloudinary = require("./utils/cloudinaryy"); // Assuming cloudinary is used for image uploads/storage

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*", // Adjust this according to your CORS policy
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
app.use("/api/message", messageRoute);
app.use("/api/orders", ordersRoute);

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", async (messageData) => {
    try {
      const message = new Message({
        sender: messageData.senderId,
        recipient: messageData.recipientId,
        userName: messageData.userName,
        text: messageData.text,
      });

      await message.save();
      io.emit("message", message);
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", "An error occurred while saving the message.");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
