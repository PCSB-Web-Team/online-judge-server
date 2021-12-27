const Question = require("../models/question.model");

// Create a new question

async function newQuestion(req, res) {
  const { title, description, contestId } = req.body;

  try {
    const newQuestion = await Question.create({
      title,
      description,
      contestId,
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
    res.send(allQuestions);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

// Get all questions of a contest if exists using ./question/:contestid

async function contestQuestions(req, res) {
  try {
    const contestQuestions = await Question.find({
      contestId: req.params.contestid,
    });
    res.send(contestQuestions);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

module.exports = { newQuestion, getAllQuestions, contestQuestions };
