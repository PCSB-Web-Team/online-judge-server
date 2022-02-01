const { run, getRun, getAllRuns } = require("../controllers/run.controller");

const RunRouter = require("express").Router();

RunRouter.get("/:runId", getRun);
RunRouter.post("/", run);
RunRouter.get("/", getAllRuns);

module.exports = RunRouter;
