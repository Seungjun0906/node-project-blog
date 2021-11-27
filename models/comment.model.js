const { Schema, model } = require("mongoose");

const CommentSchema = Schema(
  {
    commentId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    collection: "comments",
  }
);

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
