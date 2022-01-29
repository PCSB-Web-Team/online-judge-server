const { newContest, getAllContest, getContestById } = require("../controllers/contest.controller");
const ContestRouter = require("express").Router();

ContestRouter.post("/", newContest);
ContestRouter.get("/", getAllContest);
ContestRouter.get("/:contestId", getContestById);

module.exports = ContestRouter;
