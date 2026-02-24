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
    }

});
module.exports = mongoose.model("user", UserSchema);