const express = require("express");
const connectDB = require("./config/db");
const Routes1 = require("./routes/userRoutes");

const app = express();

app.use(express.json());
connectDB();

app.use("/api/users", Routes1);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
