const { newQuestion, getAllQuestions, contestQuestions } = require("../controllers/question.controller");

const QuestionRouter = require("express").Router();

QuestionRouter.post("/", newQuestion);
QuestionRouter.get("/", getAllQuestions);
QuestionRouter.get("/contestQuestion", contestQuestions);

module.exports = QuestionRouter;