const axios = require("axios");
const Execution = require("../models/execution.model");
const Run = require("../models/run.model");

// Call Judge0 for Submit
async function submissionBatch(data) {
  try {
    //  Call Judge0 and get n tokens

    let postResult = await axios({
      method: "POST",
      url: `${process.env.judge0}/submissions/batch`,
      params: { base64_encoded: "true" },
      headers: {
        "content-type": "application/json",
      },
      data: {
        submissions: data,
      },
    });
    // Array of tokens recieved by Judge0
    const tokens = postResult.data.map(({ token }) => token);

    console.log(`Submission Batch Processed, BatchSize - ${data.length}`);

    // Create n executions in DB with (n tokens)*times
    for (let i = 0; i < tokens.length; i++) {
      await Execution.create({
        submissionId: data[i].submissionId,
        token: tokens[i],
      });
    }

    // Next : The status recieved by Judge0 on callback will change the submission model
  } catch (err) {
    console.log(err.message);
  }
}

// Call Judge0 for Run
async function runBatch(data) {
  try {
    //  Call Judge0 and get n tokens
    let postResult = await axios({
      method: "POST",
      url: `${process.env.judge0}/submissions/batch`,
      params: { base64_encoded: "true" },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": "71cebddde1msh53a7db127feddf7p121a46jsna2810de7d51a",
      },
      data: {
        submissions: data,
      },
    });

    // Array of tokens recieved by Judge0
    const tokens = postResult.data.map(({ token }) => token);

    console.log("Run Batch Processed");

    // Create n runs in DB with (n tokens)*times
    for (let i = 0; i < tokens.length; i++) {
      await Run.findOneAndUpdate(
        { _id: data[i].runId },
        { token: tokens[i] },
        { upsert: true }
      );
    }

    // Next : The status recieved by Judge0 on callback will change the run model
  } catch (err) {
    console.log(err.message);
  }
}

async function pingJudge0() {
  if (process.env.judge0)
    await axios
      .get(`${process.env.judge0}/about`)
      .then((res) => {
        console.log("Judge0 connected, Got respons: " + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("Unable to connect to Judge0, Error: " + err);
      });
  else console.log("Unable to find judge0 Link");
}

module.exports = { submissionBatch, runBatch, pingJudge0 };
