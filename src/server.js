const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { validateToken } = require("./middlewares/jwt");
const jwt_decode = require("jwt-decode");
const connect = require("../src/db/connect");
const Router = require("./routers");

const app = express();

app.use(express.json()); //this is the build in express body-parser
app.use(
  //this mean we don't need to use body-parser anymore
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.get("/profile", validateToken, (req, res) => {
  var token = req.cookies["access-token"];
  var decoded = jwt_decode(token);
  res.json({ email: decoded.email, userID: decoded.id });
});

app.use("/api", Router);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function () {
  console.log("Server is up and running at port:", port);
});
