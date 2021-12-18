const ContestRouter = require("./contest.router");
const auth = require("./authRoutes");
const Router = require("express").Router();

Router.use("", auth);
Router.use("/contest", ContestRouter);

module.exports = Router;
