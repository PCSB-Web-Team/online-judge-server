const { newQuestion, getAllQuestions, contestQuestions, specificQuestion, deleteQuestion } = require("../controllers/question.controller");

const QuestionRouter = require("express").Router();

QuestionRouter.get("/contest/:contestid", contestQuestions);
QuestionRouter.get("/all", getAllQuestions);
QuestionRouter.get("/:questionid", specificQuestion);
QuestionRouter.delete("/:questionid", deleteQuestion);
QuestionRouter.post("/", newQuestion);

module.exports = QuestionRouter;
