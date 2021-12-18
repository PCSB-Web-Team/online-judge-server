const ContestRouter = require("./contest.router");
const auth = require("./authRoutes");
const Router = require("express").Router();

Router.get("", (req, res) => {
  res.send("Welcome to Online Judge");
});
Router.use("", auth);
Router.use("/contest", ContestRouter);

module.exports = Router;
