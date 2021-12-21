const mongoose = require("mongoose");
const callBackModel = require("../models/callback.model");

async function callBackHandler(req, res) {
  try{
    await callBackModel.create(req.body);
    res.send("success");
  }
  catch(err){
      res.status(400).json(req.body)
  }

}

async function callBackTester(req, res) {
  res.send("Callback Wokring Successfully");
}

module.exports = { callBackHandler, callBackTester };
