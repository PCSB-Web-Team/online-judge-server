const User = require("../models/user");
const { createToken, validateToken } = require("../middlewares/jwt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

// Login route
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) return res.status(404).send("User not found");

    if (await bcrypt.compare(password, user.password)) {
      const token = await createToken(user);
      user.token = token;
      return res.json(user);
    }

    return res.status(404).send("Invalid Password");
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Register
async function register(req, res) {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name && !email && !password && !phoneNumber) {
      return res.status(400).send("All fields are required");
    }

    // Encrypting password
    const encyptedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(400).send("User already exist for this email.");
    }

    // Creating a user
    const user = await User.create({
      name,
      email,
      password: encyptedPassword,
      phoneNumber,
    });

    // Register jwt token
    const token = createToken(user);

    // Save the token
    user.token = token;

    return res.status(201).json(user);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

// Profile - Returns the user after middleware (validateToken) is run
async function profile(req, res) {
  try {
    // Find user without sending password and version key (__v)
    const user = await User.findById(req.user.id).select("-password -__v");
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("No user exists with such id");
    }
  } catch (err) {
    res.code(400).send(err.message);
  }
}

module.exports = {
  login,
  register,
  profile,
};
