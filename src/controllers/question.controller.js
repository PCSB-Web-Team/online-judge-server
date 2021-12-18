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

// Aryan - create a get route that will return all the questions

// Aryan - create a get route that will return all the questions of a particular contest 
// (accept the contest _id via params)

module.exports  = {newQuestion}
