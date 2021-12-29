const {
  submission,
  getSubmission,
  getAllSubmissions,
} = require("../controllers/submission.controller");

const SubmissionRouter = require("express").Router();

SubmissionRouter.get("/:token", getSubmission);
SubmissionRouter.get("/", getAllSubmissions).post("/", submission);

module.exports = SubmissionRouter;
