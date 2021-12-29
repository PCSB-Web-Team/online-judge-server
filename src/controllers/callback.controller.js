const mongoose = require("mongoose");
const callBackModel = require("../models/callback.model");
const SubmissionModel = require("../models/submission.model");
const axios = require("axios");

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
          callBackHit: true,

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

// this is just a testing api that is used to check the response Judge0 sends on callback uri
async function callBackTester(req, res) {
  const { token } = req.body;

  // update or insert if not present
  await callBackModel.updateOne({ token }, req.body, { upsert: true });
}

module.exports = { callBackHandler };
