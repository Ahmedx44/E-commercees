const express = require("express");
const usersRoute = require("./Routes/userRoute");
const productsRoute = require("./Routes/productsRoute");
const messageRoute = require("./Routes/messagesRoutes");
const ordersRoute = require("./Routes/ordersRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", usersRoute);
// app.use("/api/products", productsRoute);
// app.use("/api/orders", ordersRoute);
// app.use("/api/messages", messageRoute);

module.exports = app;
