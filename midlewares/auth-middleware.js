require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (token == null) return res.sendStatus(401);

  const { username } = jwt.verify(token, process.env.SECRET_KEY);

  const user = User.findOne({ username: username });

  res.locals.user = user;

  next();
};

module.exports = authenticateToken;
