const { Router } = require("express");
const { register, login, profile, generateUser } = require("../controllers/auth.controller");
const { validateToken } = require("../middlewares/jwt");

const authRouter = Router();

authRouter.post("/generate-user", generateUser);
authRouter.post("/login", login);
authRouter.post("/signup", register);
authRouter.get("/", validateToken, profile);

module.exports = authRouter;
