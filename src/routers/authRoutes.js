const { Router } = require("express");
const {
  register,
  login,
  middlewareTest,
} = require("../controllers/auth.controller");
const { validateToken } = require("../middlewares/jwt");

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/middlewareTest", validateToken, middlewareTest);

module.exports = authRouter;
