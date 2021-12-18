const User = require("../models/user");
const { createTokens, validateToken } = require("../middlewares/jwt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.login_get = (req, res) => {
  console.log("Login Page Up");
};

module.exports.login_post = async (req, res) => {
  const email = req.body.email;
  const textPassword = req.body.password;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  bcrypt.compare(textPassword, user.password).then((match) => {
    if (!match) {
      res
        .status(400)
        .json({ error: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });

      res.json("LOGGED IN");
    }
  });
};

module.exports.signup_get = (req, res) => {
  console.log("SignUp Page Up");
};

module.exports.signup_post = async (req, res) => {
  const email = req.body.email;
  const textPassword = req.body.password;

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!textPassword || typeof textPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (textPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  const password = await bcrypt.hash(textPassword, 10);
  try {
    const user = await User.create({ email, password });

    const accessToken = createTokens(user);

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });

    res.json("REGISTERED AND LOGGED IN");
  } catch (err) {
    if (err.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw err;
  }
};
