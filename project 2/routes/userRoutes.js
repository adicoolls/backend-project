const express = require("express");
const router = express.Router();
const {  CreateUser,
    findallUser,
    findOneUser,} = require("../controller/userController");

const verifyToken = require("../middleware/auth");
const { createUser } = require("../../project 1/controllers/userControllers");

router.get("/users", verifyToken, findallUser);
router.post("/create", verifyToken, CreateUser);

module.exports = router;