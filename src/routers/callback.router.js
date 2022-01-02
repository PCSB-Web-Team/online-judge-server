const {
  callBackHandler,
  callBackTester,
} = require("../controllers/callback.controller");

const CallBackRouter = require("express").Router();

CallBackRouter.put("/test", callBackTester);
CallBackRouter.put("/", callBackHandler);

module.exports = CallBackRouter;
