const mongoose = require("mongoose");
const callBackModel = require("../models/callback.model");
const SubmissionModel = require("../models/submission.model");

// TODO -Aryan - modify this callback controller, where Judge0 will hit with a submission body (checkout the body structure in commented code below ),
//  using the token present in body find and update the submission document, also add other fields that are provided by Judge0

// const body = {
//   stdout: "aGVsbG8sIEp1ZGdlMAo=\n",
//   time: "0.002",
//   memory: { $numberInt: "748" },
//   stderr: null,
//   token: "119271d3-d9e2-4380-8625-bcc26d1dcbdb",
//   compile_output: null,
//   message: null,
//   status: { id: { $numberInt: "3" }, description: "Accepted" },
// };

async function callBackHandler(req, res) {}

module.exports = { callBackHandler };
