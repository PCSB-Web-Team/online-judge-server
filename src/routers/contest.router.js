const { NewContest, GetAllContest } = require("../controllers/contest");
const ContestRouter = require("express").Router();

ContestRouter.post("/", NewContest);
ContestRouter.get("/", GetAllContest);

module.exports = ContestRouter;
