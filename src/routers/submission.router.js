const { submission } = require("../controllers/submission.controller");

const SubmissionRouter = require("express").Router();

SubmissionRouter.post("/", submission);

module.exports = SubmissionRouter;
