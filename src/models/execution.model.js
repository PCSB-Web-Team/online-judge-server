const mongoose = require("mongoose");

const executionSchema = new mongoose.Schema(
  {
    submissionId: {
        type: mongoose.Schema.Types.ObjectId,
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

const ExecutionModel = mongoose.model("execution", executionSchema);

module.exports = ExecutionModel;