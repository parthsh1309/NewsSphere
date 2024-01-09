const router = require("express").Router();
require("dotenv").config({ path: "./config/.env" });

const newsApi = require('newsapi');
const apiKey = process.env.api_key;
const newsapi = new newsApi(apiKey);

const fetchTopHeadlines = require('../api/fetchTopHeadlines')
const fetchLatestNews = require('../api/fetchLatestNews')

const userAuth = require("../../middleware/userAuth");

router.get("/",userAuth,async (req, res) => {
    const {newsCategory} = req.user;
    const topHeadlines = await fetchTopHeadlines(newsapi,newsCategory);
    const latestNews = await fetchLatestNews(newsapi);
    res.render("home",{newsData:topHeadlines.articles,latestNews:latestNews.articles});
});

module.exports = router;