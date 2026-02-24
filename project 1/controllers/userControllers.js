const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// CREATE
exports.createUser = async (req, res) => {
  const {name, email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, 
    email,
    password : hashedPassword,
  });

  res.json(user);
};

// READ ALL
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// UPDATE
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

// DELETE
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
// login user 
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.status(400).json({message: "User not found"});

    }
    const ismatch = await bcrypt.compare(password, user.password);

    if(!ismatch) {
        return res.status(400).json({message : "invalid password"});

    }
    const token = jwt.sign(
        {id : user._id},
        "mysecretkey",
        {expiresIn: "1h"}
    );
    res.json({token});
}