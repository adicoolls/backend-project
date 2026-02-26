const express = require("express");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema ({
    Name : {
        type : String,
        require : true,
    },
    Email : {
        type : String,
        require : true,
        unique : true
    },
    Password : {
        type : String ,
        require : true,
    },
    // role field added for simple RBAC – can be 'user' or 'admin'.
    // default is 'user' so normal signups cannot elevate themselves.
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

});
module.exports = mongoose.model("user", UserSchema);