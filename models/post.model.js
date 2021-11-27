const { Schema, model } = require("mongoose");

// const CommentSchema = Schema({
//   comment: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// comments: [
//   {
//     type: [String],
//     default: [],
//   },
// ],

const PostSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },

  { collection: "posts" }
);

const Post = model("Post", PostSchema);

module.exports = Post;
