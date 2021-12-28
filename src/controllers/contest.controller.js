const Contest = require("../models/contest.model");
const mongoose = require("mongoose");

// Create a new Contest

async function newContest(req, res) {
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

// Get all active contest

async function getAllContest(req, res) {
  try {
    const allContests = await Contest.find({});
    if (allContests.length === 0) {
      res.status(404).send("No active contest at the moment");
    } else {
      res.send(allContests);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
}

module.exports = { newContest, getAllContest };
