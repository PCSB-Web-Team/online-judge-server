const {
  submit,
  getSubmission,
  getAllSubmissions,
  getUserSubmissionForQuestion,
  getUserSubmissions,
} = require("../controllers/submission.controller");
const { validateToken } = require("../middlewares/jwt");

const SubmissionRouter = require("express").Router();

SubmissionRouter.get("/user/:userId", getUserSubmissions);
SubmissionRouter.get("/:userId/:questionId", getUserSubmissionForQuestion);
SubmissionRouter.get("/:submissionId", getSubmission);
SubmissionRouter.post("/", submit);
SubmissionRouter.get("/", getAllSubmissions);

module.exports = SubmissionRouter;
