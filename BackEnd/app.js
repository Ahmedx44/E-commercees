const express = require("express");
const usersRoute = require("./Routes/userRoute");
const productsRoute = require("./Routes/productsRoute");
const messageRoute = require("./Routes/messagesRoutes");
const ordersRoute = require("./Routes/ordersRoutes");
const messageModel = require("./Models/messageModel");
const User = require("./Models/userModel");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
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

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("message", async (data) => {
    const { recipientId, text, senderId } = data;
    try {
      // Create a new message document
      const newMessage = await messageModel.create({
        sender: senderId,
        recipient: recipientId,
        text: text,
      });

      // Broadcast the new message to all connected clients
      io.emit("message", newMessage); // Real-time update for all clients
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
