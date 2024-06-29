const express = require("express");
const router = express.Router();


const { getArticles, newArticle, getArticleByID } = require("../controllers/articleController");

router.route("/articles").get(getArticles);
// router.route("/articles").post(newArticle);
router.route("/articles/:id").get(getArticleByID);

module.exports = router;