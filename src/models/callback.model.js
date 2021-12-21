const mongoose = require("mongoose");

const callBackSchema = new mongoose.Schema({
  body: {
    type: Object,
  },
});

const callBackModel = mongoose.model("CallBacks", callBackSchema);

module.exports = callBackModel;
