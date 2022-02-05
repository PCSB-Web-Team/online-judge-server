const Submission = require("../models/submission.model");
const Execution = require("../models/execution.model");
const Run = require("../models/run.model");
const { UpdateScore } = require("../controllers/participant.controller");
const { subCallBackQueue } = require("../utility/subCallBack.quque");

// Receive data from Judge0 and update it in Execution
// Then count passed testCases submissions and update score in Submission Model
// Note: Data received here is through PUT request on ./callback/sub by Judge0

async function subCallBackHandler(req, res) {
  subCallBackQueue.add(req.body);
}

// Receive data from Judge0 and update it in Run
// Note: Data received here is through PUT request on ./callback/run by Judge0

async function runCallBackHandler(req, res) {
  try {
    const callbackBody = req.body;

    // Decoding all the Base64 encoded fields
    callbackBody.stdout = Buffer.from(
      callbackBody.stdout || "",
      "base64"
    ).toString("ascii");
    callbackBody.message = Buffer.from(
      callbackBody.message || "",
      "base64"
    ).toString("ascii");
    callbackBody.stderr = Buffer.from(
      callbackBody.stderr || "",
      "base64"
    ).toString("ascii");
    callbackBody.compile_output = Buffer.from(
      callbackBody.compile_output || "",
      "base64"
    ).toString("ascii");

    // Update the Run Model with body
    const runBody = await Run.findOneAndUpdate(
      { token: callbackBody.token },
      callbackBody,
      { upsert: true }
    );

    res.send("Done");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
}

module.exports = { subCallBackHandler, runCallBackHandler };
