const { newQuestion, getAllQuestions, contestQuestions } = require("../controllers/question.controller");

const QuestionRouter = require("express").Router();

QuestionRouter.post("/", newQuestion);
QuestionRouter.get("/all", getAllQuestions);
QuestionRouter.get("/:contestid", contestQuestions);

module.exports = QuestionRouter;
