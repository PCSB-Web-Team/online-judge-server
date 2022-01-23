const Submission = require("../models/submission.model");
const Question = require("../models/question.model");
const axios = require("axios");

// This is where Judge0 will send back the status of code execution
const callBackURL = "https://online-judge-csi.herokuapp.com/api/callback";

// Create Submission by sending Judge0 with source_code, language_id and callback_url
// Token received back from Judge0 is stored along with code and other important ids
// NOTE: Judge0 sends code execution status on callback_url having PUT request in router

async function submission(req, res) {
  const { languageId, code, userId, questionId } = req.body;

  try {
    const encodedCode = btoa(code);

    const question = await Question.findById(questionId);
    const testCase = question.example;
    const testInput = btoa(testCase[0].input);
    const testOutput = btoa(testCase[0].output);

    let result = await axios({
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
        callback_url: callBackURL,
        stdin: testInput,
        expected_output: testOutput,
      },
    });

    token = result.data.token;

    const newSubmission = await Submission.findOneAndUpdate(
      { token },
      {
        userId,
        questionId,
        languageId,
        code: encodedCode,
        stdin: testInput,
        expected_output: testOutput,
        token,
      },
      { new: true }
    );

    if (newSubmission) {
      res.send(newSubmission);
    } else {
      res.status(409).send("New Submission cannot be created");
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
    const submissions = await Submission.find({ userId });
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
  submission,
  getSubmission,
  getAllSubmissions,
  getUserSubmissions,
  getUserSubmissionForQuestion,
};
