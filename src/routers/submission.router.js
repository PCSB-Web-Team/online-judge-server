const {
  submission,
  getSubmission,
  getAllSubmissions,
  getUserSubmissionForQuestion,
  getUserSubmissions
} = require("../controllers/submission.controller");
const { validateToken } = require("../middlewares/jwt");

const SubmissionRouter = require("express").Router();

SubmissionRouter.get("/user/:userId", getUserSubmissions);
SubmissionRouter.get("/:userId/:questionId", getUserSubmissionForQuestion);
SubmissionRouter.get("/:token", getSubmission);
SubmissionRouter.get("/", getAllSubmissions);
SubmissionRouter.post("/", submission);

module.exports = SubmissionRouter;
