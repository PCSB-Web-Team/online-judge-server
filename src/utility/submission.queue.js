const Bull = require("bull");
const { submissionBatch } = require("./judge0");

const submissionQueue = new Bull("submissions", {
  redis: "redis:6379",
});

var list = [];

var timeOut;

// this function will create a timeout promise and store the value in timeOut variable
function startTimeOut() {
  timeOut = setTimeout(() => {
    if (list.length) submissionBatch(list);
  }, 10000);
}

// Redis Consumer : Executing after Producer adds data to queue
const submissionProcess = async (job) => {
  // first clear the timeout that is running
  clearTimeout(timeOut);

  // Push data to array list
  list.push(job.data);

  // If list length is n then send for Batch Submission (Judge0)
  if (list.length == 10) {
    submissionBatch(list);
    list = [];
  } else {
    // start the timeout again for next 10 seconds
    startTimeOut();
  }
};

// Redis Producer : Adds data to queue
function produceSubmission(data) {
  submissionQueue.add(data);
}

submissionQueue.process(submissionProcess);

module.exports = { submissionQueue, produceSubmission };