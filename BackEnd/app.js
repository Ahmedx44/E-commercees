const express = require("express");
const usersRoute = require("./Routes/userRoute");
const productsRoute = require("./Routes/productsRoute");
const messageRoute = require("./Routes/messagesRoutes");
const ordersRoute = require("./Routes/ordersRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use("cors");

// Routes
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);
// app.use("/api/messages", messageRoute);

module.exports = app;
