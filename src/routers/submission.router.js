const {
  submission,
  getSubmission,
} = require("../controllers/submission.controller");

const SubmissionRouter = require("express").Router();

SubmissionRouter.get("/:token", getSubmission);
SubmissionRouter.post("/", submission);

module.exports = SubmissionRouter;
