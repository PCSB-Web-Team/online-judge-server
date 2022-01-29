const SubmissionModel = require("../models/submission.model");
const ExecutionModel = require("../models/execution.model");

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
    const callbackBody = req.body;

    const executionBody = await ExecutionModel.findOneAndUpdate(
      { token: callbackBody.token },
      callbackBody,
      { upsert: true }
    );

    if(callbackBody.status.id==3){

      const submissionBody = await SubmissionModel.findOne(
        { _id: executionBody.submissionId }
      );

        submissionBody.score = submissionBody.score + 10

      // const updatedSubmission = await SubmissionModel.updateOne(
      //   { _id: executionBody.submissionId },
      //   { score: 10 },
      //   { upsert: true }
      // );
      submissionBody.save();
    }
    

    console.log("Done")
    res.send("Done");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
}

module.exports = { callBackHandler };
