const mongoose = require("mongoose");
const callBackModel = require("../models/callback.model");

async function callBackHandler(req, res) {
  try {
    await callBackModel.create({ body: req.body });
    res.send("success");
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { callBackHandler };
