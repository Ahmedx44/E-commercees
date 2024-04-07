const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this according to your CORS policy
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("message", (data) => {
    // Broadcast the received message to the recipient
    const { recipientId, text } = data;
    socket.to(recipientId).emit("message", { text });
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
