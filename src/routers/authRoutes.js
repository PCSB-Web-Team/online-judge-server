const { Router } = require("express");
const {
  register,
  login,
} = require("../controllers/auth.controller");
const { validateToken } = require("../middlewares/jwt");

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

module.exports = authRouter;
