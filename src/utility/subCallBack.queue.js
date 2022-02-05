const Bull = require("bull");
const Submission = require("../models/submission.model");
const Execution = require("../models/execution.model");
const { UpdateScore } = require("../controllers/participant.controller");

const subCallBackQueue = new Bull("subCallback", {
  redis: {
    host: process.env.redisHost || "127.0.0.1",
    port: 6379,
  },
});

// Redis Consumer : Executing after Producer adds data to queue
const submissionProcess = async (callbackBody) => {
  try {
    console.log("Call back hit", callbackBody.status);

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

    // If status of submission is Accepted ( 3 ) then update score
    if (callbackBody.status.id == 3) {
      // Update the Execution Model with body
      const executionBody = await Execution.findOneAndUpdate(
        { token: callbackBody.token },
        callbackBody,
        { new: true }
      ).lean();

      console.log("Updated the status", executionBody.status);

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
    }
  } catch (err) {
    console.log(err.message);
  }
};

subCallBackQueue.process(submissionProcess);

module.exports = { subCallBackQueue };
