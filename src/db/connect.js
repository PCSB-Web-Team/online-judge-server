const mongoose = require("mongoose");

const mongoUri = "mongodb+srv://vedant:vedant123@main.qdfxr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true}).then(res => {
    console.log("MongoDB Connected");
});

module.exports=mongoose;