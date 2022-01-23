const {
  submission,
  getSubmission,
  getAllSubmissions,
  getUserSubmissionForQuestion,
  getUserSubmissions
} = require("../controllers/submission.controller");
const { validateToken } = require("../middlewares/jwt");

const SubmissionRouter = require("express").Router();

SubmissionRouter.get("/user/:userid", getSubmission);
SubmissionRouter.get("/:userId/:questionId", getUserSubmissionForQuestion);
SubmissionRouter.get("/user/:userid", getUserSubmissions);
SubmissionRouter.get("/:token", getSubmission);
SubmissionRouter.get("/", getAllSubmissions);
SubmissionRouter.post("/", submission);

module.exports = SubmissionRouter;
