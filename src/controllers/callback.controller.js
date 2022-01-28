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
    const tokenFind = await ExecutionModel.findOne({
      token: callbackBody.token,
    });

    if (tokenFind) {
      const UpdateExecution = ExecutionModel.findOneAndUpdate(
        { token: callbackBody.token },
        { execute: callbackBody },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log("Successfully Updated Execution");
          }
        }
      );

    
      const UpdateSubmission = await SubmissionModel.findOneAndUpdate(
        { _id: tokenFind.submissionId },
        { $inc: { outcome: 1 } },
        { upsert:true },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log("Successfully Incremented Solved");
          }
        }
      );
    
    } else {
    }

    res.send("Done");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
}

module.exports = { callBackHandler };
