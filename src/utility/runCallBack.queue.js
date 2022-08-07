const Bull = require("bull");
const Run = require("../models/run.model");

const runCallBackQueue = new Bull("runCallback", {
  redis: {
    host: process.env.redisHost || "127.0.0.1",
    port: process.env.redisPort,
  },
});

// Redis Consumer : Executing after Producer adds data to queue
const runProcess = async (job) => {
  const callbackBody = job.data;

  try {
    console.log("Run Call back hit", callbackBody.status);
    
    // Decoding all the Base64 encoded fields
    callbackBody.stdout = Buffer.from(
      callbackBody.stdout || "",
      "base64"
    ).toString("ascii");
    callbackBody.message = Buffer.from(
      callbackBody.message || "",
      "base64"
    ).toString("ascii");
    callbackBody.stderr = Buffer.from(
      callbackBody.stderr || "",
      "base64"
    ).toString("ascii");
    callbackBody.compile_output = Buffer.from(
      callbackBody.compile_output || "",
      "base64"
    ).toString("ascii");

    // Update the Run Model with body
    const runBody = await Run.findOneAndUpdate(
      { token: callbackBody.token },
      callbackBody,
      { upsert: true }
    );

  } catch (err) {
    console.log(err.message);
  }
};

runCallBackQueue.process(runProcess);

module.exports = { runCallBackQueue };
