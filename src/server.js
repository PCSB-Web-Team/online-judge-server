const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connect = require("../src/db/connect");
const Router = require("./routers");
const cors = require("cors");
const judge0Connect = require("./utility/judge0").pingJudge0;
const { events } = require("./models/contest.model");
const axios = require("axios");

console.log(
  "Redis Port: " + process.env.redisPort + ", Host: " + process.env.redisHost
);

axios
  .get("http://localhost:" + process.env.redisPort)
  .then((res) => {
    console.log("Respomse from Redis: " + res);
  })
  .catch((err) => console.log("Unable to connect to redis"));

judge0Connect();

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("Inside App use");
  console.log(process.env.key);
  if (req.headers.key === process.env.key) {
    next();
  } else {
    res.status(400).send("Invalid api key");
  }
});

app.use("/api", Router);

let port = process.env.PORT;

if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function () {
  console.log("Server is up and running at port:", port);
});
