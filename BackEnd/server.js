const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.Database;

mongoose
  .connect(DB)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port:", port);
});
