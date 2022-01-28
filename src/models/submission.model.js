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
    score: {
      type: Number,
      default: 0,
    },
    outcome: {
      type: Number,
      default: 0,
    },
  },
  { _id: true, strict: false }
);

const SubmissionModel = mongoose.model("submission", submissionSchema);

module.exports = SubmissionModel;

// const submissionSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.SchemaTypes.ObjectId,
//     },
//     contestId: {
//       type: mongoose.SchemaTypes.ObjectId,
//     },
//     questionId: {
//       type: mongoose.SchemaTypes.ObjectId,
//     },
//     languageId: {
//       type: Number,
//     },
//     code: {
//       type: String,
//     },
//     score: {
//       type: Number,
//       default: 0,
//     },
//     token: {
//       type: String,
//     },
//     stdout: {
//       type: String,
//       default: null,
//     },
//     time: {
//       type: mongoose.Types.Decimal128,
//       default: 0,
//     },
//     memory: {
//       type: Number,
//       default: 0,
//     },
//     stderr: {
//       type: String,
//       default: null,
//     },
//     compile_output: {
//       type: String,
//       default: null,
//     },
//     message: {
//       type: String,
//       default: null,
//     },
//     status: {
//       id: { type: String, default: 0 },
//       description: { type: String, default: "Processing" },
//     },
//   },
//   { _id: true, strict: false }
// );

// {
//     stdout: 'bnVtYmVyIGlzIDEK\n',
//     time: '0.018',
//     memory: 3116,
//     stderr: null,
//     token: '9bde5a13-a3b4-42b0-8e56-9fb8127487f0',
//     compile_output: null,
//     message: null,
//     status: { id: 3, description: 'Accepted' }
//   }

// {
//     stdout: null,
//     time: '0.016',
//     memory: 3148,
//     stderr: 'VHJhY2ViYWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOgogIEZpbGUgInNj\n' +
//       'cmlwdC5weSIsIGxpbmUgMSwgaW4gPG1vZHVsZT4KICAgIHByaW50KCJudW1i\n' +
//       'ZXIgaXMgIitzdHIoYSkpCk5hbWVFcnJvcjogbmFtZSAnYScgaXMgbm90IGRl\n' +
//       'ZmluZWQK\n',
//     token: 'bfe39261-c314-4179-bf00-e0bce07bfb1e',
//     compile_output: null,
//     message: 'RXhpdGVkIHdpdGggZXJyb3Igc3RhdHVzIDE=\n',
//     status: { id: 11, description: 'Runtime Error (NZEC)' }
//   }