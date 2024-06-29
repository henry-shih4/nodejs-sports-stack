const Article = require("../models/articles");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const axios = require("axios");
const mongoose = require("mongoose");

//get all articles => /api/v1/articles

exports.getArticles = catchAsyncErrors(async (req, res, next) => {
  // try {
  //   const accessToken = req.headers.authorization.split(" ")[1];
  //   const response = await axios.get(
  //     "https://dev-yv1epui352cogjsx.us.auth0.com/userinfo",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );
  //   const userInfo = response.data;
  //   console.log(userInfo);
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    const articles = await Article.find();
    if (!articles) {
      res.status(404).json({ success: false, message: "no articles found" });
    }
    res
      .status(200)
      .json({ success: true, results: articles.length, data: { articles } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create a new shoe => /api/v1/shoes/new

exports.newArticle = catchAsyncErrors(async (req, res, next) => {
  console.log(req);
  try {
    let article = new Article({
      title: req.body.title,
      url: req.body.url,
      content: req.body.content,
      description: req.body.description,
      hero_img: req.body.hero_img,
      thumbnail: req.body.thumbnail,
      date_written: req.body.date_written,
      comments: req.body.comments,
    });

    article = await Article.create(article);
    res
      .status(200)
      .json({ success: true, message: "new article created", data: article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get article by id => /api/v1/articles/:id

exports.getArticleByID = catchAsyncErrors(async (req, res, next) => {
  const articleId = req.params.id;

  if (!mongoose.isValidObjectId(articleId)) {
    res.status(200).send("Invalid article id"); // you can define your status and message
    return;
  }

  try {
    const article = await Article.findById(articleId);
    if (!article || article.length === 0) {
      return next(new ErrorHandler("Article not found", 404));
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).send();
  }
});
