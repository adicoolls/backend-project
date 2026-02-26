const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// 🔹 Create User
const CreateUser = async (req, res) => {
    try {
        const { Name, Email, Password, role: requestedRole } = req.body;

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(Password, 10);

        // By default every new signup is a normal 'user'.
        // An admin who is already logged in could pass a role field in the body
        // (e.g. when creating another admin user). We only honor the requested
        // role when the token belongs to an admin.
        let role = 'user';
        if (requestedRole === 'admin' && req.user && req.user.role === 'admin') {
            role = 'admin';
        }

        const newUser = await User.create({
            Name,
            Email,
            Password: hashedPassword,
            role
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

        // include role in the token so middleware can make decisions later
        const token = jwt.sign(
            { id: user._id, role: user.role },
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