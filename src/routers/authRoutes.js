const { Router } = require("express");
const { login_get, login_post, signup_get, signup_post, profile_get } = require("../controllers/auth.controller");
const { validateToken } = require("../middlewares/jwt");

const authRouter = Router();

authRouter.get("/", login_get);
authRouter.post("/", login_post);
authRouter.get("/signup", signup_get);
authRouter.post("/signup", signup_post);
authRouter.get("/profile", validateToken, profile_get);

module.exports = authRouter;
