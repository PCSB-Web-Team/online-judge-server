const mongoose = require("mongoose");

const executionSchema = new mongoose.Schema(
  {
    submissionId: {
        type: String,
    },
    token: {
        type: String,
    },
    execute: {
        type: Object,
    },
  },
  { _id: true, strict: false }
);

const ExecutionModel = mongoose.model("execution", executionSchema);

module.exports = ExecutionModel;