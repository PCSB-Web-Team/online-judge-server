const { run } = require("../controllers/run.controller");

const RunRouter = require("express").Router();

RunRouter.post("/", run);

module.exports = RunRouter;
