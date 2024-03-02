const express = require("express");
const usersRoute = require("./Routes/userRoute");
const productsRoute = require("./Routes/productsRoute");
const messsagesRoute = require("./Routes/messagesRoute");
const ordersRoute = require("./Routes/ordersRoute");
const app = express();

//Routes
app.use("/api/users", usersRoute);
app.use("/api/producst", productsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/messages", messsagesRoute);

module.exports = app;
