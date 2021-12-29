const mongoose = require("mongoose");
const callBackModel = require("../models/callback.model");
const SubmissionModel = require("../models/submission.model");
const axios = require("axios");

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

async function callBackHandler(req, res) {
  const receivedData = req.body;
  token = receivedData.token;
  try {
    const newState = await SubmissionModel.updateOne(
      { token: token },
      {
        $set: {
          stdout: receivedData.stdout,
          time: receivedData.time,
          memory: receivedData.memory,
          stderr: receivedData.stderr,
          compile_output: receivedData.compile_output,
          message: receivedData.message,
          status: receivedData.status,
        },
      }
    );
    if (newState.matchedCount == 1) {
      const updatedState = await SubmissionModel.findOne({ token: token });
      res.send(updatedState);
    } else {
      res.status(404).send("Request not accepted");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { callBackHandler };
