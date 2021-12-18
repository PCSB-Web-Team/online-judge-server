const mongoose = require("mongoose");

const mongoUri = process.env.mongoURI;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("MongoDB Connected");
  });

module.exports = mongoose;
