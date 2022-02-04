const Submission = require("../models/submission.model");
const Question = require("../models/question.model");
const { updateSolved } = require("../controllers/user.controller");
const axios = require("axios");

// Run code by sending Judge0 with source_code, language_id and sample_input (stdin)
// Token received back from Judge0 is then used to get the output (stdout)

async function run(req, res) {
  const { languageId, code, stdin } = req.body;

  try {
    if( languageId && code ){

      const encodedStdin = Buffer.from(stdin).toString("base64");
      const encodedCode = Buffer.from(code).toString("base64");
      
      let postResult = await axios({
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions",
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "content-type": "application/json",
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": "71cebddde1msh53a7db127feddf7p121a46jsna2810de7d51a",
        },
        data: {
          language_id: languageId,
          source_code: encodedCode,
          stdin: encodedStdin,
        },
      });
      
      if (!postResult) return res.status(409).send("Run code unable to process. Try again");
     
      const token = postResult.data.token;

      let getResult = await axios({
        method: "GET",
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": "71cebddde1msh53a7db127feddf7p121a46jsna2810de7d51a",
        },
      });
      
      if (!getResult) return res.status(409).send("Run code unable to process. Try again");

      if(!getResult.data.stdout) return res.send(null);
      
      const stdout = Buffer.from(getResult.data.stdout || "", "base64").toString(
        "ascii"
      );
      console.log(stdout)
      const message = Buffer.from(getResult.data.message || "", "base64").toString(
        "ascii"
      );
      console.log(message)
      const stderr = Buffer.from(getResult.data.stderr || "", "base64").toString(
        "ascii"
      );
      console.log(stderr)
      res.send({stdout: stdout, message: message, stderr: stderr, status: getResult.data.status, time: getResult.data.time, memory: getResult.data.memory});
    } else {
      res.status(400).send("Invalid data received, code or language missing");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Get submission if exists using ./submission/:token

async function getSubmission(req, res) {
  try {
    const submission = await Submission.findOne({ token: req.params.token });

    if (submission) {
      res.send(submission);
    } else {
      res.status(404).send("No submissions exists with such token");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// get all submissions

async function getAllSubmissions(req, res) {
  try {
    const list = await Submission.find({});
    res.send(list);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

// get user submissions

async function getUserSubmissions(req, res) {
  try {
    const { userId } = req.params;
    const submissions = await Submission.find({ userId: userId });
    res.send(submissions);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

// get user submissions for a question

async function getUserSubmissionForQuestion(req, res) {
  try {
    const { userId, questionId } = req.params;
    const submissions = await Submission.find({ userId, questionId });
    res.send(submissions);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

module.exports = {
  run,
  getSubmission,
  getAllSubmissions,
  getUserSubmissions,
  getUserSubmissionForQuestion,
};

