const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    difficultyLevel: {
      type: String,
      required: true,
    },
    problemStatement: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    inputFormat: {
      type: String,
      required: true,
    },
    constraints: [{
      type: String,
      required: true,
    }],
    outputFormat: {
      type: String,
      required: true,
    },
    explanations: [
      {
        testcase: {type: mongoose.Schema.Types.Mixed},
        _id: false,
      },
    ],
    samples: [
      {
        sampleInput: [{
          type: String,
        }],
        sampleOutput: [{
          type: String,
        }],
        _id: false,
      },
    ],
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
    score: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { _id: true }
);

const QuestionModel = mongoose.model("question", questionSchema);

module.exports = QuestionModel;
