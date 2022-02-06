const Run = require("../models/run.model");
const { produceRun, runQueue } = require("../utility/run.queue");

// This is where Judge0 will send back the status of code execution
const runCallBackURL = `${process.env.callBack}/callback/run`;

// Run code by sending Judge0 with source_code, language_id and sample_input (stdin)
// Token received back from Judge0 is then used to get the output (stdout)
// NOTE: Judge0 sends code execution status on callback_url having PUT request in router
async function run(req, res) {
  const { languageId, code, stdin } = req.body;

  try {
    if (languageId && code) {
      // Create a new Run Submission when user clicks on Run
      const newRun = await Run.create({});

      // Encode Input (stdin) and code (source_code) to base64
      const encodedStdin = Buffer.from(stdin).toString("base64");
      const encodedCode = Buffer.from(code).toString("base64");

      // Making object to send to Judge0
      const postData = {
        language_id: languageId,
        source_code: encodedCode,
        stdin: encodedStdin,
        callback_url: runCallBackURL,
        runId: newRun._id,
      };

      // Calling Redis to make Queue
      runQueue.add(postData)

      res.send(newRun._id);
    } else {
      res.status(400).send("Invalid data received, send valid data");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Get Run if exists using ./run/:runId

async function getRun(req, res) {
  try {
    const run = await Run.findOne({ _id: req.params.runId });

    if (run) {
      res.send(run);
    } else {
      res.status(404).send("No Runs exists with such runId");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// get all runs

async function getAllRuns(req, res) {
  try {
    const list = await Run.find({});
    res.send(list);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

module.exports = {
  run,
  getRun,
  getAllRuns
};
