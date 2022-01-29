const Bull = require("bull");
const { executeBatch } = require("./judge0");

const submissionQueue = new Bull("submissions", {
  redis: "redis:6379",
  limiter: {
    max: 10,
    duration: 10000,
  },
});

var list = [];

// Redis Consumer : Executing after Producer adds data to queue
const submissionProcess = async (job) => {

  // Push data to array list
  list.push(job.data);

  // If list length is n then send for Batch Submission (Judge0)
  if (list.length == 10) {
    executeBatch(list);
    list = [];
  }
};

// Redis Producer : Adds data to queue
function produce(data) {
  submissionQueue.add(data);
}

submissionQueue.process(submissionProcess);

module.exports = { submissionQueue, produce };
