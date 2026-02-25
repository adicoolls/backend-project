const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// 🔹 Create User
const CreateUser = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = await User.create({
            Name,
            Email,
            Password: hashedPassword
        });

        res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


// 🔹 Find All Users
const findallUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// 🔹 Find One User
const findOneUser = async (req, res) => {
    try {
        const { Email } = req.query;

        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


//  Login User
const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id },
            "mysecretkey",
            { expiresIn: "1h" }
        );

        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    CreateUser,
    findallUser,
    findOneUser,
    loginUser
};