const ContestRouter = require("./contest.router");
const auth = require("./authRoutes");
const QuestionRouter = require("./question.router");
const CallBackRouter = require("./callback.router");
const SubmissionRouter = require("./submission.router");
const Router = require("express").Router();

Router.get("", (req, res) => {
  res.send("Welcome to Online Judge");
});
Router.use("/auth", auth);
Router.use("/contest", ContestRouter);
Router.use('/question', QuestionRouter);
Router.use('/callback', CallBackRouter)
Router.use('/submission', SubmissionRouter)

module.exports = Router;
