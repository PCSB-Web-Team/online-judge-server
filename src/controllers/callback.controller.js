const Submission = require("../models/submission.model");
const Execution = require("../models/execution.model");
const Run = require("../models/run.model");
const { UpdateScore } = require("../controllers/participant.controller");

// Receive data from Judge0 and update it in Execution
// Then count passed testCases submissions and update score in Submission Model
// Note: Data received here is through PUT request on ./callback/sub by Judge0

async function subCallBackHandler(req, res) {
  try {
    const callbackBody = req.body;
    
    // Decoding all the Base64 encoded fields
    callbackBody.stdout = Buffer.from(callbackBody.stdout || "", "base64").toString("ascii");
    callbackBody.message = Buffer.from(callbackBody.message || "", "base64").toString("ascii");
    callbackBody.stderr = Buffer.from(callbackBody.stderr || "", "base64").toString("ascii");
    callbackBody.compile_output = Buffer.from(callbackBody.compile_output || "", "base64").toString("ascii");

    // Update the Execution Model with body
    const executionBody = await Execution.findOneAndUpdate(
      { token: callbackBody.token },
      callbackBody,
      { upsert: true }
    );
    // If status of submission is Accepted ( 3 ) then update score
    if (callbackBody.status.id == 3) {

      const updatedSubmission = await Submission.updateOne(
        { _id: executionBody.submissionId },
        { $inc: { score: 10, passedCases: 1 } },
        { upsert: true }
      );

      const finalSubmission = await Submission.findOne({
        _id: executionBody.submissionId,
      });

      const participantScore = await UpdateScore(
        finalSubmission.contestId,
        finalSubmission.userId,
        finalSubmission.score,
        finalSubmission.questionId
      );

      return res.send(participantScore);
    }

    res.send("Callback called but submission was not a success... ");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
}

// Receive data from Judge0 and update it in Run
// Note: Data received here is through PUT request on ./callback/run by Judge0

async function runCallBackHandler(req, res) {
  try {
    const callbackBody = req.body;
    console.log("here")
    // Decoding all the Base64 encoded fields
    callbackBody.stdout = Buffer.from(callbackBody.stdout || "", "base64").toString("ascii");
    callbackBody.message = Buffer.from(callbackBody.message || "", "base64").toString("ascii");
    callbackBody.stderr = Buffer.from(callbackBody.stderr || "", "base64").toString("ascii");
    callbackBody.compile_output = Buffer.from(callbackBody.compile_output || "", "base64").toString("ascii");
    console.log("now")
    // Update the Run Model with body
    const runBody = await Run.findOneAndUpdate(
      { token: callbackBody.token },
      callbackBody,
      { upsert: true }
    );
      console.log("end")
    res.send("Done");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
}

module.exports = { subCallBackHandler, runCallBackHandler };
