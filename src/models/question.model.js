const mongoose = require("mongoose");

// TODO - Aryan
// add the following elements to schema
// time, memory, example: [ {input, output }, {input, output} ]

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    contestId: mongoose.Schema.Types.ObjectId,
  },
  { _id: true }
);

const QuestionModel = mongoose.model("question", questionSchema);

module.exports = QuestionModel;
