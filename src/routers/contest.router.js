const { NewContest } = require("../controllers/contest");
const ContestRouter = require("express").Router();

ContestRouter.post("/", NewContest);

module.exports = ContestRouter;
