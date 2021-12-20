const Question = require("../models/question.model");

// create question
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


async function getAllQuestions(req, res) {
  try {
    const allQuestions = await Question.find({});
    res.send(allQuestions);
  } catch (err) {
    res.status(404).send(err.message);
  }
}


async function contestQuestions(req, res) {
  try {
    const contestQuestions = await Question.find({contestId:req.query.contestid});
    res.send(contestQuestions);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

module.exports  = {newQuestion, getAllQuestions, contestQuestions}
