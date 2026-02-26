const express = require("express");
const ConnectDB = require("./config/db");
const { CreateUser, findallUser, findOneUser } = require("./controller/userController");
const app = express();
const routes = require("./routes/userRoutes");
ConnectDB();
app.use(express.json());

app.get("/" ,(req, res) => {
    console.log("hello world");
});

// mount API routes under /api
// note: RBAC is implemented inside the route definitions (see userRoutes)
app.use("/api", routes);
app.listen(8080, (req, res) => console.log("port is alive at 8080"));