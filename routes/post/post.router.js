const Post = require("../../models/post.model");
const express = require("express");
const authenticateToken = require("../../midlewares/auth-middleware");
const {
  addPost,
  getPosts,
  showPost,
  showEditPost,
  updatePost,
  deletePost,
} = require("./post.controller");

const router = express.Router();

// for homepage
router.get("/", getPosts);

router.get("/:postId", showPost);

router.post("/", authenticateToken, addPost);

router.patch("/edit/:postId", authenticateToken, updatePost);
router.delete("/delete/:postId", authenticateToken, deletePost);

router.get("/edit/:postId", showEditPost);

module.exports = router;
