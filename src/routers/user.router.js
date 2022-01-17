const { registerContest } = require("../controllers/user.controller");
const UserRouter = require("express").Router();

UserRouter.put("/registerContest", registerContest);

module.exports = UserRouter;