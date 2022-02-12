const mongoose = require("mongoose");
const Question = require("./question.model");

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
    questionName: {
      type: String,
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
    timestamp: { type: Date, default: Date.now},
  },
  { _id: true, strict: false }
);

submissionSchema.set("toObject", { virtuals: true });
submissionSchema.set("toJSON", { virtuals: true });

submissionSchema.virtual("status").get(function () {

  if (this.passedCases == 0) {
    return "Processing / Rejected";
  } else if (this.passedCases > 0 && this.passedCases < this.maxCases) {
    return "Partially Accepted";
  } else {
    return "Accepted"
  }

});

const SubmissionModel = mongoose.model("submission", submissionSchema);

module.exports = SubmissionModel;

// Aryan- add virtual for question title
// aryan - submission find using token doubt