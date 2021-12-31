const { sign, verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

// Create a new token on Login / Register
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

// Token Validation used as Middleware
const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(400).json({ error: "User not Authenticated!" });

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = { createToken, validateToken };
