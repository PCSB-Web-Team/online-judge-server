const ParticipantRouter = require("express").Router();
const {
  AddParticipant,
  GetContestParticipants,
  GetAllParticipants,
  CheckParticipantIsRegistered,
} = require("../controllers/participant.controller");

ParticipantRouter.post("/", AddParticipant);
ParticipantRouter.get("/", GetAllParticipants);
ParticipantRouter.get("/ranking/:contestId", GetContestParticipants);
ParticipantRouter.post("/:userId/:contestId", CheckParticipantIsRegistered);

module.exports = ParticipantRouter;
