const express = require("express");
const user = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const CreateUser = async (req, res) => {
    console.log("CreateUser works ");
    const { Name, Email, Password } = req.body;
    const User = await user.create({
        Name, 
        Email,
        Password,
    });
    res.json(User);
};

const findallUser = async (req, res) => {
    console.log("found the all users ");
    const User = await user.find();
    res.json(User);

}
const findOneUser = async (req, res) => {
    const {Email} = req.query;
    const User = await user.findOne({Email});
    if(!user) {
        return res.status(404).res.send("the user is not found");
    }
    res.json(User);
}

module.exports = {
    CreateUser,
    findallUser,
    findOneUser,
}