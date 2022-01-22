const Question = require("../models/question.model");

// Create a new question

async function newQuestion(req, res) {
  const { title, description, time, memory, example, contestId, score } = req.body;

  try {
    const newQuestion = await Question.create({
      title,
      description,
      time,
      memory,
      example,
      contestId,
      score
    });
    res.send(newQuestion);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Get all questions from every contest

async function getAllQuestions(req, res) {
  try {
    const allQuestions = await Question.find({});

    if (allQuestions.length === 0) {
      res.status(404).send("No questions available to solve");
    } else {
      res.send(allQuestions);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
}

// Get all questions of a contest if exists using ./question/contest/:contestid

async function contestQuestions(req, res) {
  try {
    const contestQuestions = await Question.find({
      contestId: req.params.contestid,
    });
    if (contestQuestions.length === 0) {
      res.status(404).send("No questions exist with this contestid");
    } else {
      res.send(contestQuestions);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
}


// Get all questions of a contest if exists using ./question/:questionid

async function specificQuestion(req, res) {
  try {
    const getQuestion = await Question.findOne({
      _id: req.params.questionid,
    });
    if (!getQuestion) {
      res.status(404).send("No questions exist with this questionid");
    } else {
      res.send(getQuestion);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
}

module.exports = { newQuestion, getAllQuestions, contestQuestions, specificQuestion };
