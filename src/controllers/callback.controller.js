const SubmissionModel = require("../models/submission.model");

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

// Receive data from Judge0 and update it in database
// Note: Data received here is through PUT request on ./callback/ by Judge0

async function callBackHandler(req, res) {
  try {
    const newSubmission = await SubmissionModel.create(req.body);
    res.json(newSubmission);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
}

module.exports = { callBackHandler };
