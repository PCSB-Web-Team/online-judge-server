const mongoose = require("mongoose");
//Aryan - Add phone and name
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  toke: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
