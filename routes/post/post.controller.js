const Post = require("../../models/post.model");
const Comment = require("../../models/comment.model");
const path = require("path");

const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: "asc" });
  res.status(200).json({ status: "ok", posts: posts });
};

// POST
const addPost = async (req, res) => {
  const { title, content, author, password } = req.body;

  try {
    const response = await Post.create({
      title,
      content,
      author,
      password,
    });
  } catch (err) {
    console.log(err);
  }
  res
    .status(201)
    .json({ status: "ok", message: "Content created Successfully" });
};

// PATCH
const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content, password } = req.body;

  const post = await Post.findById(postId);
  try {
    if (password === post.password) {
      await Post.findByIdAndUpdate(postId, {
        title: title,
        content: content,
      });
    } else {
      return res.status(400).json({
        errors: "error",
        message: "please check the password",
      });
    }
  } catch (err) {
    console.log(err);
  }
  console.log(post);
  res
    .status(200)
    .json({ status: "ok", message: "resource updated successfully" });
};

// DELETE
const deletePost = async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;
  console.log(password);
  const post = await Post.findById(postId);
  console.log(post.password);

  if (post !== null) {
    if (post.password === password) {
      await Post.findByIdAndDelete(postId);
    } else {
      return res.status(400).json({
        errors: "errors",
        message: "Pleaes check the password",
      });
    }
  }

  res.status(200).json({
    status: "ok",
    message: "Post deleted successfully!",
  });
};

// SHOW POST BY ID
const showPost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  const comments = await Comment.find({ commentId: postId }).sort({
    createdAt: "desc",
  });

  res.render("show", { post: post, comments: comments });
};

// GET FOR EDIT
const showEditPost = async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  res.render("edit", { post: post });
};

module.exports = {
  getPosts,
  showPost,
  updatePost,
  addPost,
  showEditPost,
  deletePost,
};
