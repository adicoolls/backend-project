const express = require("express");
const router = express.Router();
const {  CreateUser,
    findallUser,
    findOneUser,
loginUser,} = require("../controller/userController");

const verifyToken = require("../middleware/auth");
const { createUser } = require("../../project 1/controllers/userControllers");

router.get("/users", verifyToken, findallUser);
router.post("/create", CreateUser);
router.post("/login", loginUser);

module.exports = router;