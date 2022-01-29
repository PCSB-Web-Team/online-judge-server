const axios = require("axios");
const ExecutionModel = require("../models/execution.model");

async function executeBatch(data) {
    console.log("Calling Judge0 with 10 Submissions");
    
    //  call Judge0 and get n tokens
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

    const tokens = postResult.data.map(({ token }) => token);

    console.log("Batch Processed")

    for (let i = 0; i < tokens.length; i++){
      await ExecutionModel.create( { submissionId: data[i].submissionId, token: tokens[i] } )
    } 

  }

  function excuteSingle() {
    //   for run
  }

  module.exports = {executeBatch};
