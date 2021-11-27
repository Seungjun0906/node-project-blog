require("dotenv").config();
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  const { firstName, lastName, username, password, passwordConfirm } = req.body;
  const pattern = "^[A-Za-z][A-Za-z0-9_]*$";

  // USERNAME VALIDATION
  if (!username || username.trim().length < 3 || !username.match(pattern)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid Username" });
  }
  // PASSWORD VALIDATION
  if (
    password !== passwordConfirm ||
    password < 5 ||
    password.includes(username)
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid Password" });
  }

  try {
    const response = await User.create({
      firstName,
      lastName,
      username,
      password,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ status: "error", message: "Username already in use" });
    }
    throw err;
  }

  res.status(201).json({
    status: "ok",
    message: "Account created successfully, You can now signin!",
  });
};

const signinUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await User.findOne({ username: username, password: password });
  console.log("유저는: " + user);

  if (!user) {
    res.status(400).json({
      error: "errors",
      message: "Please check your Username/Password",
    });
  }
  const token = await jwt.sign(
    {
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: 6500000 }
  );

  console.log(token);
  res.status(200).json({
    status: "ok",
    message: "Enjoy!",
    token: token,
  });
};

module.exports = {
  addUser,
  signinUser,
};
