const Comment = require("../models/comments");
const Article = require("../models/articles");
const User = require("../models/users");

const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");

//create new comment

exports.createComment = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findOne({ authID: req.body.authID });

    if (!user) {
      user = new User({
        authID: req.body.authID,
        email: req.body.email,
        name: req.body.name,
        picture: req.body.picture,
        username: req.body.username,
      });
      await user.save();
    }

    const article = await Article.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    const { content } = req.body;

    const comment = {
      content: content,
      user: user._id,
      authID: user.authID,
      article: article._id,
    };
    const new_comment = await Comment.create(comment);

    res.status(200).json({
      success: true,
      message: "New comment created for article",
      data: new_comment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(401).json({ error: "Login to create a comment" });
  }
});

//get comment by articleid

exports.getCommentsByArticleId = catchAsyncErrors(async (req, res, next) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId });
    if (!comments) {
      return res.status(404).json({ error: "Comments not found" });
    }
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//remove comment by commentid

exports.removeComment = catchAsyncErrors(async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    const user = await User.findOne({ authID: req.body.authID });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.user.toString() == user._id.toString()) {
      await Comment.deleteOne({ _id: comment._id });
      res.status(200).json({ success: true, message: "Comment removed" });
    }
  } catch (error) {
    console.error("Error removing comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
