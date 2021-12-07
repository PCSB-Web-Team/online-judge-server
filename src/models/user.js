var conn = require("../db/mongoose");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;