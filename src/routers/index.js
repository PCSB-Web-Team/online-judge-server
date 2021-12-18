const ContestRouter = require("./contest.router");
const auth = require("./authRoutes");
const QuestionRouter = require("./question.router");
const Router = require("express").Router();

Router.get("", (req, res) => {
  res.send("Welcome to Online Judge");
});
Router.use("", auth);
Router.use("/contest", ContestRouter);
Router.use('/question', QuestionRouter);

module.exports = Router;
