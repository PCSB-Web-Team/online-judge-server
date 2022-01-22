const mongoose = require("mongoose");

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
  phoneNumber: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  registeredContest: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      default: null,
      unique: true,
    }
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
