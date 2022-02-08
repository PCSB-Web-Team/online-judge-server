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
const submissionProcess = async (job) => {
  const callbackBody = job.data;
  try {
    console.log("Call back hit", callbackBody.status);

    const foundExecution = await Execution.findOne({
      token: callbackBody.token,
    }).lean();

    // If status of submission is Accepted ( 3 ) then update score
    if (callbackBody.status.id != foundExecution.status.id ) {
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

      // Update the Execution Model with body
      const executionBody = await Execution.findOneAndUpdate(
        { token: callbackBody.token },
        callbackBody,
        { new: true }
      ).lean();

      const updatedSubmission = await Submission.findOneAndUpdate(
        { _id: executionBody.submissionId },
        { $inc: { score: 10, passedCases: 1 } },
        { upsert: true , new: true}
      );
        console.log(updatedSubmission)
      const participantScore = await UpdateScore(
        updatedSubmission.contestId,
        updatedSubmission.userId,
        updatedSubmission.score,
        updatedSubmission.questionId
      );
    }
    res.send("Done")
  } catch (err) {
    console.log(err.message);
  }
};

subCallBackQueue.process(submissionProcess);

module.exports = { subCallBackQueue };
