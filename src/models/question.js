const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contest: mongoose.Schema.Types.ObjectId,
  },
  { _id: true }
);

const Question = mongoose.model("question", questionSchema);

module.exports = Question;
