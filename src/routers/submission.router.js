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
<<<<<<< HEAD
SubmissionRouter.get("/:id", getSubmission);
=======
SubmissionRouter.get("/:submissionId", getSubmission);
SubmissionRouter.post("/", submit);
>>>>>>> docker
SubmissionRouter.get("/", getAllSubmissions);

module.exports = SubmissionRouter;
