const Submission = require("../models/submission.model");
const Execution = require("../models/execution.model");
const Run = require("../models/run.model");
const { UpdateScore } = require("../controllers/participant.controller");
const { subCallBackQueue, submissionProcess } = require("../utility/subCallBack.queue");
const { runCallBackQueue } = require("../utility/runCallBack.queue");

// Receive data from Judge0 and update it in Execution
// Then count passed testCases submissions and update score in Submission Model
// Note: Data received here is through PUT request on ./callback/sub by Judge0

async function subCallBackHandler(req, res) {
  subCallBackQueue.add(req.body);
  res.status(200).send("Success");
}

// Receive data from Judge0 and update it in Run
// Note: Data received here is through PUT request on ./callback/run by Judge0

async function runCallBackHandler(req, res) {
  runCallBackQueue.add(req.body);
  res.status(200).send("Success");
}

module.exports = { subCallBackHandler, runCallBackHandler };
