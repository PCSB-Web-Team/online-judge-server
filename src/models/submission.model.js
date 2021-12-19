const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    questionId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    languageId: {
      type: Number,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Processing",
    },
  },
  { _id: true }
);
