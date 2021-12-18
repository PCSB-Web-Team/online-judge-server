const Contest = require("../models/contest.model");
const mongoose = require("mongoose");

// new contest
async function NewContest(req, res) {
  const { title, startsOn, endsOn } = req.body;

  console.log("Creating");

  try{
    if (title && startsOn && endsOn) {
        const newContest = await Contest.create({ title, startsOn, endsOn });
        res.send(newContest);
      } else {
        res.status(400).send("Unable to create the contest");
      }
  }
  catch(err){
      res.status(400).send("An error occured")
  }
}

module.exports = { NewContest };
