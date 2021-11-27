const Post = require("../../models/post.model");

const getPost = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: "Desc" });
  console.log(posts);
  res.status(200).json(posts);
};

module.exports = {
  getPost,
};
