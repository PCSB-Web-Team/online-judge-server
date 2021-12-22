const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
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
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
    },
  },
  { _id: true }
);


const SubmissionModel = mongoose.model("submission", submissionSchema);

module.exports = SubmissionModel;
