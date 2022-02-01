const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    contestId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    questionId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    maxScore: {
      type: Number,
    },
    score: {
      type: Number,
      default: 0,
    },
    maxCases: {
      type: Number,
    },
    passedCases: {
      type: Number,
      default: 0,
    },
  },
  { _id: true, strict: false }
);

const SubmissionModel = mongoose.model("submission", submissionSchema);

module.exports = SubmissionModel;

// Aryan- add virtual for question title