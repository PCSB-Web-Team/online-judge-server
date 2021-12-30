const User = require("../models/user");
const { createToken, validateToken } = require("../middlewares/jwt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

// login route
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) return res.status(404).send("User not found");

    if (await bcrypt.compare(password, user.password)) {
      const token = await createToken(user);
      user.token = token;
      res.json(user);
    }

    return res.status(404).send("Invalid Password");
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Register
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res.status(400).send("All fields are required");
    }

    // encrypting password
    const encyptedPassword = await bcrypt.hash(password, 10);

    // check if user already exists
    const checkUser = await User.findOne({ email });

    console.log(checkUser);

    if (checkUser) {
      return res.status(400).send("User already exist for this email.");
    }

    // creating a user
    const user = await User.create({ name, email, password: encyptedPassword });

    // register jwt token
    const token = createToken(user);

    // save the token
    user.token = token;

    return res.status(201).json(user);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

module.exports = {
  login,
  register,
};
