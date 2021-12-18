const Contest = require("../models/contest.model");
const mongoose = require("mongoose");

// new contest
async function NewContest(req, res) {
  const { title, startsOn, endsOn } = req.body;

  console.log("Creating");

  try {
    if (title && startsOn && endsOn) {
      const newContest = await Contest.create({ title, startsOn, endsOn });
      res.send(newContest);
    } else {
      res
        .status(400)
        .send("Invalid data received, please send title, startsOn, endsOn");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}

//get all contest
async function GetAllContest(req, res) {
  try {
    const allContests = await Contest.find({});
    res.send(allContests);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

module.exports = { NewContest, GetAllContest };
