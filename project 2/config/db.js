const mongoose = require("mongoose");

const ConnectDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/jwtDemo2");
        console.log("mongodb connected");

    }
    catch(error){
        console.log(error);
        process.exit(1);

    }
};
module.exports = ConnectDB;