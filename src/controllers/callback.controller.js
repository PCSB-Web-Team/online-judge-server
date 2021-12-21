const mongoose = require("mongoose");
const callBackModel = require("../models/callback.model");

async function callBackHandler(req, res) {
  try {
    const { status_id } = req.body;
    const updateData = await callBackModel.create({ status_id: status_id });
    res.send("success");
  } catch (err) {
    res.status(400).json(req.body);
  }
}

async function callBackTester(req, res) {
  res.send("Callback Wokring Successfully");
}

module.exports = { callBackHandler, callBackTester };
