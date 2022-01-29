const SubmissionModel = require("../models/submission.model");
const ExecutionModel = require("../models/execution.model");

// Receive data from Judge0 and update it in Execution 
// Then count passed testCases submissions and update score in Submission Model
// Note: Data received here is through PUT request on ./callback/ by Judge0

async function callBackHandler(req, res) {
  try {
    const callbackBody = req.body;

    // Update the Execution Model with body
    const executionBody = await ExecutionModel.findOneAndUpdate(
      { token: callbackBody.token },
      callbackBody,
      { upsert: true }
    );

    // If status of submission is Accepted ( 3 ) then update score
    if(callbackBody.status.id==3){

      const submissionBody = await SubmissionModel.findOne(
        { _id: executionBody.submissionId }
      );

      const updatedSubmission = await SubmissionModel.updateOne(
        { _id: executionBody.submissionId },
        {$inc: { score: 10}},
        { upsert: true }
      );
      
    }
    
    res.send("Done");
    
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
}

module.exports = { callBackHandler };
