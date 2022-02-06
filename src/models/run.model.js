const mongoose = require("mongoose");

const runSchema = new mongoose.Schema(
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
      id: { type: String, default: 0 , required: true},
      description: { type: String, default: "Processing", required: true},
    },
  },
  { _id: true, strict: false }
);

const RunModel = mongoose.model("run", runSchema);

module.exports = RunModel;