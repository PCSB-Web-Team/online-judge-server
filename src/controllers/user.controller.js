const User = require("../models/user");
const mongoose = require("mongoose");

// Register a User for Contest using userId 

async function registerContest(req, res) {
    const { userId, contestId } = req.body;
  
    try {
      if (userId && contestId) {
        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { registeredContest:{contestId: contestId }}}
          )
        res.send("User registered for the contest");
      } else {
        res
          .status(400)
          .send("Invalid data received, please send userId and contestId");
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  }


const updateSolved = async function(userId, contestId, questionId) {
  
}

module.exports = { registerContest, updateSolved };