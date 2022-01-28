const mongoose = require("mongoose");

const executionSchema = new mongoose.Schema(
  {
    submissionId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    token: {
        type: String,
    },
    execute: mongoose.Schema.Types.Mixed,
  },
  { _id: true, strict: false }
);

const ExecutionModel = mongoose.model("execution", executionSchema);

module.exports = ExecutionModel;