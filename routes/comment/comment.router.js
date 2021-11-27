// const Comment = require("../../models/comment.model");
const router = require("express").Router();
const {
  addComment,
  updateComment,
  deleteComment,
} = require("./comment.controller");
const authenticateToken = require("../../midlewares/auth-middleware");

router.post("/", authenticateToken, addComment);
router.patch("/update/:commentId", authenticateToken, updateComment);
router.delete("/delete/:commentId", authenticateToken, deleteComment);

module.exports = router;
