module.exports=function fetchTopHeadlines(newsapi){
    return newsapi.v2.topHeadlines({
        // sources: 'bbc-news,the-verge',
        q: 'india',
        category: 'sports',
        language: 'en',
        country: 'in'
      }).then(response => {
        // console.log(response);
        return response;
    });
}