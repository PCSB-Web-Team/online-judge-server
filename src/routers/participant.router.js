const ParticipantRouter = require("express").Router();
const {
  AddParticipant,
  GetContestParticipants,
  GetAllParticipants,
} = require("../controllers/participant.controller");

ParticipantRouter.post("/", AddParticipant);
ParticipantRouter.get("/", GetAllParticipants);
ParticipantRouter.get("/ranking/:contestId", GetContestParticipants);

module.exports = ParticipantRouter;
