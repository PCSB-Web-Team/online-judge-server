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
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createToken, validateToken };
