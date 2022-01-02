const {
  submission,
  getSubmission,
  getAllSubmissions,
} = require("../controllers/submission.controller");
const { validateToken } = require("../middlewares/jwt");

const SubmissionRouter = require("express").Router();

SubmissionRouter.get("/user/:userid", getSubmission);
SubmissionRouter.get("/:token", getSubmission);
SubmissionRouter.get("/", getAllSubmissions);
SubmissionRouter.post("/", submission);

module.exports = SubmissionRouter;
