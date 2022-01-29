const ParticipantRouter = require("express").Router();
const {
  AddParticipant,
  GetContestParticipants,
  GetAllParticipants,
  UpdateScore,
} = require("../controllers/participant.controller");

ParticipantRouter.post("/", AddParticipant);
ParticipantRouter.get("/", GetAllParticipants);
ParticipantRouter.get("/ranking/:contestId", GetContestParticipants);
ParticipantRouter.put("/update-score", UpdateScore);

module.exports = ParticipantRouter;
