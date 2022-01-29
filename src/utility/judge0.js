const axios = require("axios");
const ExecutionModel = require("../models/execution.model");

// Call Judge0 for Submit
async function executeBatch(data) {
  try {

    //  Call Judge0 and get n tokens
    let postResult = await axios({
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: { base64_encoded: "true" },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "x-rapidapi-key": "71cebddde1msh53a7db127feddf7p121a46jsna2810de7d51a",
      },
      data: {
        submissions: data,
      },
    });

    // Array of tokens recieved by Judge0
    const tokens = postResult.data.map(({ token }) => token);

    console.log("Batch Processed");

    // Create n executions in DB with (n tokens)*times
    for (let i = 0; i < tokens.length; i++) {
      await ExecutionModel.create({
        submissionId: data[i].submissionId,
        token: tokens[i],
      });
    }

    // Next : The status recieved by Judge0 on callback will change the submission model
    
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
}

// Call Judge0 for Run
function excuteSingle() {}

module.exports = { executeBatch };
