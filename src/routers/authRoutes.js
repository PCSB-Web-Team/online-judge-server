const { Router } = require("express");
const {
  login_get,
  login_post,
  profile_get,
  register,
  login,
} = require("../controllers/auth.controller");
const { validateToken } = require("../middlewares/jwt");

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

module.exports = authRouter;
