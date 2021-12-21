const mongoose = require("mongoose");
const callBackModel = require("../models/callback.model");

async function callBackHandler(req, res) {
  console.log(req.body);
  await callBackModel.create({ ...req.body });
  res.send("success");
}

async function callBackTester(req, res) {
  res.send("Callback Wokring Successfully");
}

module.exports = { callBackHandler, callBackTester };
