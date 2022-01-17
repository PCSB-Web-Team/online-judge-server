const { newContest, getAllContest } = require("../controllers/contest.controller");
const { registerContest } = require("../controllers/user.controller");
const ContestRouter = require("express").Router();

ContestRouter.put("/resisterContest", registerContest);
ContestRouter.post("/", newContest);
ContestRouter.get("/", getAllContest);

module.exports = ContestRouter;
