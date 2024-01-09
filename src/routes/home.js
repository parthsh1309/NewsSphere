const router = require("express").Router();
require("dotenv").config({ path: "./config/.env" });

const newsApi = require('newsapi');
const apiKey = process.env.api_key;
const newsapi = new newsApi(apiKey);

const fetchTopHeadlines = require('../api/fetchTopHeadlines')

const userAuth = require("../../middleware/userAuth");

router.get("/",userAuth,async (req, res) => {
    const {newsCategory} = req.user;
    const response = await fetchTopHeadlines(newsapi,newsCategory);
    // console.log(response.articles[1]);
    res.render("home",{newsData:response.articles});
});

module.exports = router;