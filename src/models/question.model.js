const mongoose = require("mongoose");

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
    time: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    memory: {
      type: Number,
      required: true,
    },
    example: [
      {
        input: {
          type: String,
        },
        output: {
          type: String,
        },
        _id: false,
      },
    ],
    contestId: mongoose.Schema.Types.ObjectId,
  },
  { _id: true }
);

const QuestionModel = mongoose.model("question", questionSchema);

module.exports = QuestionModel;
