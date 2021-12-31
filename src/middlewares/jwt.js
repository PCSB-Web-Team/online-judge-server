const { sign, verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = { createToken, validateToken };
