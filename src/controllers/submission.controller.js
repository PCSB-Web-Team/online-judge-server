const Submission = require("../models/submission.model");
const mongoose = require("mongoose");
const axios = require("axios")


async function submission(req, res) {
    const { languageId, code, userId, questionId } = req.body;
    try {
    let result = await axios({
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {base64_encoded: 'true', fields: '*'},
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': '71cebddde1msh53a7db127feddf7p121a46jsna2810de7d51a'
        },
        data: {
          language_id: languageId,
          source_code: code
        }
      });
        token = result.data.token;

        const newSubmission = await Submission.create({
            userId,
            questionId,
            languageId,
            code,
            token
        });
        res.send(newSubmission);
    } catch (err) {
        res.status(400).send(err.message);
        }
}    
    
module.exports  = {submission}