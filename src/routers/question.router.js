const { newQuestion } = require("../controllers/question.controller");

const QuestionRouter = require("express").Router();

QuestionRouter.post("/", newQuestion);

module.exports = QuestionRouter;
