const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    questionId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    languageId: {
      type: Number,
    },
    code: {
      type: String,
    },
    score: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
    },
    stdout: {
      type: String,
      default: null,
    },
    time: {
      type: mongoose.Types.Decimal128,
      default: 0,
    },
    memory: {
      type: Number,
      default: 0,
    },
    stderr: {
      type: String,
      default: null,
    },
    compile_output: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    status: {
      id: { type: String, default: 0 },
      description: { type: String, default: "Processing" },
    },
    callBackHit: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true, strict: false }
);

const SubmissionModel = mongoose.model("submission", submissionSchema);

module.exports = SubmissionModel;
