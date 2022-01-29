const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  contestId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  individualScore: { type: {}, default: {}, required: true },
  score: {
    default: 0,
    type: Number,
    required: true,
  },
});

participantSchema.index({ userId: 1, contestId: 1 }, { unique: true });

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
