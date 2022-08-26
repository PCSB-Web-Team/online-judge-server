const mongoose = require("mongoose");
const moment = require("moment");

const contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  startsOn: {
    type: Date,
    required: true,
  },
  endsOn: {
    type: Date,
    required: true,
  },
});

contestSchema.set("toObject", { virtuals: true });
contestSchema.set("toJSON", { virtuals: true });

contestSchema.virtual("status").get(function () {
  let status = {};

  var now = moment(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  var start = moment(this.startsOn);
  var end = moment(this.endsOn);

  const startDiff = moment.duration(start.diff(now));
  const endDiff = moment.duration(end.diff(now));
  const startSeconds = startDiff.asSeconds();
  const endSeconds = endDiff.asSeconds();

  if (startSeconds > 0) {
    status.description = "NOTSTARTED";
    status.time = startSeconds;
  } else if (startSeconds < 0 && endSeconds < 0) {
    status.description = "ENDED";
    status.time = 0;
  } else {
    status.description = "RUNNING";
    status.time = endSeconds;
  }

  return status;
});

const contest = mongoose.model("Contest", contestSchema);

module.exports = contest;
