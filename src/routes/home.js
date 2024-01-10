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
const fetchTopSources = require("../api/fetchTopSources");

const userAuth = require("../../middleware/userAuth");


router.get("/", userAuth, async (req, res) => {
    try {
      const { newsCategory } = req.user;
  
      const cacheKeyHeadlines = `topHeadlines_${newsCategory}`;
      const cacheKeyLatestNews = 'latestNews';
      const cacheKeyInTopSources = 'inTopSources';
      const cacheKeyUsTopSources = 'usTopSources';
      const cacheKeyLogos = 'logos';
  
      let topHeadlines = cache.get(cacheKeyHeadlines);
      let latestNews = cache.get(cacheKeyLatestNews);
      let inTopSources = cache.get(cacheKeyInTopSources);
      let usTopSources = cache.get(cacheKeyUsTopSources);
      let logoArray = cache.get(cacheKeyLogos);
  
      // if there is no data in cashe do this
      if (!topHeadlines || !latestNews || !inTopSources || !usTopSources || !logoArray) {
        // Concurrently fetch data from multiple APIs
        [topHeadlines, latestNews, inTopSources, usTopSources] = await Promise.all([
          fetchTopHeadlines(newsapi, newsCategory),
          fetchLatestNews(newsapi),
          fetchTopSources(newsapi, "in"),
          fetchTopSources(newsapi, "us"),
        ]);
  
        // fetching logos
        const logoPromises = inTopSources.concat(usTopSources).map(async (source) => {
          try {
            const logo = await getLogo(source.url);
            return {
              icon: logo.icons[0].src,
              baseUrl: logo.baseUrl,
            };
          } catch (error) {
            console.error(`Error fetching logo for ${source.name}:`, error);
            return {
              icon: null,
              baseUrl: null,
            };
          }
        });
  
        logoArray = await Promise.all(logoPromises);
        console.log('top source',inTopSources);
        console.log('Logo Array',logoArray);
  
        cache.set(cacheKeyHeadlines, topHeadlines, { ttl: 60 * 5 });
        cache.set(cacheKeyLatestNews, latestNews, { ttl: 60 * 5 });
        cache.set(cacheKeyInTopSources, inTopSources, { ttl: 60 * 5 });
        cache.set(cacheKeyUsTopSources, usTopSources, { ttl: 60 * 5 });
        cache.set(cacheKeyLogos, logoArray, { ttl: 60 * 5 });
      }
  
      // Render the page with the retrieved data and logos
      res.render("home", {
        newsData: topHeadlines.articles,
        latestNews: latestNews.articles,
        topSources: inTopSources.concat(usTopSources),
        logoArray: logoArray,
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle errors appropriately
      res.status(500).send("Internal Heart Failure");
    }
  });

module.exports = router;
