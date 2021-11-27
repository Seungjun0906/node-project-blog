require("dotenv").config();
const Comment = require("../../models/comment.model");
const jwt = require("jsonwebtoken");

// ADD COMMENT
const addComment = async (req, res) => {
  const { comment, commentId, creator } = req.body;
  const user = jwt.verify(creator, process.env.SECRET_KEY);
  console.log(user.username);
  const response = await Comment.create({
    comment,
    commentId,
    creator: user.username,
  });
  const username = res.locals.user._conditions.username;
  res.status(200).json({
    status: "ok",
    username: username,
  });
};

// UPDATE COMMENT
const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment, previousComment, creator, currentUser } = req.body;
  const user = jwt.verify(currentUser, process.env.SECRET_KEY);

  if (user.username !== creator)
    return res.status(400).json({
      error: "errors",
      message: "You are not allowed to edit the comment other user created",
    });

  const updatedComment = await Comment.findOneAndUpdate(
    {
      commentId: commentId,
      comment: previousComment,
      creator: creator,
    },
    { comment: comment }
  );
  console.log(updatedComment);
  if (updateComment !== null) {
    return res
      .status(200)
      .json({ status: "ok", message: "Comment edited successfully!" });
  }

  res
    .status(400)
    .json({ errors: "errors", message: "something went wrong!!!" });
};

// DELETE COMMENT
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment, creator, currentUser } = req.body;

  const user = jwt.verify(currentUser, process.env.SECRET_KEY);

  if (user.username !== creator)
    return res.status(400).json({
      error: "errors",
      message: "You are not allowed to edit the comment other user created",
    });

  const commentDeleted = await Comment.findOneAndDelete({
    commentId: commentId,
    comment: comment,
    creator: user.username,
  });

  if (commentDeleted !== null) {
    return res.status(200).json({
      status: "ok",
      message: "Comment deleted successfully!!",
    });
  }
  return res.status(400).json({
    errors: "errors",
    message: "Something went wrong!!!",
  });
};

module.exports = { addComment, updateComment, deleteComment };
