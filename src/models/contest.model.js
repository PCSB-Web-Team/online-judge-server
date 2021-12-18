const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  startsOn: {
    type: Date,
    required: true,
  },
  endsOn: {
    type: String,
    required: true,
  },
});

const contest = mongoose.model("Contest", contestSchema);

module.exports = contest;
