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

const submissionProcess = async (job) => {
  list.push(job.data);
  console.log("Added")
  if (list.length == 10) {
    executeBatch(list);
    list = [];
  }
};

function produce(data) {
  submissionQueue.add(data);
}

submissionQueue.process(submissionProcess);

module.exports = { submissionQueue, produce };
