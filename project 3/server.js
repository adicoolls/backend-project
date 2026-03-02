// RBAC project
const express = require("express");
const mongoose = require("mongoose");
const PORT = 8000;
const app = express();
app.get("/", (req, res) => {
    console.log("hello world");
})
app.listen(PORT, () => console.log(`the server is connected on port ${PORT}`));