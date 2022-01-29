const {
  submit,
  run,
  getSubmission,
  getAllSubmissions,
  getUserSubmissionForQuestion,
  getUserSubmissions,
} = require("../controllers/submission.controller");
const { validateToken } = require("../middlewares/jwt");

const SubmissionRouter = require("express").Router();

SubmissionRouter.get("/user/:userId", getUserSubmissions);
SubmissionRouter.post("/run", run);
SubmissionRouter.get("/:userId/:questionId", getUserSubmissionForQuestion);
SubmissionRouter.get("/:token", getSubmission);
SubmissionRouter.get("/", getAllSubmissions);

module.exports = SubmissionRouter;
