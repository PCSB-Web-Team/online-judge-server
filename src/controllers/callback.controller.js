const mongoose = require('mongoose')
const callBackModel = require('../models/callback.model')

async function callBackHandler(req, res){
    await callBackModel.create(req.body);
}

async function callBackTester(req, res){
    res.send("Callback Wokring Successfully")
}

module.exports = {callBackHandler, callBackTester}