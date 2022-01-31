const Bull = require("bull");
const { runBatch } = require("./judge0");

const runQueue = new Bull("run", {
  redis: "redis:6379",
  limiter: {
    max: 5,
    duration: 5000,
  },
});

var list = [];

// Redis Consumer : Executing after Producer adds data to queue
const runProcess = async (job) => {

  // Push data to array list
  list.push(job.data);

  // If list length is n then send for Batch Submission (Judge0)
  if (list.length == 5) {
    runBatch(list);
    list = [];
  }
};

// Redis Producer : Adds data to queue
function produceRun(data) {
  runQueue.add(data);
}

runQueue.process(runProcess);

module.exports = { runQueue, produceRun };
