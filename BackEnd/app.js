const express = require("express");
const usersRoute = require("./Routes/userRoute");
const productsRoute = require("./Routes/productsRoute");
const ordersRoute = require("./Routes/ordersRoutes");
const User = require("./Models/userModel");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const messageRoutes = require("./Routes/messageRoute");
const Chat = require("./Models/chatModel");
const cors = require("cors");
const cloudinary = require("./utils/cloudinaryy"); // Assuming cloudinary is used for image uploads/storage
const app = express();
const server = require("http").Server(app);

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

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
