const router = require("express").Router();
const { addUser, signinUser } = require("./auth.controller");

router.post("/signup", addUser);

router.post("/signin", signinUser);

module.exports = router;
