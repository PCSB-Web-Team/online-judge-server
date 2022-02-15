const ParticipantRouter = require("express").Router();
const {
  AddParticipant,
  GetContestParticipants,
  GetAllParticipants,
  checkParticipant,
} = require("../controllers/participant.controller");


ParticipantRouter.get("/ranking/:contestId", GetContestParticipants);
ParticipantRouter.get("/:userId/:contestId", checkParticipant);
ParticipantRouter.post("/", AddParticipant);
ParticipantRouter.get("/", GetAllParticipants);

module.exports = ParticipantRouter;
