const express = require("express");
const router = express.Router();
const jwtCheck = require("../../middlewares/jwtAuth");

const {
  createComment,
  getCommentsByArticleId,
  removeComment,
} = require("../controllers/commentController");

router.route("/articles/:articleId/comments").post(jwtCheck, createComment);
router.route("/articles/:articleId/comments").get(getCommentsByArticleId);
router.route("/comments/:commentId").post(removeComment);

module.exports = router;
