const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/login", authController.login_get);
authRouter.post("/login", authController.login_post);
authRouter.get("/signup", authController.signup_get);
authRouter.post("/signup", authController.signup_post);

module.exports = authRouter;
