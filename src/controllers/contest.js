const Contest = require("../models/contest");
const mongoose = require("mongoose");

// new contest
async function NewContest(req, res) {
  const { title, description } = req.body;

  if (title && description) {
    const newContest = Contest.create({ title, description });

    res.send(newContest);
  } else {
    res.status(400).send("Unable to create the contest");
  }
}

module.exports = { NewContest };
