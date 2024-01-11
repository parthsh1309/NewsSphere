const router = require("express").Router();
const getLogo = require("get-website-favicon");
require("dotenv").config({ path: "./config/.env" });
const NodeCache = require( "node-cache" );
const cache = new NodeCache();

const newsApi = require("newsapi");
const apiKey = process.env.api_key;
const newsapi = new newsApi(apiKey);

const fetchTopHeadlines = require("../api/fetchTopHeadlines");
const fetchLatestNews = require("../api/fetchLatestNews");
const fetchNationalNews = require("../api/fetchNationalNews");
const userAuth = require("../../middleware/userAuth");


router.get("/", userAuth, async (req, res) => {
    try {
      const { newsCategory } = req.user;
  
      const cacheKeyHeadlines = `topHeadlines_${newsCategory}`;
      const cacheKeyLatestNews = 'latestNews';
      const cacheKeyNationalNews = 'nationalNews';
  
      let topHeadlines = cache.get(cacheKeyHeadlines);
      let latestNews = cache.get(cacheKeyLatestNews);
      let nationalNews = cache.get(cacheKeyNationalNews);
  
      // if there is no data in cashe do this
      if (!topHeadlines || !latestNews || !nationalNews) {
        // Concurrently fetch data from multiple APIs
        [topHeadlines, latestNews] = await Promise.all([
          fetchTopHeadlines(newsapi, newsCategory),
          fetchLatestNews(newsapi),
          fetchNationalNews(newsapi),
        ]);

        cache.set(cacheKeyHeadlines, topHeadlines, { ttl: 60 * 5 });
        cache.set(cacheKeyLatestNews, latestNews, { ttl: 60 * 5 });
        cache.set(cacheKeyNationalNews, nationalNews, { ttl: 60 * 5 });
      }
  
      // Render the page with the retrieved data and logos
      console.log(nationalNews);
      res.render("home", {
        newsData: topHeadlines.articles,
        latestNews: latestNews.articles,
        nationalNews: nationalNews.articles,
      });
    } catch (error) {
      if(error.name==='NewsAPIError: maximumResultsReached'){
       return res.status(500).send("Server Got Heart Failure Please try Again Later daily Limit Reached"); 
      }
      // Handle errors appropriately
      res.status(500).send("Server Got Heart Failure");
    }
  });

module.exports = router;
