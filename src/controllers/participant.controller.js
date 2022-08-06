const Contest = require("../models/contest.model");
const Participant = require("../models/participants.model");
const User = require("../models/user");

//Route to register the participant directly from the platform (using route)
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
    const newParticipation = await Participant.create({
      userId,
      name: user.name,
      contestId,
    });
    res.send(newParticipation);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

//Function to register the participant from external request (using auth/generateUser req coming from xenia register)
async function AddParticipantFunct(userId, contestId) {
  try {
    // checking if user is present
    const user = await User.findOne({ _id: userId });
    if (!user) return console.log("User does not exist.");

    // checking if contest exists
    const contest = await Contest.findOne({ _id: contestId });
    if (!contest) return console.log("Contest does not exist.");

    // checking if already registered
    const registration = await Participant.findOne({ userId, contestId });
    if (registration)
      return console.log("Already participated in this contest");

    // creating the new participant
    const newParticipation = await Participant.create({
      userId,
      name: user.name,
      contestId,
    });
    return console.log("New Participant added: " + {Participant: newParticipation.name, ContestId: newParticipation.contestId});
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
      return console.log(
        "Please Send All the fields( contestId, userId, score, questionId)"
      );

    // serching the participant using the userId and contestId.
    let participant = await Participant.findOne({ contestId, userId }).lean();
    if (!participant) return console.log("Participant does not exist");

    // update/insert the question's score
    if (!participant.individualScore) participant.individualScore = {};

    participant.individualScore[questionId] = Math.max(
      score,
      participant.individualScore[questionId] || 0
    );

    // calculating the total score
    let sum = 0;
    Object.values(participant.individualScore).forEach((value) => {
      sum += parseInt(value);
    });

    // saving the updated doc to mongo
    participant.individualScore = { ...participant.individualScore };
    await Participant.updateOne(
      { _id: participant._id },
      { $set: { individualScore: participant.individualScore, score: sum } }
    );
    return console.log("Updated participant Id: " + participant._id);
  } catch (err) {
    return err.message;
  }
};

async function checkParticipant(req, res) {
  const { contestId, userId } = req.params;
  try {
    const user = await Participant.findOne({
      userId: userId,
      contestId: contestId,
    });

    if (!user) {
      return res.send(false);
    }

    res.send(true);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

module.exports = {
  AddParticipant,
  AddParticipantFunct,
  GetContestParticipants,
  GetAllParticipants,
  UpdateScore,
  checkParticipant,
};
