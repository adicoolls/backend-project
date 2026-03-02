const express = require("express");
const router = express.Router();
const {  CreateUser,
    findallUser,
    findOneUser,
loginUser,} = require("../controller/userController");

// RBAC middleware imported from auth.js
const { verifyToken, authorizeRoles } = require("../middleware/auth");
// NOTE: there is a stray import from project 1 earlier; removed since not used

// all users can create an account via /create (role defaults to 'user')
router.post("/create", CreateUser);

// login returns a token containing the role
router.post("/login", loginUser);

// only admins may list all users
router.get("/users", verifyToken, authorizeRoles('admin'), findallUser);

module.exports = router;