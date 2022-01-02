const { callBackHandler } = require("../controllers/callback.controller");

const CallBackRouter = require("express").Router();

CallBackRouter.put("/", callBackHandler);

module.exports = CallBackRouter;
