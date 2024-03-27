const express = require("express");
const usersRoute = require("./Routes/userRoute");
const productsRoute = require("./Routes/productsRoute");
const messageRoute = require("./Routes/messagesRoutes");
const ordersRoute = require("./Routes/ordersRoutes");
const User = require("./Models/userModel");
const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require("./utils/cloudinaryy");

const app = express();

// Set a larger size limit for raw request bodies (e.g., 50MB)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

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

module.exports = app;
