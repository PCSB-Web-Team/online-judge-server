const { subCallBackHandler } = require("../controllers/callback.controller");
const { runCallBackHandler } = require("../controllers/callback.controller");

const CallBackRouter = require("express").Router();

CallBackRouter.put("/sub", subCallBackHandler);
CallBackRouter.put("/run", runCallBackHandler);

module.exports = CallBackRouter;
