const { newContest, getAllContest } = require("../controllers/contest.controller");
const ContestRouter = require("express").Router();

ContestRouter.post("/", newContest);
ContestRouter.get("/", getAllContest);

module.exports = ContestRouter;
