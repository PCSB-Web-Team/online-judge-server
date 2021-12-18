const mongoose = require("mongoose");

const UserDB = "mongodb://localhost:27017/UserDB";

mongoose.connect(UserDB, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports=mongoose;