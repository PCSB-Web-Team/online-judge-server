const Submission = require("../models/submission.model");
const mongoose = require("mongoose");
const axios = require("axios");

const callBackURL = "https://pcsb-online-judge.herokuapp.com/api/callback";

async function submission(req, res) {
  const { languageId, code, userId, questionId } = req.body;
  try {
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
        source_code: code,
        callback_url: callBackURL,
      },
    });
    token = result.data.token;

    const newSubmission = await Submission.create({
      userId,
      questionId,
      languageId,
      code,
      token,
    });
    res.send(newSubmission);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// TODO - Aryan - Create a get route for submission that will return the submission data based on the token sent from frontend
// the api route should be GET - /submission/:token

async function getSubmission(req, res) {
  try {
    const submission = await Submission.findOne({ token: req.params.token });
    res.send(submission);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { submission, getSubmission };
