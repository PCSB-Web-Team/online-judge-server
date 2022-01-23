const { newQuestion, getAllQuestions, contestQuestions, specificQuestion } = require("../controllers/question.controller");

const QuestionRouter = require("express").Router();

QuestionRouter.get("/contest/:contestid", contestQuestions);
QuestionRouter.get("/:questionid", specificQuestion);
QuestionRouter.get("/all", getAllQuestions);
QuestionRouter.post("/", newQuestion);

module.exports = QuestionRouter;
