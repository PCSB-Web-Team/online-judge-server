const Contest = require("../models/contest.model");
const Participant = require("../models/participants.model");
const User = require("../models/user");

async function AddParticipant(req, res) {
  const { userId, contestId } = req.body;
  try {
    // checking if user is present
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).send("User does not exist.");

    // checking if contest exists
    const contest = await Contest.findOne({ _id: contestId });
    if (!contest) return res.status(404).send("Contest does not exist.");

    // checking if already registered
    const registration = await Participant.findOne({ userId, contestId });
    if (registration)
      return res.status(401).send("Already participated in this contest");

    // creating the new participant
    const newParticipation = await Participant.create({ userId, contestId });
    res.send(newParticipation);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

async function GetAllParticipants(req, res) {
  try {
    const list = await Participant.find({});
    res.send(list);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

async function GetContestParticipants(req, res) {
  const { contestId } = req.params;
  try {
    const list = await Participant.find({ contestId }).sort({ score: -1 });
    res.send(list);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

const UpdateScore = async (contestId, userId, score, questionId) => {

  try {
    // checking if all the details have been received
    if (!contestId || !userId || !score || !questionId)
      return console.log( "Please Send All the fields( contestId, userId, score, questionId)");
        

    // serching the participant using the userId and contestId.
    let participant = await Participant.findOne({ contestId, userId });
    if (!participant) return console.log("Participant does not exist"); 

    // update/insert the question's score
    if (!participant.individualScore) participant.individualScore = {};
    participant.individualScore[questionId] = score;

    // calculating the total score
    let sum = 0;
    Object.values(participant.individualScore).forEach((value) => {
      sum += parseInt(value);
    });

    // updating the total score
    participant.score = sum;

    // saving the updated doc to mongo
    participant.individualScore = { ...participant.individualScore };
    await participant.save();
    return console.log(participant);

  } catch (err) {
    return err.message;
  }

}


module.exports = {
  AddParticipant,
  GetContestParticipants,
  GetAllParticipants,
  UpdateScore,
};
