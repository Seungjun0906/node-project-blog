const express = require("express");
const path = require("path");
// const bodyParser = require("body-parser");

// const homeRouter = require("./routes/home/home.router.js");

const postRouter = require("./routes/post/post.router");
const authRouter = require("./routes/auth/auth.router");
const commentRouter = require("./routes/comment/comment.router");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/auth", authRouter);

module.exports = app;
